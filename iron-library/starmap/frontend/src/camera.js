import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function createCamera() {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    5000
  );

  camera.position.set(0, 0, 700);

  return camera;
}

export function createControls(camera, renderer) {
  const controls = new OrbitControls(camera, renderer.domElement);

  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 40;
  controls.maxDistance = 1800;

  return controls;
}

export function flyToMeshes(meshes) {
  if (!meshes.length) return null;

  const center = new THREE.Vector3();

  meshes.forEach((mesh) => {
    center.add(mesh.position);
  });

  center.divideScalar(meshes.length);

  return {
    focusTarget: center.clone(),
    cameraTarget: center.clone().add(new THREE.Vector3(0, 0, 240))
  };
}

export function updateCameraFocus(camera, controls, focusTarget, cameraTarget) {
  if (!focusTarget || !cameraTarget) return;

  controls.target.lerp(focusTarget, 0.035);
  camera.position.lerp(cameraTarget, 0.035);
}