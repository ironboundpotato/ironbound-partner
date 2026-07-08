import * as THREE from "three";

export function createConstellations(starMeshes, scene) {
  const meshById = new Map();

  starMeshes.forEach((mesh) => {
    meshById.set(mesh.userData.star.id, mesh);
  });

  const constellationGroup = new THREE.Group();
  constellationGroup.name = "Semantic Constellations";

  const constellationLines = [];
  const drawnConnections = new Set();

  starMeshes.forEach((mesh) => {
    const star = mesh.userData.star;
    const connections = star.connections || [];

    connections.forEach((connectedId) => {
      const connectedMesh = meshById.get(connectedId);

      if (!connectedMesh) return;

      const connectedStar = connectedMesh.userData.star;

      if (connectedStar.project !== star.project) return;

      const connectionKey = [star.id, connectedId].sort().join("__");

      if (drawnConnections.has(connectionKey)) return;

      drawnConnections.add(connectionKey);

      const geometry = new THREE.BufferGeometry().setFromPoints([
        mesh.position,
        connectedMesh.position
      ]);

      const material = new THREE.LineBasicMaterial({
        color: 0x8ee6ff,
        transparent: true,
        opacity: 0.18
      });

      const line = new THREE.Line(geometry, material);

      line.userData.connection = {
        from: star.id,
        to: connectedId,
        key: connectionKey,
        project: star.project
      };

      constellationGroup.add(line);
      constellationLines.push(line);
    });
  });

  scene.add(constellationGroup);

  return {
    group: constellationGroup,
    lines: constellationLines
  };
}