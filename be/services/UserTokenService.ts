import * as jwt from 'jsonwebtoken';
import { IJwtConfig } from '../config';
import { UserToken } from '../domain/UserToken';
import AuthenticationError from '../exceptions/AuthenticationError';
import { IUser } from '../model/User';

interface UserTokenSpec {
  sub: string;
  loginId: string;
  sessionId: string;
}

export interface IUserTokenService {
  createToken: (user: IUser, sessionId: string) => Promise<string>;
  parseToken: (token: string) => Promise<UserToken>;
}

export class UserTokenService implements IUserTokenService {

  constructor(private readonly config: IJwtConfig) { }

  createToken(user: IUser, sessionId: string): Promise<string> {
    const token: UserTokenSpec = {
      sub: user._id,
      loginId: user.loginId,
      sessionId,
    };
    return new Promise((res, err) => {
      jwt.sign(token, this.config.privateKey, {
        algorithm: this.config.algorithm,
        expiresIn: this.config.expiresIn,
      }, (error, tokenString) => {
        if (error) {
          err(error);
        } else {
          res(tokenString);
        }
      });
    });
  }

  parseToken(token: string): Promise<UserToken> {
    return new Promise((res, err) => {
      jwt.verify(token, this.config.privateKey, {
        algorithms: [this.config.algorithm],
      }, (error, payload) => {
        if (error) {
          console.group();
          console.warn('Error occurred verifying token');
          console.warn(error);
          console.groupEnd();
          err(new AuthenticationError());
        } else {
          res(payload as UserToken);
        }
      });
    });
  }
}
