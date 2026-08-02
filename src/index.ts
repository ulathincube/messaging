import app from './app.js';
import indexRouter from './routes/index.js';

app.use(indexRouter);

app.listen(5000, error => {
  if (error) throw error;
  console.log('Server running!');
});
