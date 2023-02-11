import * as THREE from '/aplicación de colores/three.js-master/build/three.module.js';
        import * as YUKA from './yuka.module.js';
        import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js';
        import { OrbitControls } from './three.js-master/examples/jsm/controls/OrbitControls.js';
        import * as dat from '/aplicación de colores/dat.gui/build/dat.gui.module.js';

        const fileUrl = new URL('../aplicación de colores/Objetos3D/Ejem1.glb', import.meta.url);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xA3A3A3);
        document.body.appendChild(renderer.domElement);

        const scene = new THREE.Scene(); 

        const camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            10000
        );
        camera.position.set(0, 10, 27);
        

        const orbit = new OrbitControls(camera, renderer.domElement);
        orbit.target.set(0, 8, 0);
        orbit.enablePan = false;
        //orbit.maxPolarAngle = Math.PI /2;
        orbit.enableDamping = true;
        orbit.update();
        
        const grid = new THREE.GridHelper(50, 50);
        scene.add(grid);

        const skyColor = 0xB1E1FF; // light blue
        const groundColor = 0xFFFFFF; // brownish orange
        const intensity1 = 2;
        const light = new THREE.HemisphereLight( skyColor, groundColor, intensity1);
        scene.add(light);

        const color = 0xFFFFFF;
        const intensity = 2.5;
        const light1 = new THREE.DirectionalLight(color, intensity);
        light1.position.set(0, 10, 7);
        scene.add(light1);

        const color2 = 0xFFFFFF;
        const intensity2 = 2.5;
        const light2 = new THREE.DirectionalLight(color2, intensity2);
        light2.position.set(0, 10, -7);
        scene.add(light2);

        const gui = new dat.GUI();

        const options = {
            'Objeto completo': 0x7C7C7C,
            'Tubos': 0x7C7C7C,
            'Escalera': 0x7C7C7C,
            
        }

        const assetLoader = new GLTFLoader();

        assetLoader.load(fileUrl.href, function (gltf) {
            const model = gltf.scene;
            scene.add(model);
            console.log(model);
            console.log(model.getObjectByName('Mesh176'));
            console.log(model.getObjectByName('Mesh176_1'));

            gui.addColor(options, 'Objeto completo').onChange(function (e) {
                model.getObjectByName('Mesh176').material.color.setHex(e);
            });

            gui.addColor(options, 'Tubos').onChange(function (e) {
                model.getObjectByName('Mesh176_1').material.color.setHex(e);
            });

            gui.addColor(options, 'Escalera').onChange(function (e) {
                model.getObjectByName('Mesh176_2').material.color.setHex(e);
            });


        }, undefined, function (error) {
            console.error(error);
        });

        function animate() {
            renderer.render(scene, camera);
        }

        renderer.setAnimationLoop(animate);

        window.addEventListener('resize', function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });