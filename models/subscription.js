var mongoose = require('mongoose');

var subscriptionSchema = mongoose.Schema({
  email: String,
  name: String,
  occupation: String,
  industry: String,
  note: String
});

var SubscriptionModel = mongoose.model('Subscription', subscriptionSchema);

module.exports = SubscriptionModel;