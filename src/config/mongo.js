const mongoose = require("mongoose")
require("dotenv").config()

const connect = (init) => {
    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@sigacluster.na4eect.mongodb.net/sigadb?retryWrites=true&w=majority&appName=sigaCluster`)
        .then(() => {
            init
        })
        .catch((error) => console.log(error))
}

module.exports = connect