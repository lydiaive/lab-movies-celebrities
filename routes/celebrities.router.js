const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model")
const Movie = require("../models/Movie.model")

/* router.get("/new-celebrity", async(req, res, next) => {
  res.render("celebs/new-celebrity")
}); */

router.get("/celebrities", async(req, res, next) => {
  try {
    const dbCelebs = await Celebrity.find()
    console.log(dbCelebs)
    res.render("celebs/celebrities", {dbCelebs})
  } catch (err) {
    console.log(err)
  }
});

router.get("/create", async(req, res, next) => {
  res.render("celebs/new-celebrity");
});

router.post("/create", async(req, res) => {

  try {
    const newCeleb = await Celebrity.create(req.body)
    console.log("new celeb created")
    res.redirect("/celebs/celebrities")
  } catch (err) {
    console.log(err)
  }
})



module.exports = router;