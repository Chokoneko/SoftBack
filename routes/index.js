var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const myObject = require("../data/generated.json");
console.log("Data loaded");
console.log(myObject);

router.get('/categories', function(req, res, next) {
  res.send(myObject.categories);
});

//TODO Handon : déclaré les vraiable ou utiliser req.param....
router.get('/categories/:categorie_id', function(req, res, next) {
  const categorie_id = req.params.categorie_id;
  res.send(
    myObject.categories[id=categorie_id]
      ? myObject.categories[id=categorie_id]
      : `Can't find a categorie with id ${categorie_id}`
  );
});

router.get('/categories/:categorie_id/items', function(req, res, next) {
  const categorie_id = req.params.categorie_id;
  res.send(
    myObject.categories[id=categorie_id].items
      ? myObject.categories[id=categorie_id].items
      : `Can't find a categorie with id ${categorie_id}`
    );
});

module.exports = router;
