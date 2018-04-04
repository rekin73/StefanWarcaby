/*
    UI - obsługa interfejsu użytkownika
*/

function Ui() {
    this.resLogin = function (akcja) {
        switch (akcja) {
            case "LoginAccepted":
                $("#login").remove();
                break;
            case "UserNameIsTaken":
                console.log("UIT")
                $("#lLoginLog").text("Użytkownik jest zajęty")
                break;
            case "RoomIsFull":
                $("#lLoginLog").text("Nie było miejsca dla ciebie");
                break;
        }

    }
    //  alert("asd");

    $("#bLogin").on("click", function () {
        //game.setTest($("#txt1").val());
        net.getLogin();
        console.log("LOGIN");

    })

    $("#bt2").on("click", function () {
        $("h1").html("pobieram zmienną test z klasy Game: " + game.getTest());
    })

    $("#bt3").on("click", function () {
        $("h1").html(net.sendData());
    })

}