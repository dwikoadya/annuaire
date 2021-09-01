var express = require('express');
var router = express.Router();

var firebase = require("firebase");
const { error } = require('console');

//Fetch instances
router.get('/', function (req, res, next) {
  const phoneReference = firebase.database().ref("/Phones/");
  phoneReference.on("value", function (snapshot) {
    if (!snapshot.val()) {
      console.log('Not yet data in database')
    }
    res.json(snapshot.val());
    phoneReference.off("value");
  }, function (errorObject) {
    console.log("Read data failed" + errorObject.code);
    res.send("Read data failed" + errorObject.code)
  });
});

//Create new instance
router.post('/', function (req, res) {
  const id = new Date().getTime();

  const { name, phone } = req.body;

  const referencePath = `/Phones/${id}/`;
  const phoneReference = firebase.database().ref(referencePath);
  phoneReference.set({ Name: name, Phone: phone }, function (error) {
    if (error) {
      res.send("Data could not be saved." + error);
    } else {
      res.send("Data saved successfully.");
    }
  });
});

//Update existing instance
router.put('/:id', function (req, res) {
  const id = req.params.id;

  const { name, phone } = req.body;

  const referencePath = `/Phones/${id}/`;
  const phoneReference = firebase.database().ref(referencePath);
  phoneReference.set({ Name: name, Phone: phone }, function (error) {
    if (error) {
      res.send("Data could not be updated." + error);
    } else {
      res.send("Data updated successfully.");
    }
  });
});

//Delete an instance
router.delete('/:id', function (req, res) {
  const id = req.params.id;

  const referencePath = `/Phones/${id}/`;
  const phoneReference = firebase.database().ref(referencePath);
  phoneReference.remove(error => {
    if (error) {
      res.send("Data could not be deleted." + error);
    } else {
      res.send("Data deleted successfully.");
    }
  });
});

module.exports = router;