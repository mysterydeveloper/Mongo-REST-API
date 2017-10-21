const express = require('express');
const bodyParser = require('body-parser');
const mongos = require('mongojs');
const mongojs = require('mongojs');
const db = mongojs('catalog', ['products']);

const app = express();

const port = 3000;


app.use(bodyParser.json());

//fetch home
app.get('/', (req, res, next) =>{
    res.send('Please use /api/products');
} );

//fetch all products
app.get('/api/products', (req, res, next) =>{
    db.products.find((err, docs) => {
        if(err){
            res.send(err);
        }
        console.log('Products found...');
        res.json(docs);

    });

} );

//fetch single products
app.get('/api/products/:id', (req, res, next) =>{
    db.products.findOne({_id: mongojs.ObjectId(req.params.id)},(err, doc) => {
        if(err){
            res.send(err);
        }
        console.log('Product found...');
        res.json(doc); 

    });

} );

app.post('/api/products', (req, res, next) =>{
    db.products.insert(req.body, (err,doc) => {
        if(err){
            res.send(err);
        }
        console.log('Adding Product...');
        res.json(doc); 
    })
} );

app.put('/api/products/:id', (req, res, next) =>{
    db.products.findAndModify({query: {_id: mongojs.ObjectId(req.params.id)} ,
    update: {
        $set:{
            name: req.body.name,
            category: req.body.category,
            details: req.body.details
        }
        
    } ,new:true },(err,doc) => {
        if(err){
            res.send(err);
        }
        console.log('Updating Product...');
        res.json(doc); 
    })
} );

app.delete('/api/products/:id', (req, res, next) =>{
    db.products.remove({_id: mongojs.ObjectId(req.params.id)},(err,doc) => {
        if(err){
            res.send(err);
        }
        console.log('Removing Product...');
        res.json(doc); 
    })    
} );



app.listen(port, () => {
    console.log("Server started on port "+ port);
});