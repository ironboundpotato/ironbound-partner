export function createUI() {
  document.body.innerHTML = "";

  const ui = document.createElement("div");

  ui.innerHTML = `
    <div id="appShell">
      <aside id="leftRail">
        <div id="brandBlock">
          <div id="brandIcon">✦</div>
          <div>
            <div id="brandTitle">IRON LIBRARY</div>
            <div id="brandSubtitle">KNOWLEDGE UNIVERSE</div>
          </div>
        </div>

        <div class="railSectionTitle">PROJECTS</div>

        <div id="projectPanel">
          <div id="projectList">
            <div class="projectEmpty">Loading project regions...</div>
          </div>
        </div>
      </aside>

      <header id="topbar">
        <input id="search" placeholder="Search anything..." />
        <div id="stats">Loading stars...</div>
      </header>

      <div id="centerTitle">
        <div id="viewLabel">IRON LIBRARY OBSERVATORY</div>
        <div id="viewMeta">Semantic Observatory</div>
      </div>

      <aside id="rightPanel">
        <div id="panelMode">OBSERVATORY</div>
        <div id="panelTitle">No star selected</div>
        <div id="panelProject"></div>
        <div id="panelSummary">
          Click a star to inspect a memory.
        </div>
        <div id="relatedSection"></div>
      </aside>
    </div>
  `;

  document.body.appendChild(ui);
}

export function injectStyles() {
  const style = document.createElement("style");

  style.innerHTML = `
    *{
      box-sizing:border-box;
    }

    body{
      margin:0;
      overflow:hidden;
      background:#03060d;
      font-family:Arial, Helvetica, sans-serif;
      color:#f5f7fb;
    }

    canvas{
      display:block;
    }

    #appShell{
      position:fixed;
      inset:0;
      pointer-events:none;
      z-index:10;
    }

    #leftRail,
    #topbar,
    #rightPanel,
    #centerTitle{
      pointer-events:auto;
    }

    #leftRail{
      position:fixed;
      top:10px;
      left:10px;
      bottom:10px;
      width:205px;
      padding:10px;
      background:rgba(5,9,18,.66);
      border:1px solid rgba(255,198,87,.18);
      border-radius:9px;
      box-shadow:0 0 20px rgba(0,0,0,.42);
      overflow:hidden;
      backdrop-filter:blur(7px);
    }

    #brandBlock{
      display:flex;
      align-items:center;
      gap:9px;
      padding-bottom:10px;
      border-bottom:1px solid rgba(255,255,255,.07);
      margin-bottom:10px;
    }

    #brandIcon{
      width:30px;
      height:30px;
      border:1px solid rgba(255,198,87,.50);
      border-radius:50%;
      display:flex;
      align-items:center;
      justify-content:center;
      color:#ffc657;
      font-size:17px;
      box-shadow:0 0 14px rgba(255,198,87,.20);
      flex:0 0 auto;
    }

    #brandTitle{
      letter-spacing:2.5px;
      font-size:13px;
      font-weight:800;
      color:#ffd27a;
      white-space:nowrap;
    }

    #brandSubtitle{
      letter-spacing:1.3px;
      font-size:8px;
      color:#9fb3c8;
      margin-top:2px;
      white-space:nowrap;
    }

    .railSectionTitle{
      margin:10px 0 7px;
      color:#8ee6ff;
      font-size:9px;
      letter-spacing:2px;
      font-weight:bold;
    }

    #projectPanel{
      height:calc(100vh - 104px);
      overflow:auto;
      padding-right:3px;
    }

    .projectButton{
      width:100%;
      text-align:left;
      margin-bottom:6px;
      padding:7px;
      background:rgba(255,255,255,.032);
      color:white;
      border:1px solid rgba(255,255,255,.085);
      cursor:pointer;
      border-radius:6px;
    }

    .projectButton:hover{
      background:rgba(142,230,255,.115);
      border-color:rgba(142,230,255,.42);
    }

    .projectName{
      font-weight:bold;
      font-size:11px;
      margin-bottom:2px;
      line-height:1.2;
    }

    .projectCount{
      font-size:9px;
      color:#aeb8c5;
    }

    .projectEmpty{
      color:#aaa;
      font-size:11px;
    }

    #topbar{
      position:fixed;
      top:10px;
      left:225px;
      right:275px;
      height:40px;
      display:flex;
      gap:8px;
      align-items:center;
    }

    #search{
      flex:1;
      height:34px;
      padding:0 12px;
      background:rgba(7,12,24,.58);
      color:white;
      border:1px solid rgba(255,255,255,.12);
      border-radius:8px;
      outline:none;
      box-shadow:0 0 14px rgba(0,0,0,.22);
      backdrop-filter:blur(7px);
      font-size:12px;
    }

    #stats{
      min-width:235px;
      height:34px;
      display:flex;
      align-items:center;
      padding:0 12px;
      background:rgba(7,12,24,.58);
      border:1px solid rgba(255,255,255,.12);
      border-radius:8px;
      color:#f5f7fb;
      font-weight:bold;
      letter-spacing:.8px;
      white-space:nowrap;
      box-shadow:0 0 14px rgba(0,0,0,.22);
      backdrop-filter:blur(7px);
      font-size:12px;
    }

    #centerTitle{
      position:fixed;
      top:58px;
      left:235px;
      color:white;
      text-shadow:0 0 16px rgba(0,0,0,.8);
    }

    #viewLabel{
      color:#ffd27a;
      font-size:14px;
      font-weight:bold;
      letter-spacing:1.8px;
    }

    #viewMeta{
      margin-top:3px;
      color:#9fb3c8;
      font-size:10px;
    }

    #rightPanel{
      position:fixed;
      top:10px;
      right:10px;
      width:255px;
      max-height:420px;
      padding:12px;
      background:rgba(5,9,18,.66);
      border:1px solid rgba(142,230,255,.18);
      border-radius:9px;
      box-shadow:0 0 20px rgba(0,0,0,.42);
      overflow:auto;
      backdrop-filter:blur(7px);
    }

    #panelMode{
      font-size:9px;
      letter-spacing:2px;
      color:#8ee6ff;
      margin-bottom:9px;
      font-weight:bold;
    }

    #panelTitle{
      font-size:15px;
      font-weight:bold;
      line-height:1.25;
      margin-bottom:7px;
    }

    #panelProject{
      color:#8ee6ff;
      margin-bottom:9px;
      font-size:11px;
    }

    #panelSummary{
      line-height:1.36;
      color:#d8e0ea;
      font-size:12px;
    }

    #relatedSection{
      margin-top:12px;
      padding-top:10px;
      border-top:1px solid rgba(255,255,255,.10);
    }

    .relatedTitle{
      color:#ffd27a;
      font-size:9px;
      letter-spacing:2px;
      font-weight:bold;
      margin-bottom:7px;
    }

    .relatedItem{
      color:#cdd6e3;
      font-size:11px;
      line-height:1.25;
      padding:6px 0;
      border-bottom:1px solid rgba(255,255,255,.055);
    }

    .relatedEmpty{
      color:#7f8b9a;
      font-size:11px;
      line-height:1.3;
    }
  `;

  document.head.appendChild(style);
}

function readableConnectionId(id) {
  return String(id || "")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 54);
}

function renderRelatedMemories(star) {
  const section = document.getElementById("relatedSection");

  const connections = Array.isArray(star.connections)
    ? star.connections.slice(0, 5)
    : [];

  if (!connections.length) {
    section.innerHTML = `
      <div class="relatedTitle">RELATED MEMORIES</div>
      <div class="relatedEmpty">No related memories indexed yet.</div>
    `;
    return;
  }

  section.innerHTML = `
    <div class="relatedTitle">RELATED MEMORIES</div>
    ${connections
      .map(
        (connection) => `
          <div class="relatedItem">• ${readableConnectionId(connection)}</div>
        `
      )
      .join("")}
  `;
}

export function updatePanel(star) {
  document.getElementById("panelMode").textContent = "SELECTED MEMORY";

  document.getElementById("panelTitle").textContent =
    star.title || "Untitled Star";

  document.getElementById("panelProject").textContent =
    star.project || "Unknown Project";

  document.getElementById("panelSummary").textContent =
    star.summary || "No summary available.";

  renderRelatedMemories(star);
}

export function updateProjectPanel(projectName, count) {
  document.getElementById("panelMode").textContent = "PROJECT GALAXY";

  document.getElementById("panelTitle").textContent =
    projectName || "Unknown Project";

  document.getElementById("panelProject").textContent =
    `${count} memories`;

  document.getElementById("panelSummary").textContent =
    "Project galaxy focused. Click a star to inspect an individual memory.";

  document.getElementById("relatedSection").innerHTML = `
    <div class="relatedTitle">DISCOVERY</div>
    <div class="relatedEmpty">Select a star inside this galaxy to reveal nearby memories.</div>
  `;
}

export function updateStats(text) {
  document.getElementById("stats").textContent = text;
}

export function renderProjectList(projects, onSelectProject) {
  const projectList = document.getElementById("projectList");

  projectList.innerHTML = "";

  projects.forEach((project) => {
    const button = document.createElement("button");

    button.className = "projectButton";

    button.innerHTML = `
      <div class="projectName">${project.name}</div>
      <div class="projectCount">${project.count} memories</div>
    `;

    button.addEventListener("click", () => {
      onSelectProject(project.name, project.count);
    });

    projectList.appendChild(button);
  });
}