import express, { type Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import { loadOpenApiSpec } from './openapi';
import { healthRouter } from './routes/health.routes';
import { brandsRouter } from './routes/brands.routes';

/**
 * Construit l'application Express (sans l'écouter) :
 * séparé de server.ts pour pouvoir la tester avec supertest.
 */
export function createApp(): Express {
  const app = express();
  app.use(express.json());

  const spec = loadOpenApiSpec();
  app.get('/docs.json', (_req, res) => {
    res.json(spec);
  });
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));

  app.use('/health', healthRouter);
  app.use('/brands', brandsRouter);

  return app;
}
