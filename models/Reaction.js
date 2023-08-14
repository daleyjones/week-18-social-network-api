const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

const Reaction = model('Reaction', reactionSchema);

module.exports = Reaction;
