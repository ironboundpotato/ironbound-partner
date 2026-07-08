import { flyToMeshes } from "./camera.js";
import { updateStats } from "./ui.js";

export function setupSearch(starMeshes, onFocus) {
  const search = document.getElementById("search");

  search.addEventListener("input", (event) => {
    const q = event.target.value.toLowerCase().trim();
    const matches = [];

    starMeshes.forEach((mesh) => {
      const star = mesh.userData.star;

      const haystack = `${star.title} ${star.summary} ${star.project}`
        .toLowerCase();

      const match = !q || haystack.includes(q);

      mesh.material.opacity = match ? 1.0 : 0.08;
      mesh.material.transparent = !match;
      mesh.scale.setScalar(match ? 1.65 : 0.65);

      if (q && match) {
        matches.push(mesh);
      }
    });

    if (q && matches.length) {
      const targets = flyToMeshes(matches);

      if (targets) {
        onFocus(targets.focusTarget, targets.cameraTarget);
      }

      updateStats(`${matches.length} illuminated · gravity focus`);
      return;
    }

    updateStats(`${starMeshes.length} truthful stars · semantic constellations`);
  });
}