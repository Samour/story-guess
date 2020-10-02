import { Router } from 'express';
import { Db, MongoClient } from 'mongodb';
import { memo } from '../ts-shared/singleton';
import { config, IConfig } from './config';
import healthCheckController from './routes/healthCheck';
import registrationController from './routes/register';
import sessionController from './routes/session';
import guessItemController from './routes/guessItem';
import { GuessItemConverter, IGuessItemConverter } from './converters/GuessItemConverter';
import { IUserService, UserService } from './services/UserService';
import { ISessionService, SessionService } from './services/SessionService';
import { IUserTokenService, UserTokenService } from './services/UserTokenService';
import { GuessItemService, IGuessItemService } from './services/GuessItemService';
import { IUserRepository, UserRepository } from './repositories/UserRepository';
import { ISessionRepository, SessionRepository } from './repositories/SessionRepository';
import { GuessItemRepository, IGuessItemRepository } from './repositories/GuessItemRepository';
import authenticationInterceptor, { AuthenticationInterceptorFactory } from './interceptors/AuthenticationInterceptor';

class ServicesManager {

  private static instance?: ServicesManager;

  static getInstance(): ServicesManager {
    if (!ServicesManager.instance) {
      ServicesManager.instance = new ServicesManager();
    }

    return ServicesManager.instance;
  }

  getConfig: () => IConfig = memo(() => config);

  getAuthenticationInterceptor: () => AuthenticationInterceptorFactory = memo(() => authenticationInterceptor(this.getUserTokenService()));

  getHealthCheckController: () => Router = memo(() => healthCheckController(this.getConfig()));

  getRegistrationController: () => Promise<Router> = memo(async () => registrationController(await this.getUserService()));

  getSessionController: () => Promise<Router> = memo(async () => sessionController(await this.getSessionService()));

  getGuessItemController: () => Promise<Router> = memo(async () => guessItemController(await this.getGuessItemService()));

  getGuessItemConverter: () => IGuessItemConverter = memo(() => new GuessItemConverter());

  getUserService: () => Promise<IUserService> = memo(async () => new UserService(
    await this.getUserRepository(),
    this.getConfig().passwordHashRounds,
  ));

  getSessionService: () => Promise<ISessionService> = memo(async () => new SessionService(
    this.getUserTokenService(),
    await this.getUserService(),
    await this.getSessionRepository(),
    this.getConfig().session,
    this.getConfig().passwordHashRounds,
  ));

  getUserTokenService: () => IUserTokenService = memo(() => new UserTokenService(this.getConfig().jwt));

  getGuessItemService: () => Promise<IGuessItemService> = memo(async () => new GuessItemService(
    this.getGuessItemConverter(),
    await this.getGuessItemRepository(),
  ));

  getUserRepository: () => Promise<IUserRepository> = memo(async () => new UserRepository(
    (await this.getMongoConnection()).collection('User')
  ));

  getSessionRepository: () => Promise<ISessionRepository> = memo(async () => new SessionRepository(
    (await this.getMongoConnection()).collection('Session'),
  ));

  getGuessItemRepository: () => Promise<IGuessItemRepository> = memo(async () => new GuessItemRepository(
    (await this.getMongoConnection()).collection('GuessItem'),
  ));

  getMongoConnection: () => Promise<Db> = memo(() => new Promise((res, err) => {
    MongoClient.connect(this.getConfig().db.url, (error, client) => {
      if (error) {
        err(error);
      } else {
        res(client.db(this.getConfig().db.db));
      }
    });
  }));
}

export const getManager = (): ServicesManager => ServicesManager.getInstance();
