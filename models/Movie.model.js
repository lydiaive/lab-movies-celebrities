const { Schema, model } = require("mongoose")
const Celebrity = require("../models/Celebrity.model")

const movieSchema = new Schema ({
    title: String,
    genre: String,
    plot: String,
    cast: [{ type: Schema.Types.ObjectId, ref: 'Celebrity'}]
      /* cast: {
        type: [String]
      } */
}, { timestamps: true })

const Movie = model("Movie", movieSchema)

module.exports = Movie




