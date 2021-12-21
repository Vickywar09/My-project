import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { OctahedronGeometry, Scene, TetrahedronGeometry } from 'three';

const scean = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight , 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas : document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(70);

renderer.render( scean , camera ); //Dont forget this line or else it wont'render 

const geometry = new THREE.TorusKnotGeometry( 9, 2, 100, 7, 5, 9);
const material = new THREE.MeshStandardMaterial({color : 0x270045});
const torus = new THREE.Mesh(geometry, material);
torus.position.x = 5;
torus.position.z = 8;

scean.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,20,20)

scean.add(pointLight)

const controls = new OrbitControls(camera, renderer.domElement);

const marsTexture = new THREE.TextureLoader().load('mars.jpg');
const marsNormal = new THREE.TextureLoader().load('mars_normal.jpg')
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map : marsTexture,
    normalMap : marsNormal
  })
  );
  mars.position.z = 30;
  mars.position.x =-10;
  scean.add(mars);


function addStar(){
const geometry = new THREE.SphereGeometry(0.25, 24, 24);
const material = new THREE.MeshStandardMaterial({color : 0xffffff});
const star = new THREE.Mesh( geometry, material);
const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
star.position.set(x,y,z);
scean.add(star)
}//Bruh
Array(1000).fill().forEach(addStar) //Amounts of star to be rendered

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scean.background = spaceTexture;

function moveCamera(){
  const currentPos = document.body.getBoundingClientRect().top;
  mars.rotation.x += 0.05;
  mars.rotation.y += 0.075;
  mars.rotation.z += 0.05;


  camera.position.z = currentPos * -0.01;
  camera.position.y = currentPos * -0.0002;
  camera.position.x = currentPos * -0.0002;
}
document.body.onscroll = moveCamera

function animate(){
  requestAnimationFrame( animate );
  torus.rotation.x += 0.05;
  torus.rotation.y += 0.009; 
  torus.rotation.z += 0.05;
  
  mars.rotation.x += 0.02;
  mars.rotation.y += 0.008;
  mars.rotation.z += 0.02;

  controls.update();
  renderer.render( scean, camera);
}

animate()
