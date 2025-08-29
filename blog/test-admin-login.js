// Simple test script to check admin login functionality
// Run this with: node test-admin-login.js

console.log('🔐 Testing Admin Login Configuration...\n');

// Check environment variables
console.log('📋 Environment Variables:');
console.log('ADMIN_PASSWORD:', process.env.ADMIN_PASSWORD ? '✅ Set' : '❌ Not set (will use default: admin123)');
console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? '✅ Set' : '❌ Not set (will use default)');
console.log('NODE_ENV:', process.env.NODE_ENV || 'development');
console.log();

// Test default values
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your_jwt_secret_here';

console.log('🔑 Current Login Credentials:');
console.log('Password:', ADMIN_PASSWORD);
console.log('JWT Secret:', JWT_SECRET.substring(0, 10) + '...');
console.log();

console.log('🌐 Login URLs:');
console.log('Development:', 'http://localhost:3000/admin/login');
console.log('Production:', 'https://chandemahtab.com/admin/login');
console.log();

console.log('📝 Quick Setup Instructions:');
console.log('1. Create .env.local file in blog folder');
console.log('2. Add: ADMIN_PASSWORD=your_secure_password');
console.log('3. Add: NEXTAUTH_SECRET=your_random_secret');
console.log('4. Restart development server');
console.log('5. Go to http://localhost:3000/admin/login');
console.log();

// Test if we can create a JWT token
try {
  const jwt = require('jsonwebtoken');
  const testToken = jwt.sign({ test: true }, JWT_SECRET, { expiresIn: '1h' });
  console.log('✅ JWT creation test: PASSED');
} catch (error) {
  console.log('❌ JWT creation test: FAILED');
  console.log('Error:', error.message);
  console.log('💡 Try: npm install jsonwebtoken');
}

console.log('\n🎯 Ready to test login!');
console.log('Try password:', ADMIN_PASSWORD);
