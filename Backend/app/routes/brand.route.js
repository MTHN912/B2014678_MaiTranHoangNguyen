const express = require("express");

const brands = require("../controllers/brand.controller");

const router = express.Router();



router.route("/")
  .get(brands.findAll)
  .post(brands.create)
  .delete(brands.deleteAll);

router.route("/:id")
  .get(brands.findOne)
  .put(brands.update)
  .delete(brands.delete);



module.exports = router;

