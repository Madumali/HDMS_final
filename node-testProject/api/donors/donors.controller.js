const express = require("express");
const router = express.Router();
const donorService = require("./donors.service");



router.get("/person/:donor_id", selectLoggedinPerson);
router.post("/", registerDonors);
router.delete("/forever-delete/:donor_id", DeleteDonorForever);
router.put("/restore-delete/:donor_id", restoreDeleteDonor);
router.get("/getdeletedonor", selectAllDeletedPerson);
router.get("/blooddonordate/:start/:end", filterBloodDonorByDates)
router.get("/donordate/:start/:end", filterDonorByDates)
router.get("/lastdon", selectCurrent);
router.get('/', selectAll);
router.get("/person", selectAllPerson);
router.get("/all/:id", selectSingleDonor);
router.post("/donor/:donor_id", updateDonor);
router.patch("/donor-delete:donor_id", updateDonorDelete);


module.exports = router;

function selectLoggedinPerson(req, res, next)
{
  donorService
.selectLoggedinPerson(req.params.donor_id)
    .then((donor) => res.json(donor))
    .catch(next);

}


function DeleteDonorForever(req, res, next)
{
  donorService
.DeleteDonorForever(req.params.donor_id, req.body)
    .then((donor) => res.json(donor))
    .catch(next);
}

function restoreDeleteDonor(req, res, next)
{
  donorService
.restoreDeleteDonor(req.params.donor_id, req.body)
    .then((donor) => res.json(donor))
    .catch(next);
}

function selectAllDeletedPerson(req, res, next)
{
  donorService
.selectAllDeletedPerson()
.then((donors) => res.json(donors))
.catch(next);

}

function filterBloodDonorByDates(req, res, next)
{
  donorService
.filterBloodDonorByDates(req.params.start, req.params.end)
.then((donors) => res.json(donors))
.catch(next);

}


function filterDonorByDates(req, res, next)
{
  donorService
.filterDonorByDates(req.params.start, req.params.end)
.then((donors) => res.json(donors))
.catch(next);

}


function selectSingleDonor(req, res, next)
{
  donorService
.selectSingleDonor(req.params.id)
    .then((donor) => res.json(donor))
    .catch(next);

}


function selectCurrent(req, res, next)
{
  donorService
.selectCurrent()
.then((donor) => res.json(donor))
.catch(next);

}

function selectAllPerson(req, res, next)
{
  donorService
.selectAllPerson()
.then((donors) => res.json(donors))
.catch(next);

}

function selectAll(req, res, next)
{
  donorService
.selectAll()
.then((donors) => res.json(donors))
.catch(next);

}


function registerDonors(req, res, next) {
    donorService
      .registerDonors(req.body)
      .then((response) => {
        res.status(response.status);
        res.json(response);
      })
      .catch(next);
  }


  function updateDonor(req, res, next) {
    donorService
      .updateDonor(req.query.id, req.body)
      .then((donor) => res.json(donor))
      .catch(next);
  }

  function updateDonorDelete(req, res, next) {
    donorService
      .updateDonorDelete(req.query.id, req.body)
      .then((donor) => res.json(donor))
      .catch(next);
  }
