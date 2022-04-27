const { Schema, model } = require('mongoose');

const oAuthSchema = new Schema({
  accessToken: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

oAuthSchema.pre('find', function() {
  this.populate('user');
});

oAuthSchema.pre('findOne', function() {
  this.populate('user');
});

module.exports = model('O_Auth', oAuthSchema);
