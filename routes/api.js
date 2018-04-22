var express = require('express');
var router = express.Router();
var Json2csvParser = require('json2csv').Parser;
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

router.get('/subscriptions/all', function(req, res, next) {

	SubscriptionModel.find({}).exec(function(err, subscriptions) {
		if(err) {
			res.status(500).json({message: 'Something went wrong'});
		}

		res.status(200).json({
			subscriptions: subscriptions
		});
	});
});

router.get('/subscriptions', function(req, res, next) {

	var limit = 10;
	var page = 1;

	if(req.query && req.query.limit) {
		limit = parseInt(req.query.limit, 10);
	}

	if(req.query && req.query.page) {
		page = parseInt(req.query.page, 10);
	}

	SubscriptionModel.find({}).skip((page - 1) * limit).limit(limit).exec(function(err, subscriptions) {
		if(err) {
			res.status(500).json({message: 'Something went wrong'});
		}

		res.status(200).json({
			subscriptions: subscriptions
		});
	});
});

router.get('/export', function(req, res, next) {

	SubscriptionModel.find({}, function(err, subscriptions) {
		if(err) {
			res.status(500).json({message: 'Somethig went wrong fd'});
		}

		try {
		  var parser = new Json2csvParser({
		  	fields: ["email"]
		  });
		  var csv = parser.parse(subscriptions);
		  console.log(csv);
		  res.status(200).sendFile(csv);
		} catch (err) {
			console.log(err);
		  res.status(500).json({message: 'Somethig went wrong sdf'});
		}
	});

});

module.exports = router;