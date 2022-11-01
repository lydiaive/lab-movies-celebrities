const { Schema, model } = require("mongoose")

const celebSchema = new Schema ({
    name: String,
    occupation: String,
    catchPhrase: String,
}, { timestamps: true })

const Celebrity = model("Celebrity", celebSchema)

module.exports = Celebrity
