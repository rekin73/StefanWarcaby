/*
    MyLight.js
*/

function MyLight(color) {

    // zmienne: materiał , geometria, światło, mesh
   

    // kontener 3D (pusty obiekt będący pojemnikiem na inne obiekty)

    var container = new THREE.Object3D();
    
    // init

    function init() {

	// tu utwórz materiał , geometrię, światło, mesh
	// i dodaj je do kontenera (add)
    var lightMesh = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        shininess: 100,
        side: THREE.DoubleSide,
        map: new THREE.TextureLoader().load("mats/test.jpg"),
    })
    var light = new THREE.SpotLight(0xffffff, 5, 1000, 3.14);
    lightMesh.castShadow = true
    light.castShadow = true
    container.add(light);
    container.add(lightMesh);
    }

    init();

    // funkcja publiczna zwracająca obiekt kontenera
    // czyli nasze światło wraz z bryłą

    this.getLight = function () {
        return container;
    }

    // inne funkcje publiczne, np zmiana koloru bryły, zmiana koloru światła

    this.changeLightColor = function (color) {
        console.log("zmiana koloru na " + color)
    }

}

