/*
    obsługa komunikację Ajax - serwer
*/

function Net() {
    this.serverData;
    /*
        funkcja publiczna możliwa do uruchomienia 
        z innych klas
    */

    this.sendData = function () {
        return "na serwer leci ajaxem zmienna z klasy Net = "
            + game.getTest();
    }
    this.getLogin = function () {
        console.log("Dana:" + $("input[name=tbLogin]").val())
        if ($("input[name=tbLogin]").val() == "") {
            console.log("podaj nazwę")
        } else {
            $.ajax({
                url: "http://localhost:3000",
                data: {
                    akcja: "DODAJ_UZYTKOWNIKA",
                    user: $("input[name=tbLogin]").val()
                },
                type: "POST",
                success: function (data) {
                    //czytamy odesłane z serwera dane
                    var obj = JSON.parse(data)
                    console.log(obj)
                    console.log(obj.akcja)
                    ui.resLogin(obj)
                    //var obj = JSON.parse(data)
                    serverData = obj;


                    //tu wypisz sumę w div-ie na stronie

                },
                error: function (xhr, status, error) {
                    console.log('Error: ' + error);
                },
            });
        }
    }
    this.ask=function(){
        
        $.ajax({
            url: "http://localhost:3000",
            data: {
                akcja: "ASK_FOR_PLAYER",
                
            },
            type: "POST",
            success: function (data) {
                //czytamy odesłane z serwera dane
                var obj = JSON.parse(data);
                console.log(obj);
                ui.setWaiting(obj.boool);
                //ui.resLogin(obj)
                //var obj = JSON.parse(data)
                //serverData = obj;


                //tu wypisz sumę w div-ie na stronie

            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error);
            },
        });
        
    }
}