import * as express from 'express';
import { getManager } from './servicesManager';
import authenticationErrorHandler from './handlers/authenticationErrorHandler';
import notFoundErrorHandler from './handlers/notFoundErrorHandler';
import restErrorHandler from './handlers/restErrorHandler';

const main = async (): Promise<void> => {
  const app = express();

  app.use(express.json())
    .use(getManager().getAuthenticationInterceptor()({
      include: [
        '/',
        '/healthCheck/secure',
        '/session/logout',
      ],
      exclude: [
        '/healthCheck',
        '/register',
        '/session',
      ],
    }))
    .use('/healthCheck', getManager().getHealthCheckController())
    .use('/register', await getManager().getRegistrationController())
    .use('/session', await getManager().getSessionController())
    .use('/guessItem', await getManager().getGuessItemController())
    .use(authenticationErrorHandler)
    .use(notFoundErrorHandler)
    .use(restErrorHandler);

  const port = getManager().getConfig().server.port;
  app.listen(port, () => console.log(`Server started on port ${port}`));
}

main().catch((err) => console.error(err));
