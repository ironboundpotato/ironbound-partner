export function buildProjectList(stars) {
  const counts = new Map();

  stars.forEach((star) => {
    const project = star.project || "Unknown";

    counts.set(
      project,
      (counts.get(project) || 0) + 1
    );
  });

  return [...counts.entries()]
    .map(([name, count]) => ({
      name,
      count
    }))
    .sort((a, b) => b.count - a.count);
}