const mongoose = require('mongoose')
const express = require('express');
const app = express();
const Contact = require('./models/contacts.models');
mongoose.connect('mongodb://127.0.0.1:27017/contacts-crud').then(()=>{console.log("Database connected Successfully")})
//here .then() methode is executd when database connection is successfull
// Middleware to parse form data 
//we create the models that is mongodb json formated tables inside that folder
/*netstat -ano | findstr :5000 here using this command find the process that are running in back ground and kill the process and start the server with port 5000 freshly*/
app.use(express.urlencoded({ extended: true }));

// Set view engine
app.set('view engine', 'ejs');

// Routes
// Ensure 'Contact' is the model you imported
app.get('/', async (req, res) => {
    const contacts = await Contact.find()
    res.render('home',{contacts})
}); 
//here async and await are the concepts of advanced js refer its meaning..

// Ensure this route is at the top level in main.js
// Change the route parameter name to :email
// Update the route to accept an :id parameter
// This handles the Read operation for a single document
app.get('/show-contact/:id',  async (req, res) => { 
    //const contact = await Contact.findOne({_id:req.params.id}) 
    //Two mwthods of fetching the id
    const contact = await Contact.findById(req.params.id);
    // res.json(contact)
    res.render('show-contact',{contact:contact})

   
});
// This renders the form when you click the link
app.get('/add-contact', (req, res) => {
    res.render('add-contact'); 
});

// This handles the form submission
app.post('/add-contact', async (req, res) => {
    // console.log("Form data received:", req.body);
    // After receiving the data, redirect the user back to the home page
    // res.redirect('/'); 
    const contact = await Contact.insertOne({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        phone:req.body.phone,
        address:req.body.address 
        /*address-->this is the name of the field od database :req.body.address--> this the
        value given the 'name' field of html input field
        */ 
    })
    res.redirect('/')
});

app.get('/update-contact/:id', async (req, res) => {
    const contact = await Contact.findById(req.params.id) 
    res.render('update-contact',{contact}) 


    
});

app.post('/update-contact/:id', async (req, res) => { 
    await Contact.findByIdAndUpdate(req.params.id,req.body) /*here in this methode will
    automatically assign the body of id  with req.body if the id is found with in the database    
    */
    res.redirect('/')
    
  
});

app.get('/delete-contact/:id', async (req, res) => { 
await Contact.findByIdAndDelete(req.params.id) 
res.redirect('/')

    
});



app.listen(5000, () => {
    console.log("Server started successfully at http://localhost:5000");
});