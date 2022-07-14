const express = require("express");
// const { registerIssuance } = require("../issuance/issuance.service");

const router = express.Router();
const stockService = require("./stock.service");



router.get("/perItem/:id", selectPerItemnameAllDetails)
router.get("/categoryall", selectCategorydetails);
router.get("/permonthCat/:id", selectPerMonthforEachCat)
router.get("/availableamount/:id", selectAvailableQtyPerCode);
router.get("/permnthcat/:id", selectPerMonthNCat)
router.get("/permonth/:id", selectPerMonth)
router.get("/totaldonperCat", selectStockPerCategory)
router.get("/totaldonperMonth", selectStockPerMonth)
router.post("/issuance", registerIssueFromStock);
router.get("/:id", selectItemQty);
router.post("/", registerStock);
router.post("/request", registerRequestStock);

module.exports = router;


function selectPerItemnameAllDetails(req, res, next)
{
stockService
.selectPerItemnameAllDetails(req.params.id)
.then((donation) => res.json(donation))
.catch(next);

}




function selectCategorydetails(req, res, next)
{
stockService
.selectCategorydetails()
.then((donation) => res.json(donation))
.catch(next);

}

function selectPerMonthforEachCat(req, res, next)
{
stockService
.selectPerMonthforEachCat(req.params.id)
.then((donation) => res.json(donation))
.catch(next);

}
function selectAvailableQtyPerCode(req, res, next)
{
stockService
.selectAvailableQtyPerCode(req.params.id)
.then((item) => res.json(item))
.catch(next);

}

function selectPerMonthNCat(req, res, next)
{
stockService
.selectPerMonthNCat(req.params.id)
.then((donation) => res.json(donation))
.catch(next);

}


function selectPerMonth(req, res, next)
{
stockService
.selectPerMonth(req.params.id)
.then((donation) => res.json(donation))
.catch(next);

}




function selectStockPerCategory(req, res, next)
{
 stockService
.selectStockPerCategory()
.then((donation) => res.json(donation))
.catch(next);

}


function selectStockPerMonth(req, res, next)
{
 stockService
.selectStockPerMonth()
.then((donation) => res.json(donation))
.catch(next);

}

function selectItemQty(req, res, next)
{
    stockService
.selectItemQty(req.params.id)
.then((donation) => res.json(donation))
.catch(next);

}

function registerStock(req, res, next)
{
    stockService
     .registerStock(req.body)
    .then((response) => {
        res.status(response.status);
        res.json(response);
    })
    .catch(next);
}

function registerRequestStock(req, res, next)
{
    stockService
     .registerRequestStock(req.body)
    .then((response) => {
        res.status(response.status);
        res.json(response);
    })
    .catch(next);
}


function registerIssueFromStock(req, res, next)
{
    stockService
     .registerIssueFromStock(req.body)
    .then((response) => {
        res.status(response.status);
        res.json(response);
    })
    .catch(next);
}

