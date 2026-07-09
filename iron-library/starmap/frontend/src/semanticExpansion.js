const EXPANDED_SCALE = 2.15;
const DIMMED_SCALE = 0.55;
const SELECTED_SCALE = 2.45;
const DIMMED_OPACITY = 0.12;

let lastExpandedIds = new Set();

function setMeshVisual(mesh, opacity, scale) {
  mesh.material.transparent = opacity < 1;
  mesh.material.opacity = opacity;
  mesh.scale.setScalar(scale);
}

export function clearSemanticExpansion(starMeshes) {
  lastExpandedIds.clear();

  starMeshes.forEach((mesh) => {
    setMeshVisual(mesh, 1.0, 1.0);
  });
}

export function expandSemanticNeighborhood(selectedStar, starMeshes) {
  if (!selectedStar || !selectedStar.id) return;

  const relatedIds = new Set(
    Array.isArray(selectedStar.connections)
      ? selectedStar.connections
      : []
  );

  relatedIds.add(selectedStar.id);
  lastExpandedIds = relatedIds;

  starMeshes.forEach((mesh) => {
    const star = mesh.userData.star;

    if (!star || !star.id) return;

    if (star.id === selectedStar.id) {
      setMeshVisual(mesh, 1.0, SELECTED_SCALE);
      return;
    }

    if (relatedIds.has(star.id)) {
      setMeshVisual(mesh, 1.0, EXPANDED_SCALE);
      return;
    }

    setMeshVisual(mesh, DIMMED_OPACITY, DIMMED_SCALE);
  });
}