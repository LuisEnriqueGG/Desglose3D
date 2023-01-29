import * as THREE from '/three.js-master/build/three.module.js';
import * as YUKA from './yuka.module.js';
import {
    GLTFLoader
} from './three.js-master/examples/jsm/loaders/GLTFLoader.js';
import {
    OrbitControls
} from './three.js-master/examples/jsm/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0xA3A3A3);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
);
camera.position.set(0, 10, 27);
camera.lookAt(scene.position);


const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 8, 0);
controls.enablePan = false;
//controls.maxPolarAngle = Math.PI /2;
controls.enableDamping = true;

const grid = new THREE.GridHelper(50, 50);
scene.add(grid);

//Posición de las Luces
const skyColor = 0xB1E1FF; // light blue
const groundColor = 0xFFFFFF; // brownish orange
const intensity = 2;
const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
scene.add(light);

const color = 0xFFFFFF;
const intensity1 = 2.5;
const light1 = new THREE.DirectionalLight(color, intensity1);
light1.position.set(0, 10, 7);
scene.add(light1);

const color1 = 0xFFFFFF;
const intensity2 = 2.5;
const light2 = new THREE.DirectionalLight(color1, intensity2);
light2.position.set(0, 10, -7);
scene.add(light2);


const vehicle = new YUKA.Vehicle();
//vehicle.scale.set(0.50, 0.50, 0.50); // x z y

function sync(entity, renderComponent) {
    renderComponent.matrix.copy(entity.worldMatrix);
}

const entityManager = new YUKA.EntityManager();
entityManager.add(vehicle);

const loader = new GLTFLoader();
const group = new THREE.Group();
loader.load('./Objeto3D/Tor2.glb', function (glb) {
    const model = glb.scene;
    model.matrixAutoUpdate = false;
    group.add(model);
    scene.add(group);
    vehicle.setRenderComponent(model, sync);
});

const time = new YUKA.Time();

function animate(t) {
    const delta = time.update().getDelta();
    entityManager.update(delta);
    group.position.y = 0 * Math.sin(t / 500);
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


////

const loader3 = new GLTFLoader();
const group1 = new THREE.Group();
loader3.load('./Objeto3D/Escal.glb', function (glb) {
    const model3 = glb.scene;
    //model3.scale.set(0.5, 0.5, 0.5);
    model3.matrixAutoUpdate = false;
    group1.add(model3);
    scene.add(group1);
    //vehicle1.scale = new YUKA.Vector3(0.50, 0.50, 0.50);
    vehicle1.setRenderComponent(model3, sync1);
});

const vehicle1 = new YUKA.Vehicle();

function sync1(entity1, renderComponent1) {
    renderComponent1.matrix.copy(entity1.worldMatrix);
}

const entityManager1 = new YUKA.EntityManager();
entityManager1.add(vehicle1);

const targetGeometry1 = new THREE.BoxGeometry(0.1, 0.1, 0.1);
const targetMaterial1 = new THREE.MeshPhongMaterial({
    color: 0xA3A3A3
});
const targetMesh1 = new THREE.Mesh(targetGeometry1, targetMaterial1);
targetMesh1.matrixAutoUpdate = false;
scene.add(targetMesh1);

const target1 = new YUKA.GameEntity();
target1.setRenderComponent(targetMesh1, sync1);
entityManager1.add(target1);

const seekBehavior = new YUKA.ArriveBehavior(target1.position, 2.5, 1);
vehicle1.steering.add(seekBehavior);

vehicle1.position.set(20, 0, 0); // posición no recta  x z y

setInterval(function () {
    const x = Math.random() * 3;
    const y = Math.random() * 3;
    const z = Math.random() * 3;

    target1.position.set(-0.53, 0.01, 0.1); // x, y, z    posición específica fin
}, 2000);

//Movimiento Mouse Objeto
// const target3 = new YUKA.GameEntity();
// entityManager.add(target3);

// const arriveBehavior = new YUKA.ArriveBehavior(target3.position, 0, 1);
// vehicle1.steering.add(arriveBehavior);
// vehicle1.position.set(0, 0, 0);
// vehicle1.maxSpeed = 3.5;

// const mousePosition = new THREE.Vector2();
// window.addEventListener('mousemove', function (e) {
//     mousePosition.x = (e.clientX / this.window.innerWidth) * 2 - 1;
//     mousePosition.y = -(e.clientY / this.window.innerHeight) * 2 + 1;
// });

// const planeGeo1 = new THREE.PlaneGeometry(500, 500);
// const planeMat1 = new THREE.MeshBasicMaterial({
//     visible: false
// });
// const planeMesh1 = new THREE.Mesh(planeGeo1, planeMat1);
// planeMesh1.rotation.x = -0.5 * Math.PI;
// scene.add(planeMesh1);
// planeMesh1.name = 'plane';

// const raycaster = new THREE.Raycaster();
// window.addEventListener('click', function () {
//     raycaster.setFromCamera(mousePosition, camera);
//     const intersects = raycaster.intersectObjects(scene.children);
//     for (let i = 0; i < intersects.length; i++) {
//         if (intersects[i].object.name === 'plane')
//             target3.position.set(intersects[i].point.x, 0, intersects[i].point.z);
//     }
// });

const time1 = new YUKA.Time();

function animate1(t) {
    const delta = time1.update().getDelta();
    entityManager1.update(delta);
    group1.position.y = 0 * Math.sin(t / 500);
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate1);

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});