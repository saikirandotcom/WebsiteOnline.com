var mongoClient=require("mongodb").MongoClient;
var express=require("express");
var cors=require("cors");

var app=express();
var connectionString="mongodb://127.0.0.1:27017";

app.use(express.urlencoded({
    extended:true
}));
app.use(express.json());
app.use(cors());

app.use("/getusers",function(request,response) {
    mongoClient.connect(connectionString,function(err,clientObj) {
        if(!err) {
            var database=clientObj.db("northwind");
            database.collection("tblRegister").find({}).toArray(function(err,documents) {
                if(!err) {
                    response.send(documents);
                }
            })
        }
    })
});
app.use("/registerusers",function(request,response) {
    var data={
        UserName:request.body.UserName,
        Password:request.body.Password,
        Email:request.body.Email,
        City:request.body.City,
        Postal:parseFloat(request.body.Postal),
        Address:request.body.Address,
        State:request.body.State,
        Payment:request.body.Payment,
        Mobile:request.body.Mobile
    };
    mongoClient.connect(connectionString,function(err,clientObj) {
        if(!err) {
            var database=clientObj.db("northwind");
            database.collection("tblRegister").insertOne(data,function(err,result) {
                if(!err) {
                    console.log("Record Inserted..")
                }
            })
        }
    })
});
app.listen(5000);
console.log("Server Started: http://localhost:5000");
