import * as THREE from "three";

function createCloudTexture(color) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;

  const context = canvas.getContext("2d");

  const gradient = context.createRadialGradient(
    128,
    128,
    0,
    128,
    128,
    128
  );

  gradient.addColorStop(0.0, color);
  gradient.addColorStop(0.22, color);
  gradient.addColorStop(0.55, "rgba(255,255,255,0.08)");
  gradient.addColorStop(1.0, "rgba(255,255,255,0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, 256, 256);

  return new THREE.CanvasTexture(canvas);
}

export function createGalaxyClouds(projects, scene) {
  const cloudGroup = new THREE.Group();
  cloudGroup.name = "Galaxy Clouds";

  projects.forEach((project, index) => {
    const center = project.center || [0, 0, 0];

    const baseColor = new THREE.Color(project.color || "#8ee6ff");

    const rgba = `rgba(
      ${Math.floor(baseColor.r * 255)},
      ${Math.floor(baseColor.g * 255)},
      ${Math.floor(baseColor.b * 255)},
      0.55
    )`;

    const texture = createCloudTexture(rgba);

    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const cloud = new THREE.Sprite(material);

    cloud.position.set(
      center[0],
      center[1],
      center[2] - 12
    );

    const size = 210 + (project.count || 0) * 1.35;

    cloud.scale.set(
      size,
      size * 0.72,
      1
    );

    cloud.rotation.z = index * 0.37;

    cloudGroup.add(cloud);
  });

  scene.add(cloudGroup);

  return cloudGroup;
}