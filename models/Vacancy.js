const mongoose = require("mongoose");
const vacancySchema = new mongoose.Schema({
  category: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: String,
  },
});

const Vacancy = mongoose.model("Vacancy", vacancySchema);
module.exports = Vacancy;
