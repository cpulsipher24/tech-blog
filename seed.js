// Import necessary modules and models
const { User, Post, Comment } = require('./models');

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Seed users
    await User.bulkCreate([
      { username: 'user1', email: 'user1@example.com', password: 'password1' },
      { username: 'user2', email: 'user2@example.com', password: 'password2' },
      // Add more users as needed
    ]);

    // Seed posts
    await Post.bulkCreate([
      { title: 'Post 1', content: 'Content of Post 1', userId: 1 },
      { title: 'Post 2', content: 'Content of Post 2', userId: 2 },
      // Add more posts as needed
    ]);

    // Seed comments
    await Comment.bulkCreate([
      { content: 'Comment 1', postId: 1, userId: 2 },
      { content: 'Comment 2', postId: 2, userId: 1 },
      // Add more comments as needed
    ]);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

// Call the function to seed the database
seedDatabase();
