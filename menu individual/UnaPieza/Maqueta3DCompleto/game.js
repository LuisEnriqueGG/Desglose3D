import * as THREE from './three.js-master/build/three.module.js';
import {
  GLTFLoader
} from './three.js-master/examples/jsm/loaders/GLTFLoader.js'
import {
  OrbitControls
} from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js';
//import { GLTFLoader } from 'https://unpkg.com/three/examples/jsm/loaders/GLTFLoader.js';
var scene, camera, renderer, cube, controls;

function init() {


  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000000);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xA3A3A3);
  document.body.appendChild(renderer.domElement);

  const square = new THREE.BoxGeometry(1, 0.1, 1);
  const lightsquare = new THREE.MeshBasicMaterial({
    color: 0xE0A888
  });
  const darksquare = new THREE.MeshBasicMaterial({
    color: 0x6A9999
  });

  const board = new THREE.Group();

  for (let x = 0; x < 10; x++) {
    for (let z = 0; z < 10; z++) {
      let cube;
      if (z % 2 == 0) {
        cube = new THREE.Mesh(square, x % 2 == 0 ? lightsquare : darksquare);
      } else {
        cube = new THREE.Mesh(square, x % 2 == 0 ? darksquare : lightsquare);
      }

      cube.position.set(x, 0, z);
      board.add(cube);
    }
  }

  scene.add(board);
  //Agregar modelo 3d a HTML
  const loader = new GLTFLoader();
  loader.load('../Maqueta3DCompleto/ProyectoHD.glb', function (gltf) {
    console.log(gltf)
    const root = gltf.scene;
    root.scale.set(0.6, 0.6, 0.7)
    scene.add(gltf.scene); //necesario borrar si se va a cambiar tamaño de un objeto
  });


  ///Posición de las Luces

  const light = new THREE.PointLight(0xffffff, 1, 10950);
  light.position.set(-120,50, 90); // X  Z   Y
  scene.add(light);

  const light2 = new THREE.PointLight(0xffffff, 1, 15000);
  light2.position.set(120, 50, 110); // X  Z   Y
  scene.add(light2);

  const light3 = new THREE.PointLight(0xffffffff, 1, 15000);
  light3.position.set(-120, 50, -250); // X  Z   Y
  scene.add(light3);

  const light4 = new THREE.PointLight(0xffffffffffff, 1, 15000);
  light4.position.set(130, 50, -250); // X  Z   Y
  scene.add(light4);

  const light5 = new THREE.PointLight(0xffffffffffff, 4, 15000);
  light5.position.set(0, 170, -70); // X  Z   Y
  scene.add(light5);

  ///Posición de las Luces


  camera.position.y = 150;
  camera.position.z = 100;
  camera.position.x = 100;
  camera.lookAt(0, 0, 0);

  ///controles de orbiata 
  controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 50, -70);
  controls.enablePan = false;
  //controls.maxPolarAngle = Math.PI /2;
  controls.enableDamping = true;

  window.requestAnimationFrame(animate);

}

function animate() {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}


function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

window.addEventListener('resize', onWindowResize);

window.onload = init;