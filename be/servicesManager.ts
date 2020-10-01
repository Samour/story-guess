import { Router } from 'express';
import { Db, MongoClient } from 'mongodb';
import { memo } from '../ts-shared/singleton';
import { config, IConfig } from './config';
import { IUserRepository, UserRepository } from './repositories/UserRepository';
import healthCheckController from './routes/healthCheck';
import registrationController from './routes/register';
import { IUserService, UserService } from './services/UserService';

class ServicesManager {

  private static instance?: ServicesManager;

  static getInstance(): ServicesManager {
    if (!ServicesManager.instance) {
      ServicesManager.instance = new ServicesManager();
    }

    return ServicesManager.instance;
  }

  getConfig: () => IConfig = memo(() => config);

  getHealthCheckController: () => Router = memo(healthCheckController);

  getRegistrationController: () => Promise<Router> = memo(async () => registrationController(await this.getUserService()));

  getUserService: () => Promise<IUserService> = memo(async () => new UserService(
    await this.getUserRepository(),
    this.getConfig().passwordHashRounds,
  ));

  getUserRepository: () => Promise<IUserRepository> = memo(async () => new UserRepository(
    (await this.getMongoConnection()).collection('User')
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
