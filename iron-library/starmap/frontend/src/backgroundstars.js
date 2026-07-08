import * as THREE from "three";

export function createBackgroundStars(scene) {
  const starCount = 18000;
  const radius = 2600;

  const positions = new Float32Array(starCount * 3);
  const colors = new Float32Array(starCount * 3);

  const colorA = new THREE.Color("#8ee6ff");
  const colorB = new THREE.Color("#ffd27a");
  const colorC = new THREE.Color("#ffffff");

  for (let i = 0; i < starCount; i++) {
    const r = radius * Math.cbrt(Math.random());
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    const colorPick = Math.random();
    const color =
      colorPick < 0.72
        ? colorC
        : colorPick < 0.9
          ? colorA
          : colorB;

    const brightness = 0.35 + Math.random() * 0.65;

    colors[i * 3] = color.r * brightness;
    colors[i * 3 + 1] = color.g * brightness;
    colors[i * 3 + 2] = color.b * brightness;
  }

  const geometry = new THREE.BufferGeometry();

  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  geometry.setAttribute(
    "color",
    new THREE.BufferAttribute(colors, 3)
  );

  const material = new THREE.PointsMaterial({
    size: 2.1,
    vertexColors: true,
    transparent: true,
    opacity: 0.72,
    depthWrite: false
  });

  const stars = new THREE.Points(geometry, material);

  stars.name = "Background Starfield";

  scene.add(stars);

  return stars;
}