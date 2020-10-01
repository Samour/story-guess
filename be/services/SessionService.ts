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
import { ISession } from '../model/Session';
import { IUser } from '../model/User';
import { Optional } from '../../ts-shared/optional';
import { ISessionConfig } from '../config';

export interface ISessionService {
  createSession: (request: CreateSessionRequest) => Promise<CreateSessionResponse>;
  fetchToken: (request: RefreshTokenRequest) => Promise<RefreshTokenResponse>;
}

const SECRET_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()';

export class SessionService implements ISessionService {

  constructor(private readonly userTokenService: IUserTokenService, private readonly userService: IUserService,
    private readonly sessionRepository: ISessionRepository, private readonly config: ISessionConfig,
    private readonly saltRounds: number) { }

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
      throw new Error('Username or password incorrect');
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
      token: await this.createToken(session),
    };
  }

  async fetchToken(request: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    const session = await this.sessionRepository.findActiveSession(request.sessionId);
    if (!session || !(await bcrypt.compare(request.sessionSecret, session.sessionSecret))) {
      throw new Error('Invalid session');
    }

    return {
      token: await this.createToken(session),
    };
  }

  private async createToken(session: ISession): Promise<string> {
    return this.userTokenService.createToken(
      (await this.userService.findUserById(session.userId)).get(),
      session._id,
    );
  }
}