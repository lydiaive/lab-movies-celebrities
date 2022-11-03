const { Schema, model } = require("mongoose")
const Movie = require("../models/Movie.model")

const celebSchema = new Schema ({
    /* _id: Schema.Types.ObjectId, */
    name: String,
    occupation: String,
    catchPhrase: String,
}, { timestamps: true })

const Celebrity = model("Celebrity", celebSchema)

module.exports = Celebrity
