const express = require("express");
const projects = require("../controllers/project.controller");

const router = express.Router();

router.route("/")
    .get(projects.findAll)
    .post(projects.create)
    .delete(projects.deleteAll);

router.route("/favorite")
    .get(projects.findAllFavorite);

router.route("/:id")
    .get(projects.findOne)
    .put(projects.update)
    .delete(projects.delete);

module.exports = router;