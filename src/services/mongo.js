const mongoose = require('mongoose');

const MONGO_URL =
  "mongodb+srv://techicode:4RCTjr7oqPMHrfnJ@nasacluster.r0lmg.mongodb.net/nasa?retryWrites=true&w=majority";


mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  mongoose.connect(MONGO_URL);
}

module.exports = mongoConnect;