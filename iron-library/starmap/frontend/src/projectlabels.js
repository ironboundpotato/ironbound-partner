import * as THREE from "three";

export function createProjectLabels(projects, scene) {
  const labelGroup = new THREE.Group();
  labelGroup.name = "Project Labels";

  projects.forEach((project) => {
    const center = project.center || [0, 0, 0];

    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 256;

    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "rgba(0, 0, 0, 0.35)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.strokeStyle = project.color || "#8ee6ff";
    context.lineWidth = 4;
    context.strokeRect(12, 12, canvas.width - 24, canvas.height - 24);

    context.font = "bold 54px Arial";
    context.fillStyle = project.color || "#8ee6ff";
    context.textAlign = "center";
    context.fillText(project.name, 512, 104);

    context.font = "30px Arial";
    context.fillStyle = "#dddddd";
    context.fillText(`${project.count} memories`, 512, 158);

    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0.95,
      depthTest: false
    });

    const sprite = new THREE.Sprite(material);

    sprite.position.set(
      center[0],
      center[1] + 105,
      center[2]
    );

    sprite.scale.set(230, 58, 1);

    labelGroup.add(sprite);
  });

  scene.add(labelGroup);

  return labelGroup;
}