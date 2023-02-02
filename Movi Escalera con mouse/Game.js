import * as THREE from '/three.js-master/build/three.module.js';
import * as YUKA from './yuka.module.js';
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './three.js-master/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from './TransformControls.js';
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

renderer.setClearColor(0xA3A3A3);

const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
);

camera.position.set(0, 10, 27);  // x z y
camera.lookAt(scene.position);

///controles de orbiata 
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
loader.load('./Objetos3D/Torre.glb', function (glb) {
    const model = glb.scene;
    model.matrixAutoUpdate = false;
    group.add(model);
    scene.add(group);
    vehicle.setRenderComponent(model, sync);
});

vehicle.position.set(0, 0, 0);

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

///
const renderer1 = new THREE.WebGLRenderer({ antialias: true });
renderer1.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer1.domElement);
//renderer.setClearColor(0xA3A3A3);

const vehicle1 = new YUKA.Vehicle();

//vehicle1.scale.set(0.50, 0.50, 0.50); // x z y

function sync1(entity1, renderComponent1) {
    renderComponent1.matrix.copy(entity1.worldMatrix);
}

const entityManager1 = new YUKA.EntityManager();
entityManager1.add(vehicle1);

const loader1 = new GLTFLoader();
const group1 = new THREE.Group();
loader1.load('./Objetos3D/Escalera.glb', function (glb1) {
    const model1 = glb1.scene;
    model1.matrixAutoUpdate = false;
    group1.add(model1);
    scene.add(group1);
    vehicle1.setRenderComponent(model1, sync1);
});

const target1 = new YUKA.GameEntity();
entityManager1.add(target1);

const arriveBehavior1 = new YUKA.ArriveBehavior(target1.position, 1, 0.2);
vehicle1.steering.add(arriveBehavior1);

vehicle1.position.set(20, 0, 0);
vehicle1.maxSpeed = 2.5;

const mousePosition1 = new THREE.Vector2();

window.addEventListener('mousemove', function (e) {
    mousePosition1.x = (e.clientX / this.window.innerWidth) * 2 - 1;
    mousePosition1.y = -(e.clientY / this.window.innerHeight) * 2 + 1;
});

const planeGeo1 = new THREE.PlaneGeometry(100, 100);
const planeMat1 = new THREE.MeshBasicMaterial({ visible: false });
const planeMesh1 = new THREE.Mesh(planeGeo1, planeMat1);
planeMesh1.rotation.x = -0.5 * Math.PI;
scene.add(planeMesh1);
planeMesh1.name = 'plane';

const raycaster1 = new THREE.Raycaster();

window.addEventListener('click', function () {
    raycaster1.setFromCamera(mousePosition1, camera);
    const intersects = raycaster1.intersectObjects(scene.children);
    for (let i = 0; i < intersects.length; i++) {
        if (intersects[i].object.name === 'plane')
            target1.position.set(intersects[i].point.x, 0, intersects[i].point.z);
    }
});

const time1 = new YUKA.Time();

function animate1(t) {
    const delta1 = time1.update().getDelta();
    entityManager1.update(delta1);
    group1.position.y = 0 * Math.sin(t / 500);
    renderer1.render(scene, camera);
}

renderer1.setAnimationLoop(animate1);

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer1.setSize(window.innerWidth, window.innerHeight);
});
