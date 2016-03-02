var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../models/incomeModel.js');

var IncomeModel = mongoose.model('IncomeModel');

router.route('/incomes')
.get(function(req, res) {
   res.set({'Content-Type':'text/json','Encodeing':'utf8'});  
   console.log('in here 1 '+req.params.user);

   IncomeModel.find({}, function (err, incomes) {
	   	if (err){
	   		console.log('err', err);
	   		return;
	   	}

		res.header("Access-Control-Allow-Origin", req.headers.origin);		
	    res.json(incomes) ;
	})
})
.post(function(req, res) {
	var incomeInstance = new IncomeModel(req.body);
	console.log(req.body);

	incomeInstance.save(function (err, incomeInstance) {
		console.log('save status: ', err ? 'fail' : 'success');
		res.send(incomeInstance) ;
	});
})


router.route('/incomes/:user').get(function(req, res) {
   console.log('in here 2 '+req.params.user);
  IncomeModel.find({ user: req.params.user}, function(err, income) {
    if (err) {
      return res.send(err);
    }

	res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.send(income);
  });
});




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


/*
router.get('/incomes/:user', function(req, res, next) {
   res.set({'Content-Type':'text/json','Encodeing':'utf8'});  
   console.log('in here 2 '+req.params.user);
   IncomeModel.findOne({user:req.params.user},function (err, incomes) {
	  	if (err)
	   		return console.error(err);
		
	    res.send(incomes) ;
	})
});*/

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

module.exports = router;
