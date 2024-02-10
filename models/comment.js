// models/comment.js
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => { // Accept sequelize instance as a parameter
  class Comment extends Model {}

  Comment.init(
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      sequelize, // Pass the sequelize instance to the init method
      modelName: 'Comment', // Set the name of the model as it should appear in the database
      freezeTableName: true, // Prevent automatic pluralization of the table name
      underscored: true // Use snake_case for database fields instead of camelCase
    }
  );

  return Comment;
};
