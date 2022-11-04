// /lib/dbConnect.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_DB_URL;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, {})
      .then((mongoose) => {
        return mongoose;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
