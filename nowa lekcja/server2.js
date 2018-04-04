var http = require("http");
var qs = require("querystring");
var fs = require("fs");

var server = http.createServer(function (req, res) {
    console.log("żądany przez przeglądarkę adres: " + req.url)
})



    server.listen(3000, function () {
        console.log("serwer startuje na porcie 3000")
    });