import * as express from 'express';
import { getManager } from './servicesManager';

const main = async (): Promise<void> => {
  const app = express();
  app.use(express.json());

  app.use('/healthCheck', getManager().getHealthCheckController());
  app.use('/register', await getManager().getRegistrationController());

  const port = getManager().getConfig().server.port;
  app.listen(port, () => console.log(`Server started on port ${port}`));
}

main().catch((err) => console.error(err));
