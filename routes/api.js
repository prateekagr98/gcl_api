var express = require('express');
var router = express.Router();
var SubscriptionModel = require('../models/subscription');

router.post('/subscription', function(req, res, next) {

	SubscriptionModel.findOne({email: req.body.email}, function(err, existing_subscription){
		if(err) {
			res.status(500).json({message: 'Something went wrong'});
		}

		if(!existing_subscription) {
			SubscriptionModel.create(req.body, function(err, subscription) {
		  	if(err) {
					res.status(500).json({message: 'Something went wrong'});
				}

		  	res.status(201).json({ id: subscription._id });
		  });
		} else {
			res.status(200).json({id: existing_subscription._id});
		}
	});
});

module.exports = router;