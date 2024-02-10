// models/comment.js
const { DataTypes } = require('sequelize');
const db = require('./index');

const Comment = db.sequelize.define('Comment', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = Comment;
