var express = require('express');
var router = express.Router();
var SubscriptionModel = require('../models/subscription');

router.post('/subscription', function(req, res, next) {
  SubscriptionModel.create({}, function(err, subscription) {
  	res.status(201).json({ id: subscription._id });
  });
});

module.exports = router;