var express = require('express');
var router = express.Router();

// Wording //
const NO_CATEGORIES_ERROR_MESSAGE = "Can't find any categories"
const CATEGORY_NOT_FOUND_ERROR_MESSAGE = "Can't find any category with id "
const NO_ITEMS_ERROR_MESSAGE = "Can't find any items in this category"
const ITEM_NOT_FOUND_ERROR_MESSAGE = "Can't find any item with id "

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

const mockedDataBase = require("../data/generated.json");
sendError = (res, erroMessage) => {
    res.status(500);
    res.send(erroMessage);
}

router.get('/categories', (req, res, next) => {
    if (!mockedDataBase.categories) {
        sendError(res, NO_CATEGORIES_ERROR_MESSAGE);
    } else {
        res.send(mockedDataBase.categories);
    }
});

router.get('/categories/:categoryId', (req, res, next) => {
    if (!mockedDataBase.categories) {
        sendError(res, NO_CATEGORIES_ERROR_MESSAGE);
    } else {
        const { categoryId } = req.params;
        const category = mockedDataBase.categories.find(category => category.id === categoryId);
        if (!category) {
            sendError(res, CATEGORY_NOT_FOUND_ERROR_MESSAGE + categoryId);
        } else {
            res.send(category);
        }
    }
});

router.get('/categories/:categoryId/items', (req, res, next) => {
    if (!mockedDataBase.categories) {
        sendError(res, NO_CATEGORIES_ERROR_MESSAGE);
    } else {
        const { categoryId } = req.params;
        const category = mockedDataBase.categories.find(category => category.id === categoryId);
        if (!category) {
            sendError(res, CATEGORY_NOT_FOUND_ERROR_MESSAGE + categoryId);
        } else {
            const { items } = category;
            if (!items) {
                sendError(res, NO_ITEMS_ERROR_MESSAGE);
            } else {
                res.send(items);
            }
        }
    }
});

router.get('/categories/:categoryId/items/:itemId', (req, res, next) => {
    if (!mockedDataBase.categories) {
        sendError(res, NO_CATEGORIES_ERROR_MESSAGE);
    } else {
        const { categoryId } = req.params;
        const category = mockedDataBase.categories.find(category => category.id === categoryId);
        if (!category) {
            sendError(res, CATEGORY_NOT_FOUND_ERROR_MESSAGE + categoryId);
        } else {
            const { items } = category;
            if (!items) {
                sendError(res, NO_ITEMS_ERROR_MESSAGE);
            } else {
                const { itemId } = req.params;
                const item = category.items.find(item => item.id === itemId);
                if (!item) {
                    sendError(res, ITEM_NOT_FOUND_ERROR_MESSAGE + itemId);
                } else {
                    res.send(item);
                }
            }
        }
    }
});



// router.put('/categories/:categoryId/items/:name', (req, res, next) => {
//   const categoryId = req.params.categoryId;
//   const itemName = req.params.name;
//   mockedDataBase.categories[categoryId].items.add({id:getItemID(categoryId),name:itemName});
//   res.send("Item "+ itemName +" ajouté !");
// });

// const getItemID = (categoryId) => {
//   return Maths.max(...mockedDataBase.categories[categoryId].items.map(id));
// }
module.exports = router;