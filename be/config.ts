import { Algorithm } from 'jsonwebtoken';

export interface IJwtConfig {
  privateKey: string;
  algorithm: Algorithm;
  expiresIn: string;
}

export interface ISessionConfig {
  secretLength: number;
  expiryTime: number;
}

export interface IConfig {
  appName: string;
  server: {
    port: number;
  };
  db: {
    url: string;
    db: string;
  };
  jwt: IJwtConfig;
  session: ISessionConfig;
  passwordHashRounds: number;
}

export const config: IConfig = {
  appName: 'story-guess-be',
  server: {
    port: 8080,
  },
  db: {
    url: 'mongodb://localhost:27017',
    db: 'story-guess-local',
  },
  jwt: {
    privateKey: 'YEgq6VajyPpJeVCTH5226GyQKcGHJgv8LguX',
    algorithm: 'HS256',
    expiresIn: '120s',
  },
  session: {
    secretLength: 20,
    expiryTime: 2592000000, // 30 days
  },
  passwordHashRounds: 10,
};
