import * as jwt from 'jsonwebtoken';
import { IJwtConfig } from '../config';
import { IUser } from '../model/User';

interface UserToken {
  sub: string;
  loginId: string;
  sessionId: string;
}

export interface IUserTokenService {
  createToken: (user: IUser, sessionId: string) => Promise<string>;
}

export class UserTokenService implements IUserTokenService {

  constructor(private readonly config: IJwtConfig) { }

  createToken(user: IUser, sessionId: string): Promise<string> {
    const token: UserToken = {
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
}
