export function startAnimation({
  renderer,
  scene,
  camera,
  controls,
  starGroup,
  getFocus
}) {
  function animate() {
    requestAnimationFrame(animate);

    starGroup.rotation.y += 0.00008;

    const { focusTarget, cameraTarget } = getFocus();

    if (focusTarget && cameraTarget) {
      controls.target.lerp(focusTarget, 0.035);
      camera.position.lerp(cameraTarget, 0.035);
    }

    controls.update();
    renderer.render(scene, camera);
  }

  animate();
}