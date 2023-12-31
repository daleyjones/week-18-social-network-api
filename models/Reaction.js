const { Schema, Types } = require('mongoose');
// const { formatDate } = require('./../utils/formatDate');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
      max_length: 50,
    },
    userId: {
      type: String,
      required: true,
      max_length: 50,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },

  });

module.exports = reactionSchema;