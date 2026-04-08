import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import User from '@/models/User'
import dbConnect from '@/lib/mongodb'

async function setAdmin() {
  try {
    await dbConnect()
    console.log('Connected to MongoDB')

    const email = 'ujkanitefik@gmail.com'
    const password = '2004'

    // Check if user exists
    let user = await User.findOne({ email })

    if (user) {
      // Update existing user to admin
      user.role = 'admin'
      // Update password
      const hashedPassword = await bcrypt.hash(password, 10)
      user.password = hashedPassword
      await user.save()
      console.log(`✅ Updated user ${email} to admin`)
    } else {
      // Create new admin user
      const hashedPassword = await bcrypt.hash(password, 10)
      user = await User.create({
        name: 'Admin User',
        email: email,
        password: hashedPassword,
        role: 'admin',
      })
      console.log(`✅ Created admin user ${email}`)
    }

    console.log('Admin user setup complete!')
    process.exit(0)
  } catch (error) {
    console.error('Error setting admin:', error)
    process.exit(1)
  }
}

setAdmin()




