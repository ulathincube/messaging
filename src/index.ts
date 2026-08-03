import app from './app.js';

app.listen(5000, error => {
  if (error) throw error;
  console.log('Server running!');
});
