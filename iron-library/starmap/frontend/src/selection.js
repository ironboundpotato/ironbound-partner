import * as THREE from "three";
import { flyToMeshes } from "./camera.js";
import { updatePanel } from "./ui.js";

export function setupSelection(camera, starMeshes, onFocus) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  window.addEventListener("click", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const hits = raycaster.intersectObjects(starMeshes);

    if (!hits.length) return;

    const selected = hits[0].object;
    const star = selected.userData.star;

    updatePanel(star);

    const targets = flyToMeshes([selected]);

    if (targets) {
      onFocus(
        targets.focusTarget,
        targets.cameraTarget,
        star
      );
    }
  });
}