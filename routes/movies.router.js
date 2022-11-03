const router = require("express").Router();

const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model")


router.get("/movies", async(req, res, next) => {
  try {
    const dbMovies = await Movie.find()
    console.log(dbMovies)
    res.render("movies/movies", {dbMovies})
  } catch (err) {
    console.log(err)
  }
});

router.get("/create", async(req, res, next) => {
    try {
        const dbCelebs = await Celebrity.find()
        console.log(dbCelebs)
        res.render("movies/new-movie", {dbCelebs})
      } catch (err) {
        console.log(err)
      }
  });
  
router.post("/create", async(req, res) => {

try {
    const newMovie = await Movie.create(req.body)
    console.log("new movie created")
    res.redirect("/movies/movies")
} catch (err) {
    console.log(err)
}
})

router.get("/m/:id", async(req, res, next) => {
      const id = req.params.id
  try {
      const dbMovies = await Movie.findById(id)
      const celebPopulate = await dbMovies.populate("cast")
      console.log(dbMovies)
      res.render("movies/movie-details", {dbMovies})
    } catch (err) {
      console.log(err)
    }
});

router.post("/m/:id/delete", async(req, res, next) => {
  const id = req.params.id
try {
  const dbMovies = await Movie.findByIdAndDelete(id)
  console.log('Movie removed')
  res.redirect("/movies/movies")
} catch (err) {
  console.log(err)
}
});

router.get("/m/:id/edit", async(req, res, next) => {
  const id = req.params.id
try {
  const dbMovies = await Movie.findById(id)
  const dbCelebs = await Celebrity.find()
  let data = dbCelebs.map(el => {
    return {
    _id : el._id,
    name: el.name,
  }
  })
  console.log(data)

  for (let i = 0; i < data.length; i++) { 
    if (dbMovies.cast.includes(data[i]._id)) {
      data[i].checked = true
    }//console.log(data[i].checked)
  }
  console.log(data, "verändert")
  res.render('movies/edit-movie', {dbMovies, data})
} catch (err) {
  console.log(err)
}
});

router.post("/m/:id/edit", async(req, res, next) => {
  const id = req.params.id
  const movie = req.body
try {
  const dbMovies = await Movie.findByIdAndUpdate(id, movie)
  console.log('Movie updated')
  res.redirect(`/movies//m/${id}/`)
} catch (err) {
  console.log(err)
}
});



module.exports = router;