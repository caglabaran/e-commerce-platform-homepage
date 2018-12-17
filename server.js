var express = require('express');
var app = express();


app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


app.use(express.static('src'));

app.get('/products/:keyword', (req, resDoc) =>{
    const http = require("http");
    const keyword= req.params.keyword;
    let url = "http://api.walmartlabs.com/v1/search?format=json&facet=on&apiKey=gtjdf6yfeebwyw9pp9s6tmyd";
    url = url + "&query=" +keyword;
    http.get(url, res => {
        
        let body = "";

        res.on("data", data => {
            body += data; 
        });
        
        res.on("end", () => {
            body = JSON.parse(body);

            if(res.statusCode ==200 ){
                resDoc.send(body); //you probably want to wrap data inside JSON.stringify()
                resDoc.end();  
            }
            console.log('end');
        });

        res.on('error', function(e) {
            console.log('ERROR: ' + e.message);
        });
        
    });

    // req.on('error', function(e) {
    //     console.log('ERROR: ' + e.message);
    // });
});


app.get('/suggestedKeywords/:keyword', (req, resDoc) =>{
    const https = require("https");
    const keyword= req.params.keyword;
    let url = "https://www.walmart.com/search/autocomplete/v1/0/";
    url = url + keyword;
    https.get(url, res => {
        
        let body = "";

        res.on("data", data => {
            body += data; 
        });
        
        res.on("end", () => {
            if(res.statusCode ==200 ){
                resDoc.send(body); //you probably want to wrap data inside JSON.stringify()
                resDoc.end();  
            }
            console.log('end');
        });

        res.on('error', function(e) {
            console.log('ERROR: ' + e.message);
        });
        
    });

    // req.on('error', function(e) {
    //     console.log('ERROR: ' + e.message);
    // });
});


var server = app.listen(5000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Express app listening at http://localhost:%s', port);

});

