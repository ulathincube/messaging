import 'dotenv/config';

const SALTROUNDS = process.env.SALTROUNDS;

const SESSION_SECRET = process.env.SESSION_SECRET;
const PORT = process.env.PORT
  ? Number.parseInt(process.env.PORT)
  : process.env.PORT;

export { SALTROUNDS, SESSION_SECRET, PORT };
