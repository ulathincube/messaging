import app from './app.js';
import { PORT } from './utils/constants.js';

if (!PORT) throw new Error('Port is not defined!');

app.listen(PORT, error => {
  if (error) throw error;
  console.log('Server running!');
});
