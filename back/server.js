const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRouter = require('./product.router')
const path = require('path');
const multer = require('multer');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));



const MIME_TYPE_MAP ={
    "image/png": "png",
    "image/jpg": "jpg",
    "image/jpeg": "jpg"
};
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid meme type error');
        if (isValid) {
            error = null;
        }
        cb(error, 'public/images');
    },
    filename: function (req, file, cb) {
        const name = file.originalname
            .toLowerCase()
            .split(" ")
            .join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + "." + ext);
    }
});


app.get('/', (req, res) => {res.send('The Main Page');});
app.use('/product',multer({ storage: storage }).single('product_picture'),productRouter);


mongoose.connect('mongodb://localhost/fileupload', { useNewUrlParser: true },(error)=>{
    if(error){
        console.log('Not connected to the database')
    }else{
        console.log('connected successfuly to database');
    }
});

app.listen(3000, () => console.log('Server is running on 3000!'));