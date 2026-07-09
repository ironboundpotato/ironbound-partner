import { flyToMeshes } from "./camera.js";
import { updatePanel, updateStats } from "./ui.js";
import { highlightSelection } from "./highlight.js";
import { animateTraversal } from "./traversalAnimation.js";

export function createRelatedNavigation(starMeshes, constellations, setFocus) {
  const meshById = new Map();

  starMeshes.forEach((mesh) => {
    const star = mesh.userData.star;

    if (star && star.id) {
      meshById.set(star.id, mesh);
    }
  });

  function getMemoryTitle(memoryId) {
    const mesh = meshById.get(memoryId);

    if (!mesh) return memoryId;

    return mesh.userData.star.title || memoryId;
  }

  function navigateToMemory(memoryId) {
    const mesh = meshById.get(memoryId);

    if (!mesh) return;

    const star = mesh.userData.star;

    animateTraversal(null, mesh);

    updatePanel(star);

    const targets = flyToMeshes([mesh]);

    if (targets) {
      setFocus(targets.focusTarget, targets.cameraTarget);
    }

    highlightSelection(
      star.id,
      starMeshes,
      constellations.lines
    );

    updateStats(`Traversed memory · ${star.project}`);
  }

  return {
    getMemoryTitle,
    navigateToMemory
  };
}