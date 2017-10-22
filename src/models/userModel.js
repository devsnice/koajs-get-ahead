const mongoose = require('../utils/mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    surname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    city: {
      type: String
    },
    birthday: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

User.remove({}).then(() => {
  User.create({
    name: 'admin',
    surname: 'admin',
    password: '123456',
    email: 'admin@admin.com',
    city: 'test',
    birthday: new Date()
  });
});


module.exports = User;
