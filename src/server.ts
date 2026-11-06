import { env } from './config/env';
import { createApp } from './infrastructure/http/app';

const app = createApp();

app.listen(env.port, () => {
  console.log(`🍕 API démarrée sur http://localhost:${env.port}`);
  console.log(`📚 Swagger : http://localhost:${env.port}/docs`);
});
