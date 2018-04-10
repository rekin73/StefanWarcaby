var http = require("http");
var qs = require("querystring");
var fs = require("fs");
var users = [];
var servres = function (req, res) {
    var allData = "";
    req.on("data", function (data) {
        console.log("data: " + data)
        allData += data;
    })
    req.on("end", function (data) {
        var finishObj = qs.parse(allData)

        switch (finishObj.akcja) {
            //dodanie nowego usera
            case "DODAJ_UZYTKOWNIKA":
                console.log("Dodawanie użytkownków")
                if (users.length < 2) {
                    if (users.length == 1 && users[0] == finishObj.user) {
                        res.end(JSON.stringify({akcja: "UserNameIsTaken", UserName: finishObj.user }))
                    }
                    else {
                        var pColor;
                        if(users.length==0){
                            pColor="white";
                        }else{pColor="black"}
                        users.push(finishObj.user)
                        res.end(JSON.stringify({akcja:"LoginAccepted",UserName:finishObj.user,UserColor:pColor}))
                    }
                }
                else {
                    res.end(JSON.stringify({akcja:"RoomIsFull",UserName:finishObj.user}))
                }
                break;
            //inna akcja
            case "INNA_AKCJA":
                console.log("inna akcja")
                break;
        }
    })



}


var server = http.createServer(function (req, res) {
    switch (req.method) {
        case "GET":
            // tu wykonaj załadowanie statycznej strony z formularzem
            console.log("żądany przez przeglądarkę adres: " + req.url)
            if (req.url === "/") {
                fs.readFile("static/index.html", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    res.end();
                })
            }

            else if (req.url === "/style.css") {
                fs.readFile("static/css/style.css", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.write(data);
                    res.end();
                })
            }

            else if (req.url === "/Game.js") {
                fs.readFile("static/js/Game.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            /*
            else if (req.url === "/TEST.js") {
                fs.readFile("static/js/TEST.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            */
            else if (req.url === "/UI.js") {
                fs.readFile("static/js/UI.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }

            else if (req.url === "/Main.js") {
                fs.readFile("static/js/Main.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }

            else if (req.url === "/Net.js") {
                fs.readFile("static/js/Net.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/THREE.js") {
                fs.readFile("static/libs/three.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/MyLight.js") {
                fs.readFile("static/js/MyLight.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }

            else if (req.url === "/mats/test.jpg") {
                fs.readFile("static/mats/test.jpg", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/mats/marble_w.jpg") {
                fs.readFile("static/mats/marble_w.jpg", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                    res.write(data);
                    res.end();
                })
            }
            break;
        case "POST":
            // tu wywołaj funkcję "servResponse", która pobierze dane przesłane 
            // w formularzu i odpowie do przeglądarki 
            // (uwaga - adres żądania się nie zmienia)

            servres(req, res)

            break;

    }



})


server.listen(3000, function () {
    console.log("serwer startuje na porcie 3000")
});