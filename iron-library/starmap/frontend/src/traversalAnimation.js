export function animateTraversal(fromMesh, toMesh) {
  if (!toMesh) return;

  const originalScale = toMesh.scale.x;

  const start = performance.now();
  const duration = 600;

  function pulse(time) {
    const t = (time - start) / duration;

    if (t >= 1) {
      toMesh.scale.setScalar(originalScale);
      return;
    }

    const pulseAmount =
      1 + Math.sin(t * Math.PI) * 0.45;

    toMesh.scale.setScalar(originalScale * pulseAmount);

    requestAnimationFrame(pulse);
  }

  requestAnimationFrame(pulse);
}