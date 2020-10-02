import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import {
  CreateSessionRequest,
  CreateSessionResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '../../ts-shared/dtos/session';
import { ISessionRepository } from '../repositories/SessionRepository';
import { IUserTokenService } from './UserTokenService';
import { IUserService } from './UserService';
import { ISession, SessionRemovedReason } from '../model/Session';
import { IUser } from '../model/User';
import { Optional } from '../../ts-shared/optional';
import { ISessionConfig } from '../config';
import AuthenticationError from '../exceptions/AuthenticationError';
import { IRoleService } from './RoleService';

export interface ISessionService {
  createSession: (request: CreateSessionRequest) => Promise<CreateSessionResponse>;
  fetchToken: (request: RefreshTokenRequest) => Promise<RefreshTokenResponse>;
  logout: (sessionId: string) => Promise<void>;
}

const SECRET_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()';

export class SessionService implements ISessionService {

  constructor(private readonly userTokenService: IUserTokenService, private readonly userService: IUserService,
    private readonly roleService: IRoleService, private readonly sessionRepository: ISessionRepository,
    private readonly config: ISessionConfig, private readonly saltRounds: number) { }

  private createSecret(): string {
    let secret: string[] = [];
    while (secret.length < this.config.secretLength) {
      secret.push(SECRET_CHARS[Math.floor(Math.random() * SECRET_CHARS.length)]);
    }

    return secret.join('');
  }

  async createSession(request: CreateSessionRequest): Promise<CreateSessionResponse> {
    const user: Optional<IUser> = await this.userService.findUserByLoginId(request.loginId);
    const passwordValid = await user.map((u) => u.password)
      .map((p) => bcrypt.compare(request.password, p))
      .orElse(Promise.resolve(false));
    if (!passwordValid) {
      throw new AuthenticationError('Username or password incorrect');
    }

    const sessionSecret: string = this.createSecret();
    const session: ISession = {
      _id: uuid(),
      userId: user.get()._id,
      sessionSecret: await bcrypt.hash(sessionSecret, this.saltRounds),
      sessionExpiry: new Date(Date.now() + this.config.expiryTime),
      createdAt: null,
      updatedAt: null,
    };
    await this.sessionRepository.save(session);

    return {
      sessionId: session._id,
      sessionSecret,
      token: await this.createToken(user.get(), session._id),
    };
  }

  async fetchToken(request: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    const session = await this.sessionRepository.findActiveSession(request.sessionId);
    if (!session || !(await bcrypt.compare(request.sessionSecret, session.sessionSecret))) {
      throw new AuthenticationError('Invalid session');
    }

    return {
      token: await this.createToken((await this.userService.findUserById(session.userId)).get(), session._id),
    };
  }

  private async createToken(user: IUser, sessionId: string): Promise<string> {
    return this.userTokenService.createToken(
      user,
      await this.roleService.loadRoles(user.roles),
      sessionId,
    );
  }

  async logout(sessionId: string): Promise<void> {
    const session = await this.sessionRepository.findActiveSession(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    session.removed = {
      reason: SessionRemovedReason.LOGOUT,
      removedBy: session.userId,
      removedAt: new Date(),
    };
    await this.sessionRepository.save(session);
  }
}
