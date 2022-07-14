const express = require("express");
const router = express.Router();
const categoryDetails = require("./category.service");



router.get("/", selectCategory);
router.post("/", saveCategory);
router.put("/category:type_id", updateCategory);
router.patch("/category-delete:type_id", updateCategoryDelete);

module.exports = router;

function selectCategory(req, res, next)
{
    categoryDetails
    
    .selectCategory()
    .then((category) => res.json(category))
    
    .catch(next);   
   
    
}

function saveCategory(req, res, next) {
    categoryDetails
      .saveCategory(req.body)
      .then((response) => {
        res.status(response.status);
        // res.message(response.msg);
        res.json(response);
      })
      .catch(next);
  }

  function updateCategory(req, res, next) {
    categoryDetails
      .updateCategory(req.query.id, req.body)
      .then((category) => res.json(category))
      .catch(next);
  }
  
  function updateCategoryDelete(req, res, next) {
    categoryDetails
   
      .updateCategoryDelete(req.body.id, req.body)
     
      .then((category) => res.json(category))
      .catch(next);
      // console.log(req.body.id)
  }