import * as THREE from "three";

export function normalizePositions(stars) {
  return stars.map((star) => {
    const p = star.position || [0, 0, 0];

    return {
      ...star,
      displayPosition: [
        p[0],
        p[1],
        p[2]
      ]
    };
  });
}

export function createStars(stars, starGroup) {
  const meshes = [];

  stars.forEach((star) => {
    const geometry = new THREE.SphereGeometry(
      1.2 + star.mass * 2.4,
      16,
      16
    );

    const material = new THREE.MeshBasicMaterial({
      color: star.color || "#ffffff",
      transparent: true,
      opacity: 0.95
    });

    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(
      star.displayPosition[0],
      star.displayPosition[1],
      star.displayPosition[2]
    );

    mesh.userData.star = star;

    starGroup.add(mesh);
    meshes.push(mesh);
  });

  return meshes;
}