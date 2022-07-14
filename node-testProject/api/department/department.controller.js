const express = require("express");
const router = express.Router();
const depatmentDetails = require("./department.service");


router.get("/des", selectDesignation);
router.get("/", selectDepartment);

module.exports = router;

function selectDepartment(req, res, next)
{
    depatmentDetails
    .selectDepartment()
    .then((department) => res.json(department))
    .catch(next);   
}

function selectDesignation(req, res, next)
{
    depatmentDetails
    .selectDesignation()
    .then((department) => res.json(department))
    .catch(next);   
}