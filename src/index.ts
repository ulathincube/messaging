import app from './app.js';
import { PORT } from './utils/constants.js';

if (!PORT) throw new Error('Port is not defined!');

app.listen(PORT, () => {
  console.log('Server running!');
});
