const express = require("express");

const router = express.Router();
const requestService = require("./request.service");

router.patch("/deleteforeach/:req_stk_id",updateRequestDeleteForEach);
router.get("/foreach/:uid",selectRequestForEach);
router.patch("/delete/:req_stk_id",updateRequestDelete);
router.get("/", selectAllRequeststoAccept);
router.get("/requestTotals/:start/:end", getRequestItemTotal);
router.get("/requestDetails/:start/:end", selectAllRequestDetails);
router.get("/required", selectRequired);
router.post("/", registerRequest);


module.exports = router;




function updateRequestDeleteForEach(req, res, next) {
    requestService
      .updateRequestDeleteForEach(req.query.req_stk_id, req.body)
      .then((request) => res.json(request))
      .catch(next);
  }

function selectRequestForEach(req, res, next) {
    requestService
      .selectRequestForEach(req.params.uid)
      .then((request) => res.json(request))
      .catch(next);
  }
function updateRequestDelete(req, res, next) {
    requestService
      .updateRequestDelete(req.query.req_stk_id, req.body)
      .then((request) => res.json(request))
      .catch(next);
  }


function selectAllRequeststoAccept(req, res, next)
{
    requestService
    .selectAllRequeststoAccept()
    .then((required) => res.json(required))
    .catch(next);
}
function getRequestItemTotal(req, res, next)
{
    requestService
    .getRequestItemTotal(req.params.start, req.params.end)
    .then((required) => res.json(required))
    .catch(next);
}

function selectAllRequestDetails(req, res, next)
{
    requestService
    .selectAllRequestDetails(req.params.start, req.params.end)
    .then((required) => res.json(required))
    .catch(next);
}

function selectRequired(req, res, next)
{
    requestService
    .selectRequired()
    .then((required) => res.json(required))
    .catch(next);
}

function registerRequest(req, res, next)
{
    requestService
     .registerRequest(req.body)
    .then((response) => {
        res.status(response.status);
        res.json(response);
    })
    .catch(next);
}