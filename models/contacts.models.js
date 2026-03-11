const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    first_name: { type: String, required: true }, // Added 'required'
    last_name: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String }
});

// Rename 'contact' to 'Contact' (by convention, models are Capitalized)
const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;