const express = require("express");

const router = express.Router();
const issuanceService = require("./issuance.service");


router.post("/requestissue", registerRequestIssuance);
router.delete("/forever-delete/:issueId", DeleteIssueForever);
router.put("/restore-delete/:issueId", restoreDeleteIssue);
router.get("/getdeleteissue", selectAllDeletedIssue);
router.patch("/delete/:issueId",updateIssueDelete);
router.get("/", selectAllIssuances);
router.post("/", registerIssuance);


module.exports = router;

function registerRequestIssuance(req, res, next)
{
    issuanceService
     .registerRequestIssuance(req.body)
    .then((response) => {
        res.status(response.status);
        res.json(response);
    })
    .catch(next);
}

function DeleteIssueForever(req, res, next)
{
  issuanceService
.DeleteIssueForever(req.params.issueId, req.body)
    .then((donation) => res.json(donation))
    .catch(next);
}

function restoreDeleteIssue(req, res, next)
{
  issuanceService
.restoreDeleteIssue(req.params.issueId, req.body)
    .then((donation) => res.json(donation))
    .catch(next);
}

function selectAllDeletedIssue(req, res, next) {
  issuanceService
    .selectAllDeletedIssue()
    .then((donation) => res.json(donation))
    .catch(next);
}

function updateIssueDelete(req, res, next) {
    issuanceService
      .updateIssueDelete(req.query.issueId, req.body)
      .then((donation) => res.json(donation))
      .catch(next);
  }



function selectAllIssuances(req, res, next) {
    issuanceService
      .selectAllIssuances()
      .then((donation) => res.json(donation))
      .catch(next);
  }

function registerIssuance(req, res, next)
{
    issuanceService
     .registerIssuance(req.body)
    .then((response) => {
        res.status(response.status);
        res.json(response);
    })
    .catch(next);
}