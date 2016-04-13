import dotenv from 'dotenv-safe';
import assert from 'assert';

dotenv.load(); // loads .env into process.env

const PORT = process.env.PORT || 9876;

const config = {
  PORT: PORT,
};

export default config;
