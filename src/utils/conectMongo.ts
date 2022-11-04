import mongoose from "mongoose";

const connectMongo = async () =>
  mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

export default connectMongo;
