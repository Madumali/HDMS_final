const express = require("express");
const router = express.Router();
const systemUserService = require("./user.service");

router.patch("/user_update/:id", updateUserSelected);
router.get("/list/:uid", selectSingleUser);
router.put("/user_delete/:uid", updateuserDelete);
router.post("/", registerSystemUser);
router.post("/authenticate", authentication);
router.get("/", selectAll);


module.exports = router;



 
// this is not in use for now
function selectSingleUser(req, res, next)
{
systemUserService
.selectSingleUser(req.params.uid)
.then((users) => res.json(users))
.catch(next);

}
function  updateUserSelected(req, res, next) {
  systemUserService
    . updateUserSelected(req.query.uid, req.body)
    .then((user) => res.json(user))
    .catch(next);
}

function updateuserDelete(req, res, next) {
  systemUserService
    .updateuserDelete(req.query.uid, req.body)
    .then((user) => res.json(user))
    .catch(next);
}

function authentication(req, res, next)
  {
systemUserService
    .authentication(req.body)
    .then((user) => res.json(user))
    .catch(next);
  }

function selectAll(req, res, next)
{
systemUserService
.selectAll()
.then((users) => res.json(users))
.catch(next);
}






function registerSystemUser(req, res, next) {
    systemUserService

      .registerSystemUser(req.body)
     
      .then((response) => {
        res.status(response.status);
        // res.message(response.msg);
        res.json(response);
      })
      .catch(next);
  }

  