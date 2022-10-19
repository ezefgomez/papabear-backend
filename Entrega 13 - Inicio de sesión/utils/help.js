import { join } from 'path';
import { fileURLToPath } from 'url';

// ruta directorio.
const __dirname = fileURLToPath(new URL('.', import.meta.url));

export { __dirname, join as __dirJoin }