export function highlightSelection(
  selectedId,
  starMeshes,
  constellationLines
) {
  const connected = new Set();

  starMeshes.forEach((mesh) => {
    if (mesh.userData.star.id === selectedId) {
      connected.add(selectedId);

      (mesh.userData.star.connections || []).forEach((id) => {
        connected.add(id);
      });
    }
  });

  starMeshes.forEach((mesh) => {
    const star = mesh.userData.star;

    if (connected.has(star.id)) {
      mesh.material.opacity = 1.0;
      mesh.material.transparent = false;

      mesh.scale.setScalar(
        star.id === selectedId ? 2.0 : 1.4
      );
    } else {
      mesh.material.opacity = 0.12;
      mesh.material.transparent = true;
      mesh.scale.setScalar(1);
    }
  });

  constellationLines.forEach((line) => {
    const { from, to } = line.userData.connection;

    if (connected.has(from) && connected.has(to)) {
      line.material.opacity = 0.95;
    } else {
      line.material.opacity = 0.04;
    }
  });
}

export function highlightProject(
  projectName,
  starMeshes,
  constellationLines
) {
  starMeshes.forEach((mesh) => {
    const star = mesh.userData.star;
    const isProjectMatch = star.project === projectName;

    if (isProjectMatch) {
      mesh.material.opacity = 1.0;
      mesh.material.transparent = false;
      mesh.scale.setScalar(1.35);
    } else {
      mesh.material.opacity = 0.08;
      mesh.material.transparent = true;
      mesh.scale.setScalar(0.8);
    }
  });

  constellationLines.forEach((line) => {
    const { from, to } = line.userData.connection;

    const fromMesh = starMeshes.find(
      (mesh) => mesh.userData.star.id === from
    );

    const toMesh = starMeshes.find(
      (mesh) => mesh.userData.star.id === to
    );

    const fromMatches =
      fromMesh && fromMesh.userData.star.project === projectName;

    const toMatches =
      toMesh && toMesh.userData.star.project === projectName;

    if (fromMatches && toMatches) {
      line.material.opacity = 0.75;
    } else {
      line.material.opacity = 0.03;
    }
  });
}

export function clearHighlight(
  starMeshes,
  constellationLines
) {
  starMeshes.forEach((mesh) => {
    mesh.material.opacity = 1;
    mesh.material.transparent = false;
    mesh.scale.setScalar(1);
  });

  constellationLines.forEach((line) => {
    line.material.opacity = 0.18;
  });
}