var express = require('express');
var router = express.Router();
//var path = require('path');
// import the global schema, this can be done in any file that needs the model
var pH = require('../db/pH.js');
var Chlore = require('../db/Chlore.js');


//pH
router.get('/pH/bacmoins', function(req, res, next) {
    res.render('index', {
        title: 'Bigot Fuck you'
    });
});

router.post('/pH/bacmoins', function(req, res, next) {
    res.render('index', {
        title: 'Bigot Fuck you'
    });
});

router.get('/pH/bacplus', function(req, res, next) {
    res.render('index', {
        title: 'Bigot Fuck you'
    });
});
//add a new data
router.post('/pH/data', function(req, res, next) {
    var data = {
        mesure: req.body.mesure
    };
    pH.add(data, function(err, ph) {
        if (err) {
            return res.status(500).json({
                success: false,
                msg: err.msg
            });
        }
        res.status(200).json({
            success: true,
            msg: 'Successful added pH mesure'
        });
    });
});
//get last data
router.get('/pH/data', function(req, res, next) {
    pH.findlast(function(err,ph) {
      if(err)
      {
        return res.status(500).json({
            success: false,
            msg: err
        });
      }
        res.status(200).json(ph);
    });
});

//get all mesures
router.get('/pH/historique', function(req, res, next) {
    pH.findall(function(err,historique) {
      if(err)
      {
        return res.status(500).json({
            success: false,
            msg: err
        });
      }
        res.status(200).json(historique);
    });
});
//Chlore
router.get('/chlore/bac', function(req, res, next) {
    res.render('index', {
        title: 'Bigot Fuck you'
    });
});
//add a new data
router.post('/chlore/data', function(req, res, next) {
  var data = {
      mesure: req.body.mesure
  };
  Chlore.add(data, function(err, chlore) {
      if (err) {
          return res.status(500).json({
              success: false,
              msg: err.msg
          });
      }
      res.status(200).json({
          success: true,
          msg: 'Successful added Chlore mesure'
      });
  });
});
//find last data
router.get('/chlore/data', function(req, res, next) {
  Chlore.findlast(function(err,chlore) {
    if(err)
    {
      return res.status(500).json({
          success: false,
          msg: err
      });
    }
      res.status(200).json(chlore);
  });
});
//get all mesures
router.get('/chlore/historique', function(req, res, next) {
  Chlore.findall(function(err,historique) {
    if(err)
    {
      return res.status(500).json({
          success: false,
          msg: err
      });
    }
      res.status(200).json(historique);
  });
});
//Temperature
router.get('/temp/data', function(req, res, next) {
    res.render('index', {
        title: 'Bigot Fuck you'
    });
});

router.get('/temp/historique', function(req, res, next) {
    res.render('index', {
        title: 'Bigot Fuck you'
    });
});

//Parametres
router.get('/parametres', function(req, res, next) {

});
//test
router.get('/test/:toto', function(req, res, next) {
    //get from url which user we want
    var condition = {
        "data": req.params.toto,
    };
    res.send('Tu a ecrit: ' + condition.data);
});

module.exports = router;
