var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../models/payModel.js');

var PayModel = mongoose.model('PayModel');

router.route('/pays')
.get(function(req, res) {
   res.set({'Content-Type':'text/json','Encodeing':'utf8'});  
   PayModel.find({}, function (err, incomes) {
	   	if (err){
	   		console.log('err', err);
	   		return;
	   	}

		res.header("Access-Control-Allow-Origin", req.headers.origin);		
	    res.json(incomes) ;
	})
})
.post(function(req, res) {
	var payInstance = new PayModel(req.body);
	console.log(req.body);

	payInstance.save(function (err, payInstance) {
		console.log('save status: ', err ? 'fail' : 'success');
		res.send(payInstance) ;
	});
})


router.route('/pays/:user').get(function(req, res) {
  PayModel.find({ user: req.params.user}, function(err, pay) {
    if (err) {
      return res.send(err);
    }

	res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.send(pay);
  });
});
/*
router.route('/incomes/:user').put(function(req,res){
  IncomeModel.findOne({ user: req.params.user }, function(err, income) {
    if (err) {
      return res.send(err);
    }

    for (prop in req.body) {
      income[prop] = req.body[prop];
    }

    // save the income
    income.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.json({ message: 'Income updated!' });
    });
  });
});

router.delete('/incomes', function(req, res, next) {
   res.set({'Content-Type':'text/json','Encodeing':'utf8'});  
   IncomeModel.remove({}, function(err, incomes){
   	if (err){
   		console.log('remove error status: ',err);
   		return;
   	}
   	if (incomes){
   		console.log(incomes);
   		res.send("remove success");
   	}
   })
});
*/
module.exports = router;
