import app from './app';
import { config } from './config';

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`[BRAND+ API] Server active on http://0.0.0.0:${PORT}`);
  console.log(`[BRAND+ API] Base URL: ${config.apiUrl}`);
  console.log(`[BRAND+ API] SaaS Entry URL: ${config.saasEntryUrl}`);
});
