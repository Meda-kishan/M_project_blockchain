const mongoose = require('mongoose');

const ManufactureSchema = new mongoose.Schema({
    companyName: String,
    stateLocation: String,
    panNumber: String,
    numOfEntity: Number,
    govtBodies: String,
    gstNumber: String,
    username: String,
    password: String
});

const ManufactureModel = mongoose.model("manufacture", ManufactureSchema);

module.exports = ManufactureModel;