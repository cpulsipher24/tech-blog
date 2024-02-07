// Import necessary modules and models
const { User } = require('./models');

// Define the seed function to populate the database
async function seedDatabase() {
  try {
    // Create users
    await User.bulkCreate([
      { username: 'user1', email: 'user1@example.com', password: 'password1' },
      { username: 'user2', email: 'user2@example.com', password: 'password2' }
      // Add more users if needed
    ]);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Call the seed function to populate the database
seedDatabase();
