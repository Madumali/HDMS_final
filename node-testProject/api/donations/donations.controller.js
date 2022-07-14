const express = require("express");
const router = express.Router();
const donationService = require("./donations.service");

router.delete("/forever-delete/:item_id", DeleteDonationForever);
router.put("/restore-delete/:item_id", restoreDeleteDonation);
router.get("/getdeletedonation", selectAllDeletedDonation);
router.patch("/delete/:item_id", updateDonationDelete);
router.get("/filterdonations/:start/:end", filterDonationByDates);
router.get("/newdonations", selectCountNewDonation);
router.get("/", selectAllDonations);
router.get("/don/:id", selectLatestDonor);
router.get("/now/:id", selectLatestDonation);
router.post("/", registerDonations);

module.exports = router;

function DeleteDonationForever(req, res, next)
{
  donationService
.DeleteDonationForever(req.params.item_id, req.body)
    .then((donation) => res.json(donation))
    .catch(next);
}

function restoreDeleteDonation(req, res, next)
{
  donationService
.restoreDeleteDonation(req.params.item_id, req.body)
    .then((donation) => res.json(donation))
    .catch(next);
}

function selectAllDeletedDonation(req, res, next)
{
 donationService
.selectAllDeletedDonation()
.then((donation) => res.json(donation))
.catch(next);

}

function updateDonationDelete(req, res, next) {
  donationService
    .updateDonationDelete(req.query.item_id, req.body)
    .then((donation) => res.json(donation))
    .catch(next);
}

function filterDonationByDates(req, res, next)
{
  donationService
.filterDonationByDates(req.params.start, req.params.end)
.then((donations) => res.json(donations))
.catch(next);

}

function selectCountNewDonation(req, res, next) {
  donationService
    .selectCountNewDonation()
    .then((donation) => res.json(donation))
    .catch(next);
}

function selectLatestDonor(req, res, next) {
  donationService
    .selectLatestDonor(req.params.id)
    .then((donation) => res.json(donation))
    .catch(next);
}

function selectLatestDonation(req, res, next) {
  donationService
    .selectLatestDonation(req.params.id)
    .then((donation) => res.json(donation))
    .catch(next);
}
function selectAllDonations(req, res, next) {
  donationService
    .selectAllDonations()
    .then((donation) => res.json(donation))
    .catch(next);
}

function registerDonations(req, res, next) {
  donationService
    .registerDonations(req.body)
    .then((response) => {
      res.status(response.status);
      res.json(response);
    })
    .catch(next);
}
