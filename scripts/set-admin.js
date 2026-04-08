const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function setAdmin() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('MONGODB_URI is not set in .env.local');
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    const email = 'ujkanitefik@gmail.com';
    const password = '2004';

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      // Update existing user to admin
      user.role = 'admin';
      // Update password if needed
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      await user.save();
      console.log(`✅ Updated user ${email} to admin`);
    } else {
      // Create new admin user
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await User.create({
        name: 'Admin User',
        email: email,
        password: hashedPassword,
        role: 'admin',
      });
      console.log(`✅ Created admin user ${email}`);
    }

    console.log('Admin user setup complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error setting admin:', error);
    process.exit(1);
  }
}

setAdmin();




