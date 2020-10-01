import { RequestHandler } from 'express';
import { AuthenticatedRequest } from '../domain/AuthenticatedRequest';
import AuthenticationError from '../exceptions/AuthenticationError';
import { IUserTokenService } from '../services/UserTokenService';

type PathSpec = string | RegExp;

interface InterceptorOptions {
  include?: PathSpec[];
  exclude?: PathSpec[];
}

const AUTHORIZATON_HEADER = 'Authorization';
const AUTHORIZATION_PATTERN = /^Bearer (.*)$/;

const matches = (src: string) => (spec: PathSpec): number => {
  if (typeof spec === 'string') {
    if (src.startsWith(spec)) {
      return spec.length;
    } else {
      return -1;
    }
  } else {
    const match = spec.exec(src);
    if (match) {
      return match[0].length;
    } else {
      return -1;
    }
  }
}

export type AuthenticationInterceptorFactory = (options?: InterceptorOptions) => RequestHandler;

export default (userTokenService: IUserTokenService): AuthenticationInterceptorFactory => (options = {}) => {
  const {
    include = ['/'],
    exclude = [],
  } = options;
  return (req: AuthenticatedRequest, res, next) => {
    const includeLength = include.map(matches(req.url)).sort((a, b) => b - a)[0];
    const excludeLength = exclude.map(matches(req.url)).sort((a, b) => b - a)[0];
    if (!includeLength || (excludeLength !== undefined && excludeLength >= includeLength)) {
      return next();
    }

    const token = AUTHORIZATION_PATTERN.exec(req.header(AUTHORIZATON_HEADER))?.[1];
    if (!token) {
      return next(new AuthenticationError('Token not present'));
    }
    userTokenService.parseToken(token)
      .then((user) => {
        req.user = user;
        next();
      }).catch(next);
  };
};
