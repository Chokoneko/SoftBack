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
  const categorieId = req.params.categorie_id;
  res.send(
    myObject.categories[id=categorieId]
      ? myObject.categories[id=categorieId]
      : `Can't find a categorie with id ${categorieId}`
  );
});

router.get('/categories/:categorie_id/items', function(req, res, next) {
  const categorieId = req.params.categorie_id;
  res.send(
    myObject.categories[id=categorieId].items
      ? myObject.categories[id=categorieId].items
      : `Can't find a categorie with id ${categorieId}`
    );
});

router.get('/categories/:categorie_id/items/:item_id', function(req, res, next) {
  const categorieId = req.params.categorie_id;
  const itemId = req.params.item_id;
  if ( myObject.categories[id=categorieId]){
    res.send(
      myObject.categories[id=categorieId].items[itemId]
        ? myObject.categories[id=categorieId].items[itemId]
        : `Can't find an item with id ${itemId}`
      );
  } else {
    res.status(500);
    res.send(`'Can't find a category with id ${categorie_id}'`);
  }  
});

router.put('/categories/:categorieId/items/:name', function(req, res, next) {
  const categorieId = req.params.categorieId;
  const itemName = req.params.name;
  myObject.categories[categorieId].items.add({id:getItemID(categorieId),name:itemName});
  res.send("Item "+ itemName +" ajouté !");
});

const getItemID = (categorieId) => {
  return Maths.max(...myObject.categories[categorieId].items.map(id));
}
module.exports = router;
