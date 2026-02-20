<?php
$pageTitle = '3D-Viewer — MESH-S v2';
$metaDescription = 'Interaktiver 3D-Viewer für MESH-S Modelle.';
$activeNav = 'viewer';
$pageScripts = ['js/variants.js'];
require __DIR__ . '/partials/header.php';
?>
<section class="viewer-page">
  <div class="container">
    <h1 class="section-title">3D-Viewer</h1>
    <p class="section-subtitle">Ziehen zum Drehen, Scrollen zum Zoomen.</p>
    <div class="variant-switch" role="group" aria-label="Variantenauswahl">
      <button class="variant-option" type="button" data-variant="s">S</button>
      <button class="variant-option" type="button" data-variant="m">M</button>
      <button class="variant-option" type="button" data-variant="l">L</button>
      <button class="variant-option" type="button" data-variant="xl">XL</button>
    </div>
    <div id="viewerCanvasWrap" style="height:60vh; margin-top:1rem;"></div>
    <div id="viewerOverlay" class="viewer-overlay"><div class="viewer-overlay-card"><div id="viewerLoading">3D-Modell wird geladen…</div><div id="viewerProgress">0%</div><div id="viewerError" class="viewer-error is-hidden">Modell nicht verfügbar.</div></div></div>
  </div>
</section>
<script type="importmap">{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js","three/addons/controls/OrbitControls.js":"https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js","three/addons/loaders/GLTFLoader.js":"https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js"}}</script>
<script type="module">
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
const wrap=document.getElementById('viewerCanvasWrap'),overlay=document.getElementById('viewerOverlay'),progress=document.getElementById('viewerProgress'),err=document.getElementById('viewerError');
const variant=()=>new URLSearchParams(location.search).get('v')||'s';
const scene=new THREE.Scene(); scene.background=new THREE.Color(0xe6e6e6);
const camera=new THREE.PerspectiveCamera(45,1,0.1,1000); camera.position.set(2.5,1.8,2.5);
const renderer=new THREE.WebGLRenderer({antialias:true}); wrap.appendChild(renderer.domElement);
const controls=new OrbitControls(camera, renderer.domElement);
scene.add(new THREE.HemisphereLight(0xffffff,0x1d1f2a,1.0)); const dl=new THREE.DirectionalLight(0xffffff,0.8); dl.position.set(4,6,3); scene.add(dl);
let current=null;
function resize(){const w=wrap.clientWidth,h=wrap.clientHeight||420;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h);} window.addEventListener('resize',resize); resize();
function animate(){requestAnimationFrame(animate);controls.update();renderer.render(scene,camera);} animate();
function load(){overlay.classList.remove('is-hidden'); err.classList.add('is-hidden'); progress.textContent='0%';
 const loader=new GLTFLoader(); loader.load(`assets/variants/${variant()}/models/mesh-${variant()}.glb`, gltf=>{ if(current) scene.remove(current); current=gltf.scene; scene.add(current); overlay.classList.add('is-hidden'); },e=>{ if(e.total) progress.textContent=`${Math.round(e.loaded/e.total*100)}%`; },()=>{err.classList.remove('is-hidden');});}
window.addEventListener('popstate',load); document.querySelectorAll('.variant-option').forEach(b=>b.addEventListener('click',()=>{const u=new URL(location.href);u.searchParams.set('v',b.dataset.variant);history.pushState({},'',u.pathname+u.search);load();}));
load();
</script>
<?php require __DIR__ . '/partials/footer.php'; ?>
