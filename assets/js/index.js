(() => {
  // Change this if your paper pages live elsewhere.
  // Example: "" (same folder) or "papers/" etc.
  const PAPER_BASE_PATH = "past-papers/";

  // Change this range to match what you actually host.
  // Keeping it small is more student-friendly than showing years that 404.
  const FIRST_YEAR = 2018;
  const LAST_YEAR = new Date().getFullYear();

  const continueSection = document.getElementById("continue");
  const continueText = document.getElementById("continue-text");
  const continueLink = document.getElementById("continue-link");

  const form = document.getElementById("paper-form");
  const yearSelect = document.getElementById("paper-year");
  const levelSelect = document.getElementById("paper-level");

  function safeParseJSON(value) {
    try { return JSON.parse(value); } catch { return null; }
  }

  function formatRelativeTime(ms) {
    const diff = Date.now() - ms;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins} min ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} hour${hrs === 1 ? "" : "s"} ago`;
    const days = Math.floor(hrs / 24);
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }

  function populateYears() {
    // Newest first
    for (let y = LAST_YEAR; y >= FIRST_YEAR; y--) {
      const opt = document.createElement("option");
      opt.value = String(y);
      opt.textContent = String(y);
      yearSelect.appendChild(opt);
    }
  }

  function setupContinueCard() {
    const raw = localStorage.getItem("ioqm:lastPage");
    const data = safeParseJSON(raw);

    if (!data || !data.path) return;

    // Avoid showing "continue" to the homepage itself
    const path = String(data.path);
    const title = String(data.title || "Continue");
    const last = Number(data.lastVisited || 0);

    const isHome =
      path === "/" ||
      path.endsWith("/index.html") ||
      path === "index.html";

    if (isHome) return;

    continueLink.href = path;

    const when = last ? formatRelativeTime(last) : "recently";
    continueText.textContent = `${title} · last visited ${when}`;

    continueSection.hidden = false;
  }

  function setupQuickStart() {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const year = yearSelect.value;
      const level = levelSelect.value;

      if (!year || !level) return;

      // Expected naming pattern: past-papers/2025_easy.html
      const url = `${PAPER_BASE_PATH}${year}_${level}.html`;
      window.location.href = url;
    });
  }

  // Init
  populateYears();
  setupContinueCard();
  setupQuickStart();
})();
