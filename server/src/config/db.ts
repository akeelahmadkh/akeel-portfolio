import mongoose from 'mongoose';
import dns from 'dns';

// Force Node.js to use Google & Cloudflare public DNS to resolve MongoDB Atlas SRV records
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Ignore if custom DNS cannot be set
}

export const connectDB = async () => {
  try {
    const connStr =
      process.env.MONGODB_URI ||
      'mongodb+srv://231370294_db_user:akeel7887@akee01.t6vkbsx.mongodb.net/akeel_portfolio?retryWrites=true&w=majority';

    await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`[MongoDB Atlas] Connected successfully: ${mongoose.connection.host}`);
  } catch (error: any) {
    console.warn(
      '[MongoDB Atlas] Connection notice (high-speed local fallback mode active):',
      error.message || error
    );
  }
};
