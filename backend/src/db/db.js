const mongoose = require("mongoose");

const connectToDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Successfully connected to DB");
    })
    .catch((err) => {
      console.log("Error occured in connection: ", err);
    });
};


module.exports = connectToDB