import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Substitua pela sua URI do MongoDB
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/produtosDB';

    await mongoose.connect(mongoURI);

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Sair do processo com falha
  }
};

export default connectDB;
