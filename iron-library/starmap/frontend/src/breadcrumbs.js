const MAX_BREADCRUMBS = 6;

let trail = [];
let currentIndex = 0;
let navigateHandler = null;
let suppressNextAdd = false;

function trimTitle(title) {
  const text = String(title || "Untitled Memory").trim();

  if (text.length <= 34) return text;

  return text.slice(0, 31).trim() + "...";
}

function ensureBreadcrumbContainer() {
  let container = document.getElementById("breadcrumbTrail");

  if (container) return container;

  container = document.createElement("div");
  container.id = "breadcrumbTrail";

  document.body.appendChild(container);

  const style = document.createElement("style");

  style.innerHTML = `
    #breadcrumbTrail{
      position:fixed;
      top:84px;
      left:235px;
      max-width:650px;
      display:flex;
      align-items:center;
      flex-wrap:wrap;
      gap:5px;
      z-index:12;
      pointer-events:auto;
      text-shadow:0 0 14px rgba(0,0,0,.85);
    }

    .breadcrumbControl,
    .breadcrumbButton{
      background:rgba(7,12,24,.58);
      color:#d7e6f8;
      border:1px solid rgba(255,255,255,.10);
      border-radius:5px;
      padding:4px 7px;
      font-size:10px;
      cursor:pointer;
      backdrop-filter:blur(7px);
    }

    .breadcrumbButton{
      max-width:155px;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }

    .breadcrumbControl:hover,
    .breadcrumbButton:hover{
      background:rgba(142,230,255,.14);
      border-color:rgba(142,230,255,.35);
      color:#ffffff;
    }

    .breadcrumbControl:disabled{
      opacity:.35;
      cursor:default;
    }

    .breadcrumbSeparator{
      color:#7fa9c8;
      font-size:11px;
    }

    .breadcrumbButton.active{
      border-color:rgba(255,210,122,.55);
      color:#ffd27a;
    }
  `;

  document.head.appendChild(style);

  return container;
}

function goToIndex(index) {
  if (index < 0 || index >= trail.length) return;

  const item = trail[index];

  currentIndex = index;
  renderBreadcrumbs();

  if (item.id && navigateHandler) {
    suppressNextAdd = true;
    navigateHandler(item.id);
  }
}

function renderBreadcrumbs() {
  const container = ensureBreadcrumbContainer();

  container.innerHTML = "";

  const backButton = document.createElement("button");
  backButton.className = "breadcrumbControl";
  backButton.textContent = "←";
  backButton.disabled = currentIndex <= 0;
  backButton.addEventListener("click", () => {
    goToIndex(currentIndex - 1);
  });

  const forwardButton = document.createElement("button");
  forwardButton.className = "breadcrumbControl";
  forwardButton.textContent = "→";
  forwardButton.disabled = currentIndex >= trail.length - 1;
  forwardButton.addEventListener("click", () => {
    goToIndex(currentIndex + 1);
  });

  container.appendChild(backButton);
  container.appendChild(forwardButton);

  trail.forEach((item, index) => {
    const button = document.createElement("button");

    button.className = "breadcrumbButton";
    if (index === currentIndex) {
      button.classList.add("active");
    }

    button.textContent = index === 0 ? "Home" : trimTitle(item.title);
    button.title = item.title || "Home";

    button.addEventListener("click", () => {
      goToIndex(index);
    });

    container.appendChild(button);

    if (index < trail.length - 1) {
      const separator = document.createElement("span");
      separator.className = "breadcrumbSeparator";
      separator.textContent = "›";
      container.appendChild(separator);
    }
  });
}

export function initializeBreadcrumbs(onNavigate) {
  navigateHandler = onNavigate;
  suppressNextAdd = false;

  trail = [
    {
      id: null,
      title: "Home"
    }
  ];

  currentIndex = 0;

  renderBreadcrumbs();
}

export function addBreadcrumb(star) {
  if (!star || !star.id) return;

  if (suppressNextAdd) {
    suppressNextAdd = false;
    renderBreadcrumbs();
    return;
  }

  const current = trail[currentIndex];

  if (current && current.id === star.id) {
    renderBreadcrumbs();
    return;
  }

  trail = trail.slice(0, currentIndex + 1);

  trail.push({
    id: star.id,
    title: star.title || star.project || "Memory"
  });

  if (trail.length > MAX_BREADCRUMBS) {
    trail = [
      trail[0],
      ...trail.slice(trail.length - (MAX_BREADCRUMBS - 1))
    ];
  }

  currentIndex = trail.length - 1;

  renderBreadcrumbs();
}

export function resetBreadcrumbs() {
  suppressNextAdd = false;

  trail = [
    {
      id: null,
      title: "Home"
    }
  ];

  currentIndex = 0;

  renderBreadcrumbs();
}