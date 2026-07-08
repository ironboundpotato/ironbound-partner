import "./style.css";
import * as THREE from "three";

import {
  createScene,
  createRenderer,
  handleResize
} from "./scene.js";
import {
  createCamera,
  createControls,
  flyToMeshes
} from "./camera.js";
import {
  createUI,
  injectStyles,
  updateStats,
  renderProjectList,
  updateProjectPanel,
  updatePanel
} from "./ui.js";
import { loadStars } from "./loader.js";
import { createStars } from "./stars.js";
import { setupSearch } from "./search.js";
import { setupSelection } from "./selection.js";
import { startAnimation } from "./animation.js";
import { createConstellations } from "./constellations.js";
import { highlightSelection, highlightProject } from "./highlight.js";
import { focusProject } from "./projectNavigation.js";
import { createProjectLabels } from "./projectLabels.js";
import { createBackgroundStars } from "./backgroundStars.js";
import { createGalaxyClouds } from "./galaxyClouds.js";

createUI();
injectStyles();

const { scene, starGroup } = createScene();
const camera = createCamera();
const renderer = createRenderer();
const controls = createControls(camera, renderer);

createBackgroundStars(scene);

let focusTarget = null;
let cameraTarget = null;

function setFocus(nextFocusTarget, nextCameraTarget) {
  focusTarget = nextFocusTarget;
  cameraTarget = nextCameraTarget;
}

function getFocus() {
  return {
    focusTarget,
    cameraTarget
  };
}

function buildProjectList(stars) {
  const projects = new Map();

  stars.forEach((star) => {
    const projectName = star.project || "Unknown Project";

    if (!projects.has(projectName)) {
      projects.set(projectName, {
        name: projectName,
        count: 0,
        center: star.galaxy_center || [0, 0, 0],
        color: star.color || "#8ee6ff"
      });
    }

    projects.get(projectName).count += 1;
  });

  return Array.from(projects.values()).sort((a, b) => b.count - a.count);
}

function setupHomeReset(starMeshes) {
  window.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() !== "h") return;

    const search = document.getElementById("search");

    if (search) {
      search.value = "";
    }

    starMeshes.forEach((mesh) => {
      mesh.material.opacity = 1.0;
      mesh.material.transparent = false;
      mesh.scale.setScalar(1);
    });

    setFocus(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 1600)
    );

    updateStats(`${starMeshes.length} truthful stars · home view`);
  });
}

function setupMemoryNavigationBridge(starMeshes, constellations) {
  const meshById = new Map();

  starMeshes.forEach((mesh) => {
    meshById.set(mesh.userData.star.id, mesh);
  });

  window.starmapNavigateToMemory = (memoryId) => {
    const mesh = meshById.get(memoryId);

    if (!mesh) return;

    const star = mesh.userData.star;

    updatePanel(star);

    const targets = flyToMeshes([mesh]);

    if (targets) {
      setFocus(targets.focusTarget, targets.cameraTarget);
    }

    highlightSelection(
      star.id,
      starMeshes,
      constellations.lines
    );

    updateStats(`Focused memory · ${star.project}`);
  };

  window.starmapGetMemoryTitle = (memoryId) => {
    const mesh = meshById.get(memoryId);

    if (!mesh) return memoryId;

    return mesh.userData.star.title || memoryId;
  };
}

async function startObservatory() {
  const stars = await loadStars();
  const starMeshes = createStars(stars, starGroup);
  const constellations = createConstellations(starMeshes, scene);

  setupMemoryNavigationBridge(starMeshes, constellations);

  const projects = buildProjectList(stars);

  createGalaxyClouds(projects, scene);
  createProjectLabels(projects, scene);

  renderProjectList(projects, (projectName, count) => {
    const projectMeshes = starMeshes.filter(
      (mesh) => mesh.userData.star.project === projectName
    );

    focusProject(projectName, starMeshes, setFocus);

    highlightProject(projectName, starMeshes, constellations.lines);

    updateProjectPanel(projectName, count);

    updateStats(`${projectMeshes.length} memories · ${projectName}`);
  });

  updateStats(`${starMeshes.length} truthful stars · semantic constellations`);

  setupSearch(starMeshes, setFocus);
  setupHomeReset(starMeshes);

  setupSelection(camera, starMeshes, (focus, cameraPosition, selectedStar) => {
    setFocus(focus, cameraPosition);

    if (selectedStar) {
      highlightSelection(
        selectedStar.id,
        starMeshes,
        constellations.lines
      );

      updateStats(`Focused memory · ${selectedStar.project}`);
    }
  });

  handleResize(camera, renderer);

  startAnimation({
    renderer,
    scene,
    camera,
    controls,
    starGroup,
    getFocus
  });
}

startObservatory();