import dotenv from 'dotenv';

dotenv.config();

export default {
  persistence: process.env.PERSISTENCE,
  urlmongo: process.env.URLMONGO
};