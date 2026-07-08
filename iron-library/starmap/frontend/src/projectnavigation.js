import * as THREE from "three";

export function getProjectMeshes(projectName, starMeshes) {
  return starMeshes.filter(
    (mesh) => mesh.userData.star.project === projectName
  );
}

export function getProjectCenter(projectName, starMeshes) {
  const projectStars = getProjectMeshes(projectName, starMeshes);

  if (!projectStars.length) return null;

  const center = new THREE.Vector3();

  projectStars.forEach((mesh) => {
    center.add(mesh.position);
  });

  center.divideScalar(projectStars.length);

  return center;
}

export function getProjectRadius(projectName, starMeshes) {
  const projectStars = getProjectMeshes(projectName, starMeshes);
  const center = getProjectCenter(projectName, starMeshes);

  if (!projectStars.length || !center) return 120;

  let radius = 0;

  projectStars.forEach((mesh) => {
    radius = Math.max(
      radius,
      mesh.position.distanceTo(center)
    );
  });

  return Math.max(radius, 80);
}

export function getProjectCameraPosition(projectName, starMeshes) {
  const center = getProjectCenter(projectName, starMeshes);
  const radius = getProjectRadius(projectName, starMeshes);

  if (!center) return null;

  return center.clone().add(
    new THREE.Vector3(
      0,
      radius * 0.35,
      radius * 3.2
    )
  );
}

export function focusProject(projectName, starMeshes, setFocus) {
  const center = getProjectCenter(projectName, starMeshes);
  const cameraPosition = getProjectCameraPosition(projectName, starMeshes);

  if (!center || !cameraPosition) return;

  setFocus(center, cameraPosition);
}

export function buildProjectAnchors(projects) {
  return projects.map((project) => ({
    name: project.name,
    count: project.count,
    center: project.center || [0, 0, 0],
    color: project.color || "#8ee6ff"
  }));
}