/*
    UI - obsługa interfejsu użytkownika
*/

function Ui() {
    var waiting = false;
    this.setWaiting=function(asd){
        waiting=asd;
    }
    this.resLogin = function (akcja) {
        switch (akcja.akcja) {
            case "LoginAccepted":
                $("#login").remove();
                game.afterLogin(akcja.UserColor)
                var curtain = $('<div>');
                $("#curtain").toggleClass("curtain");
                $("#curtain").zIndex($('#root').zIndex()+1)
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
    function waitingForPlayer(wait) {

        var curtain = $('<div>').addClass('wait');
        if (wait) {
            $(document).remove(curtain);
            clearInterval(ask);
        } else {
            $(document).append(curtain);
            console.log("Czekam")
        }
    }
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