const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    branch: { type: String, required: true }, // Hyderabad / Bangalore / Chennai
    role: { type: String, required: true }
});

module.exports = mongoose.model('Employee', employeeSchema);