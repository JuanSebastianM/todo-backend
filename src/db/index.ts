import { connect } from 'mongoose';
import 'dotenv/config';

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error(
    'The MONGODB_URI environment variable is required but was not provided.'
  );
}

export const connectToDB = async () => {
  try {
    const { connection } = await connect(MONGODB_URI);

    if (connection.readyState === 1) {
      console.log('Connected to DB successfully.');

      return connection;
    }
  } catch (error) {
    console.log(error);

    return;
  }
};
