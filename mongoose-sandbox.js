'use strict';

var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/sandbox");

var db = mongoose.connection;

db.on("error", function(err){
    console.error("connection error:", err);
});

db.once("open", function(){
    console.log("db connection successful");
    //all db communication here

    var Schema = mongoose.Schema;
    var animalSchema = new Schema({
        type: {type: String, default: "goldfish"},
        size: String,
        color: String,
        mass: Number,
        name: String
    });

    var Animal = mongoose.model("Animal", animalSchema);

    var elephant = new Animal({
        type: 'elephant',
        size: 'big',
        color: 'gray',
        mass: 600,
        name: 'Tom'
    });

    elephant.save(function(err){
        if (err) {
            console.log("save failed");
        } else {
            console.log("saved");
        }
        db.close(function() {
            console.log("db closed");
        });
    });
});