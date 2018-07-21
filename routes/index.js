var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

const myObject = require("../data/generated.json");
console.log("Data loaded");
console.log(myObject);

sendError = (res, erroMessage) => {
    res.status(500);
    res.send(erroMessage);
}

router.get('/categories', (req, res, next) => {
    if (myObject.categories) {
        res.send(myObject.categories);
    } else {
        sendError(res, `Can't find any categories`);
    }
});

router.get('/categories/:categorie_id', (req, res, next) => {
    if (myObject.categories) {
        const categoryId = req.params.categorie_id;
        const category = myObject.categories.find((c) => c.id == categoryId);
        if (category) {
            res.send(category);
        } else {
            sendError(res, `Can't find a categorie with id ${categoryId}`);

        }
    } else {
        sendError(res, `Can't find any categories`);
    }
});

router.get('/categories/:categorie_id/items', (req, res, next) => {
    if (myObject.categories) {
        const categoryId = req.params.categorie_id;
        const category = myObject.categories.find((c) => c.id == categoryId);
        if (category) {
            const items = category.items;
            if (items) {
                res.send(items);
            } else {
                sendError(res, `Can't find any items in this category`);
            }
        } else {
            sendError(res, `Can't find a categorie with id ${categoryId}`);

        }
    } else {
        sendError(res, `Can't find any categories`);
    }
});

router.get('/categories/:categorie_id/items/:item_id', (req, res, next) => {
    if (myObject.categories) {
        const categoryId = req.params.categorie_id;
        const category = myObject.categories.find((c) => c.id == categoryId);
        if (category) {
            const items = category.items;
            if (items) {
                const itemId = req.params.item_id;
                const item = category.items.find((c) => c.id == itemId);
                if (item) {
                    res.send(item);
                } else {
                    sendError(res, `Can't find an item with id ${itemId}`)
                }
            } else {
                sendError(res, `Can't find any items in this category`);
            }
        } else {
            sendError(res, `Can't find a categorie with id ${categoryId}`);

        }
    } else {
        sendError(res, `Can't find any categories`);
    }
});

// router.put('/categories/:categoryId/items/:name', (req, res, next) => {
//   const categoryId = req.params.categoryId;
//   const itemName = req.params.name;
//   myObject.categories[categoryId].items.add({id:getItemID(categoryId),name:itemName});
//   res.send("Item "+ itemName +" ajouté !");
// });

// const getItemID = (categoryId) => {
//   return Maths.max(...myObject.categories[categoryId].items.map(id));
// }
module.exports = router;
