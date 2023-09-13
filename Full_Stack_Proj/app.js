const express= require('express');
const path = require("path");
const app = express();
const port = 850;

var mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

mongoose.connect('mongodb://localhost/webcontact');
//var contactSchema = new mongoose.Schema

var contactSchema = new mongoose.Schema({
    phone : String,
    name : String,
    email : String,
})

var Contact = mongoose.model('Contact',contactSchema)



app.use('/style',express.static('style'));//to serve the static file
app.use('/static',express.static('static'));//to serve the static file
app.use(express.urlencoded({ extended: true }));


// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')); // Set the views directory


app.get('/',(req ,res )=>{
    const params = {}
    res.status(200).render('home.pug');
});

app.get('/services' ,(req,res)=>{
    const params = {}
    res.status(200).render('services.pug',params);
})
app.get('/Requestacall' ,(req,res)=>{
    const params = {}
    res.status(200).render('call.pug');
})


app.post('/Requestacall' ,(req,res)=>{
    var myData= new Contact(req.body);
    myData.save().then(()=>{
        res.send("This data has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item is not saved")
    })
    
})



//server start

app.listen(port,()=>{
    console.log(`server ${port} is start successfully ` )
});