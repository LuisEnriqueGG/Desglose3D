        import * as THREE from './Libreria3D/three.module.js';
        import {
            OrbitControls
        } from './Libreria3D/OrbitControls.js';
        import {
            GLTFLoader
        } from './Libreria3D/GLTFLoader.js';
        import {
            TransformControls
        } from './Libreria3D/TransformControls.js';
        import {RGBELoader} from './Libreria3D/RGBELoader.js';

        const hdrTexture = new URL('../HDRI/scythian_tombs_4k.hdr', import.meta.url);

        //AMBIENTE
        const renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        renderer.setClearColor(0xdcdcdc);  //RGB color chart

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.01, 10000);
        camera.position.set(0, 15, 35);
        camera.lookAt(scene.position);

        const orbit = new OrbitControls(camera, renderer.domElement)
        orbit.target.set(0, 8, 0);
        //orbit.maxPolarAngle = Math.PI /2;

        //////
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1;
        const loader7 = new RGBELoader();
        loader7.load(hdrTexture, function(texture){
             texture.mapping = THREE.EquirectangularRefractionMapping;
             scene.background = texture;
             scene.environment = texture;
             
        });
        /////


        //Posición de las Luces
        const skyColor = 0xB1E1FF; // light blue
        const groundColor = 0xFFFFFF; // brownish orange
        const intensity = 0.5;
        const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
        scene.add(light);

        const color = 0xFFFFFF;
        const intensity1 = 1;
        const light1 = new THREE.DirectionalLight(color, intensity1);
        light1.position.set(0, 10, 7);
        scene.add(light1);

        const color1 = 0xFFFFFF;
        const intensity2 = 1;
        const light2 = new THREE.DirectionalLight(color1, intensity2);
        light2.position.set(0, 10, -7);
        scene.add(light2);

        const grid = new THREE.GridHelper(50, 50);
        scene.add(grid);


        const loader = new GLTFLoader();
        const group = new THREE.Group();
        loader.load('./modelo3D/Ejem1.glb', function (glb) {
            const model = glb.scene;
            model.matrixAutoUpdate = false;
            group.add(model);
            scene.add(group);
            //vehicle.setRenderComponent(model, sync);
        });
        group.position.x = 0


        const tControl = new TransformControls(camera, renderer.domElement)

        tControl.addEventListener('dragging-changed', (e) => {
            orbit.enabled = !e.value
        })

        tControl.attach(group)
        scene.add(tControl)


        tControl.setMode('translate')
        

        animate()
        function animate() {
            requestAnimationFrame(animate)
            //group.rotation.x += 0.01
            //group.rotation.y += 0.01
            renderer.render(scene, camera)
        }


        // ///

        const loader1 = new GLTFLoader();
        const group1 = new THREE.Group();
        loader1.load('./modelo3D/Escal.glb', function (glb) {
            const model1 = glb.scene;
            model1.matrixAutoUpdate = false;
            group1.add(model1);
            scene.add(group1);
            //vehicle.setRenderComponent(model, sync);
        });
        group1.position.x = 4
        group1.position.y = 0
        group1.position.z = -9

        const tControl1 = new TransformControls(camera, renderer.domElement)

        tControl1.addEventListener('dragging-changed', (e) => {
            orbit.enabled = !e.value
        })

        tControl1.attach(group1)
        scene.add(tControl1)

        tControl1.setMode('translate')

        // ///

        // const loader2 = new GLTFLoader();
        // const group2 = new THREE.Group();
        // loader2.load('./modelo3D/Escal.glb', function (glb) {
        //     const model2 = glb.scene;
        //     model2.matrixAutoUpdate = false;
        //     group2.add(model2);
        //     scene.add(group2);
        //     //vehicle.setRenderComponent(model, sync);
        // });
        // group2.position.x = 4
        // group2.position.y = 0
        // group2.position.z = 0

        // const tControl2 = new TransformControls(camera, renderer.domElement)

        // tControl2.addEventListener('dragging-changed', (e) => {
        //     orbit.enabled = !e.value
        // })

        // tControl2.attach(group2)
        // scene.add(tControl2)

        // tControl2.setMode('translate')