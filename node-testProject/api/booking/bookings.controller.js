const express = require("express");
const router = express.Router();
const bookingsService = require("./bookings.service");



router.get("/forletterprint/:id/:name", getapproveBookingsForPass)
router.get("/all", selectAllBookingsForDash)
router.put("/confirmdonationNotreceive/:booking_id",confirmDonationNotReceive);
router.put("/confirmdonation/:booking_id",confirmDonationReceive);
router.get("/progress", selectApprovedBookings)
router.patch("/reject/:booking_id",updateApproveReject);
router.put("/approve/:booking_id",updateApprove);
router.get("/forapproval", selectBookingsForApproval)
router.patch("/book_delete/:booking_id",updateBookingDelete);
router.get("/allbookings/:donor_id", selectBookings)
router.get("/bookddate", selectBookDate);
router.post("/soupreserve", registerBooking);
router.post("/signin", authenticationDonor);
router.get("/verify/:token_mail", verifyEmail);
router.post("/signup", registerDonors);
router.put("/forgetpass/:email",updatePassword);
module.exports = router;





function getapproveBookingsForPass(req, res, next)
{
  bookingsService
.getapproveBookingsForPass(req.params.id, req.params.name)
.then((books) => res.json(books))
.catch(next);

}

function selectAllBookingsForDash(req, res, next)
{
  bookingsService
.selectAllBookingsForDash()
.then((book) => res.json(book))
.catch(next);

}


function confirmDonationNotReceive(req, res, next) {
  bookingsService
    .confirmDonationNotReceive(req.query.booking_id, req.body)
    .then((booking) => res.json(booking))
    .catch(next);
}

function confirmDonationReceive(req, res, next) {
  bookingsService
    .confirmDonationReceive(req.query.booking_id, req.body)
    .then((booking) => res.json(booking))
    .catch(next);
}


function selectApprovedBookings(req, res, next)
{
  bookingsService
.selectApprovedBookings()
.then((book) => res.json(book))
.catch(next);

}


function updatePassword(req, res, next) {
  bookingsService
     .updatePassword(req.query.email, req.body)
     .then((booking) => res.json(booking))
     .catch(next);
 }

function updateApproveReject(req, res, next) {
  bookingsService
    .updateApproveReject(req.query.booking_id, req.body)
    .then((booking) => res.json(booking))
    .catch(next);
}

function updateApprove(req, res, next) {
  bookingsService
    .updateApprove(req.query.booking_id, req.body)
    .then((booking) => res.json(booking))
    .catch(next);
}


function selectBookingsForApproval(req, res, next)
{
  bookingsService
.selectBookingsForApproval()
.then((bdonors) => res.json(bdonors))
.catch(next);

}


function updateBookingDelete(req, res, next) {
  bookingsService
    .updateBookingDelete(req.query.booking_id, req.body)
    .then((request) => res.json(request))
    .catch(next);
}

function selectBookings(req, res, next)
{
  bookingsService
.selectBookings(req.params.donor_id)
.then((bookings) => res.json(bookings))
.catch(next);

}

function selectBookDate(req, res, next)
{
  bookingsService
.selectBookDate()
.then((bdonors) => res.json(bdonors))
.catch(next);

}

function authenticationDonor(req, res, next)
  {
    bookingsService
    .authenticationDonor(req.body)
    .then((bdonor) => res.json(bdonor))
    .catch(next);


  }

function verifyEmail(req, res, next)
  {
    bookingsService
    .verifyEmail(req.params.token_mail)
    .then((donor) =>res.json(donor))
    
    .catch(next);


  }


  function registerBooking(req, res, next) {
    bookingsService
       .registerBooking(req.body)
       .then((response) => {
         res.status(response.status);
         res.json(response);
       })
       .catch(next);
   }

function registerDonors(req, res, next) {
   bookingsService
      .registerDonors(req.body)
      .then((response) => {
        res.status(response.status);
        res.json(response);
      })
      .catch(next);
  }