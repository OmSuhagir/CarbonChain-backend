// const mongoose = require('mongoose');

// /**
//  * Connect to MongoDB database
//  * Uses MONGODB_URI from environment variables or falls back to local MongoDB
//  */
// const connectDB = async () => {
//   try {
//     const mongoURI = process.env.MONGODB_URI;

//     await mongoose.connect(mongoURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 5000, // 5 second timeout
//     });

//     console.log('✅ MongoDB Connected Successfully');
//     return mongoose.connection;
//   } catch (error) {
//     console.error('❌ MongoDB Connection Error:', error.message);
//     console.warn('⚠️  Running without MongoDB. Some features may be limited.');
//     // Don't crash the server - continue without DB
//     return null;
//   }
// };

// module.exports = connectDB;

const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ Please define MONGODB_URI in environment variables");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 30000,
      family: 4, // prevents IPv6 timeout on Vercel
    });
  }

  cached.conn = await cached.promise;
  console.log("✅ MongoDB Connected");

  return cached.conn;
};

module.exports = connectDB;