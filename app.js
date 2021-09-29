const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');


const app = express();

app.set('view engine','ejs');
app.set('views','frontend');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));




const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'products'
});

connection.connect((err)=>{
    if(!err){
        console.log("Connected to Products DB");
    }
    else{
        console.log(err);
    }
});

app.get('/',(req,res)=>{

    let select = "select * from prod_details";
    let query = connection.query(select, (err, rows)=>{
        if(err){
            throw err;
        }
        res.render('home', 
        {
            title: " | home",
            products : rows
        });

    });
    
    // res.send("deiii");
});


app.get('/add',(req, res)=>{
    res.render("add",
    {
        title: " | Add a product"
    } );
})


app.post('/save', (req,res)=>{
    let data = {prod_id: req.body.productId, 
                prod_name: req.body.productName, 
                description: req.body.description,
                seller: req.body.seller,
                seller_email: req.body.sellerEmail,
                ph_no: req.body.sellerMobileNumber,
                seller_address: req.body.sellerAddress
    }
    // console.log(data);
    let insert = "insert into prod_details set ?";
    let query = connection.query(insert, data, (err, results)=>{
        if(err) throw err;
        res.redirect('/');
    })
})

app.get('/edit/:productId',(req, res)=>{
    const productId = req.params.productId;
    let select = `select * from prod_details where prod_id = '${productId}'`;
    let query = connection.query(select,(err, result)=>{
        if(err) throw err
        res.render('edit', {
            title: " | Edit the Product",
            product: result[0]
        });
    });
});

app.post('/update',(req,res)=>{
    const productId = req.body.productId;
    let update = "update prod_details set prod_id = ' " + req.body.productId + " ', prod_name = ' " + req.body.productName + " ', description = ' " + req.body.description + " ', seller = ' " + req.body.seller + " ', seller_email = ' " + req.body.sellerEmail + " ', ph_no = ' " + req.body.sellerMobileNumber + " ', seller_address = ' " + req.body.sellerAddress + " ' where prod_id = '" + req.body.productId + "'" ;
    
    let query = connection.query(update, (err, result)=>{
        if(err) throw err
        let data = {prod_id: req.body.productId, 
            prod_name: req.body.productName, 
            description: req.body.description,
            seller: req.body.seller,
            seller_email: req.body.sellerEmail,
            ph_no: req.body.sellerMobileNumber,
            seller_address: req.body.sellerAddress
}
        console.log("updated", data);
        res.redirect('/');
    })
})


app.get('/delete/:productId',(req, res)=>{
    const productId = req.params.productId;
    let select = `delete from prod_details where prod_id = '${productId}'`;
    let query = connection.query(select,(err, result)=>{
        if(err) throw err
        console.log(productId," deleted");
        res.redirect('/');
        });
    });


app.listen(4000,()=>{
    console.log('listening on the port 4000');
});
