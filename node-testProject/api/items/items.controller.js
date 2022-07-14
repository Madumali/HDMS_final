const express = require("express");
// const { updateDonorDelete } = require("../donors/donors.service");
const router = express.Router();
const itemsService = require("./items.service");

// router.get("/allitems", selectAllItems);
router.get("/count", countincrement);
router.post("/", registerItems);
router.get("/:id", selectItems);
router.put("/item:id", updateItems);
router.patch("/item_delete:id", updateItemDelete);
router.get("/", selectItemsall);

// router.get("/:code", selectItems);

module.exports = router;


// function selectAllItems(req, res, next)
// {
//   itemsService
//   .selectAllItems()
//   .then((items) => res.json(items))
//   .catch(next);
// }



function countincrement(req, res, next)
{
  itemsService
  .countincrement()
  .then((items) => res.json(items))
  .catch(next);
}


function selectItemsall(req, res, next)
{
  itemsService
  .selectItemsall()
  .then((items) => res.json(items))
  .catch(next);
}


function selectItems(req, res, next)
{
return itemsService
.selectItems(req.params.id)
    .then((items) => res.json(items))
    .catch(next);


}

function registerItems(req, res, next) {
    itemsService
      .registerItems(req.body)
      .then((response) => {
        res.status(response.status);
        // res.message(response.msg);
        res.json(response);
      })
      .catch(next);
  }


  function updateItems(req, res, next) {
    itemsService
      .updateItems(req.query.id, req.body)
      .then((item) => res.json(item))
      .catch(next);
  }

  function updateItemDelete(req, res, next) {
    itemsService
      .updateItemDelete(req.query.id, req.body)
      .then((item) => res.json(item))
      .catch(next);
  }