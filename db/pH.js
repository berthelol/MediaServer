// import the necessary modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define schema
var pHSchema = new Schema({
    bac: {
        bacmoins: {
            //true if bac a été versé avant la mesure
            flag: {
                type: Boolean
            },
            remplissage: {
                type: Number,
                min: 0,
                max: 100
            }
        },
        bacplus: {
            flag: {
                type: Boolean
            },
            remplissage: {
                type: Number,
                min: 0,
                max: 100
            }
        },
    },
    time_of_mesure: {
        type: Date
    },
    mesure: {
        type: Number,
        min: 0,
        max: 14
    }
});

var pH = mongoose.model('pH', pHSchema);
var App = function() {
    var self = this;
    //add a data
    this.add = function(data, callback) {
        ph = new pH({
            mesure: data.mesure,
            bac: data.bac,
            time_of_mesure: Date.now()
        });
        ph.save(function(err) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, ph);
            }
        });
    };
    //find all historique
    /*  this.findall = function(callback) {
          pH.find({}, function(err, historique) {
              if (err) {
                  return callback(err.msg, null);
              }
              callback(null, historique);

          });
      };*/
    this.findall = function(callback) {
        pH.find().sort({
            time_of_mesure: -1
        }).limit(30).exec(function(err, historique) {
            if (err) {
                return callback(err.msg, null);
            }
            function custom_sort(a, b) {
                return new Date(a.time_of_mesure).getTime() - new Date(b.time_of_mesure).getTime();
            }
            historique.sort(custom_sort);
            callback(null, historique);
        });
    };
    //find the last data
    this.findlast = function(callback) {
        pH.find().sort({
            time_of_mesure: -1
        }).limit(1).exec(function(err, ph) {
            if (err) {
                callback(err.msg, null);
            } else if (ph == null) {
                callback("No ph found", null)
            } else {
                callback(null, ph[0]);
            }
        });
    }
    this._Model = pH;
    this._Schema = pHSchema;
}
module.exports = new App();
