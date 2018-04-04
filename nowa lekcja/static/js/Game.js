/*
    klasa Game
*/

function Game() {

    /*
        zmienna prywatna widoczna tylko w tym pliku / klasie
    */

    var test = 10;

    /*
        zmienna publiczna, dostępna z innych klas, nie używać
    */

    //this.test = 0; 

    /*
        funkcja prywatna widoczna tylko w tej klasie
    */

    var init = function () {
        $("h1").html("gra startuje, zmienna test = " + test)
        console.log("Game.init")
        var scene = new THREE.Scene();
        var planeTab = [];
        var brickWidth = 100;
        var brickHeight = 50;
        var camera = new THREE.PerspectiveCamera(
            45, // kąt patrzenia kamery (FOV - field of view)
            window.innerWidth / window.innerHeight, // proporcje widoku, powinny odpowiadać proporjom naszego ekranu przeglądarki
            0.1, // minimalna renderowana odległość
            10000 // maxymalna renderowana odległość
        );
        var renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0xffffff);
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.position.set(-6*brickWidth, 4*brickHeight, 4*brickWidth )
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        var axes = new THREE.AxesHelper(1000)
        var planeGeo = new THREE.PlaneGeometry(1000, 1000, 20, 20)

        var material = new THREE.MeshBasicMaterial({
            color: 0x8888ff,
            side: THREE.DoubleSide,
            wireframe: true,
            transparent: true,
            opacity: 0.5
        });
        var lightMesh = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            specular: 0xffffff,
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load("mats/marble_w.jpg"),
        })
        var darkMesh = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            specular: 0xffffff,
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load("mats/test.jpg"),
        })
        var boxMaterial = [new THREE.MeshBasicMaterial({
            color: 0x8888ff,
            side: THREE.DoubleSide,
            wireframe: false,
            transparent: false,
            opacity: 1
        }), new THREE.MeshBasicMaterial({
            color: 0x8888ff,
            side: THREE.DoubleSide,
            wireframe: false,
            transparent: false,
            opacity: 1
        }), new THREE.MeshBasicMaterial({
            color: 0x255077,
            side: THREE.DoubleSide,
            wireframe: false,
            transparent: false,
            opacity: 1
        }), new THREE.MeshBasicMaterial({
            color: 0x255077,
            side: THREE.DoubleSide,
            wireframe: false,
            transparent: false,
            opacity: 1
        }), new THREE.MeshBasicMaterial({
            color: 0x9944aa,
            side: THREE.DoubleSide,
            wireframe: false,
            transparent: false,
            opacity: 1
        }), new THREE.MeshBasicMaterial({
            color: 0x9944aa,
            side: THREE.DoubleSide,
            wireframe: false,
            transparent: false,
            opacity: 1
        })];
        var boxGeo = new THREE.BoxGeometry(brickWidth, brickHeight, brickWidth);
        var pieceGeo= new THREE.CylinderGeometry( brickWidth/2, brickWidth/2, brickHeight/2, 32 );
        var plane = new THREE.Mesh(planeGeo, lightMesh);
        var box1 = new THREE.Mesh(boxGeo, lightMesh)
        var box2 = new THREE.Mesh(boxGeo, boxMaterial)
        var pieceWhite=new THREE.Mesh(pieceGeo,lightMesh);
        box1.position.set(0, 10, 0)
        box2.position.set(-475, 25, 0)

        //scene.add(box2)
        plane.rotateX(Math.PI / 2);
        var light = new THREE.SpotLight(0xffffff, 5, 1000, 3.14);
        light.position.set(100, 100, 100);
        light.lookAt(scene.position);
        //scene.add(light);
        var myLight = new MyLight('0x0055aa').getLight();
        myLight.position.set(0, 200, 0)

        //console.log(myLight)
        // myLight.changeLightColor ('0xff0000')
        plane.receiveShadow = true
        console.log(plane)
        scene.add(myLight);
        scene.add(axes);
        //scene.add(plane);
        for (var i = 0; i < 8; i++) {
            planeTab.push([])
            for (var j = 0; j < 8; j++) {
                if(i%2==0&&j%2==0||i%2!=0&&j%2!=0){
                planeTab[i].push(new THREE.Mesh(boxGeo, lightMesh));
                }else{planeTab[i].push(new THREE.Mesh(boxGeo, darkMesh));}
                planeTab[i][j].position.set(brickWidth*i+(0.5*brickWidth),0,brickWidth*j+(0.5*brickWidth));
                scene.add(planeTab[i][j])
            }
        }
        pieceWhite.position.set(0.5*brickWidth,0,0.5*brickWidth);
        pieceWhite.position.y+=brickHeight/2;
        scene.add(pieceWhite);
        /* 
        planeTab.forEach(element => {
            scene.add(element)
        }); */
        
        console.log(planeTab);
        

        function render() {

            requestAnimationFrame(render);

            //ciągłe renderowanie / wyświetlanie widoku sceny nasza kamerą

            renderer.render(scene, camera);
        }
        $("#root").append(renderer.domElement);
        camera.lookAt(4*brickWidth, 0, 4*brickWidth)

        render();
    }

    init();

    /*
        funkcje publiczne możliwe do wywołania z innych klas
    */


    this.setTest = function (val) {
        test = val;
        $("h1").html("ustawiam test w klasie Game na: " + test)
    }

    this.getTest = function () {
        return test;
    }

}
