import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'

export async function POST(request: Request) {
  try {
    await dbConnect()

    const email = 'ujkanitefik@gmail.com'
    const password = '20042004'

    // Check if user exists
    let user = await User.findOne({ email })

    if (user) {
      // Update existing user to admin
      user.role = 'admin'
      // Update password
      const hashedPassword = await bcrypt.hash(password, 10)
      user.password = hashedPassword
      await user.save()
      return NextResponse.json(
        { message: `Updated user ${email} to admin` },
        { status: 200 }
      )
    } else {
      // Create new admin user
      const hashedPassword = await bcrypt.hash(password, 10)
      user = await User.create({
        name: 'Admin User',
        email: email,
        password: hashedPassword,
        role: 'admin',
      })
      return NextResponse.json(
        { message: `Created admin user ${email}` },
        { status: 201 }
      )
    }
  } catch (error) {
    console.error('Error setting admin:', error)
    return NextResponse.json(
      { message: 'Error setting admin user' },
      { status: 500 }
    )
  }
}

