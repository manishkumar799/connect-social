// db.ts
import mongoose from 'mongoose';


const connectDB = async () => {
  try {
    // Replace <username>, <password>, and <dbname> with your MongoDB credentials
    const uri: string = process.env.MONGO_URI as string; // For local DB
    // If using MongoDB Atlas, use the following connection string:
    // const uri = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority';

    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;
