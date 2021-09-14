import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }

  console.log("Connecting to database");
  await mongoose.connect("mongodb+srv://test:test@cluster0.nl7uh.mongodb.net/test?retryWrites=true&w=majority");
  console.log("Connected to database");
  return;
};

export default connectDB;
