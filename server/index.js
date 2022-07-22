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
app.post("/registeruser",function(request,response) {
    var data={
        UserName:request.body.UserName,
        Mobile:request.body.Mobile,
        Email:request.body.Email,
        Password:request.body.Password,
        City:request.body.City,
        State:request.body.State,
        Postal:parseFloat(request.body.Postal),
        Address:request.body.Address,
        Payment:request.body.Payment
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
