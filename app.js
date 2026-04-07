/* ======================================================
   CONFIGURACIÓN EDITABLE
   CAMBIAR AQUÍ USUARIO Y CONTRASEÑA
====================================================== */
const VALID_USERNAME = "tasatop";
const VALID_PASSWORD = "Operaciones2026";

/* ======================================================
   SESSION KEY
====================================================== */
const SESSION_KEY = "tasatop_ticketera_access";

/* ======================================================
   TÍTULOS DE VISTA
====================================================== */
const PAGE_TITLES = {
  inicio: "Uso interno",
  proposito: "Información del sistema",
  tutorial: "Guía rápida",
  ayuda: "Soporte"
};

/* ======================================================
   INICIALIZACIÓN
====================================================== */
document.addEventListener("DOMContentLoaded", () => {
  setupLogin();
  setupPasswordToggle();
  restoreSession();
  setupLogout();
  setupSidebarMenu();
  setupNavigation();
  setupTicketCards();
});

/* ======================================================
   LOGIN
====================================================== */
function setupLogin() {
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const errorBox = document.getElementById("loginError");

  if (!loginForm) return;

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
      errorBox.textContent = "Por favor, completa usuario y contraseña.";
      return;
    }

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "true");
      showApp();
      goToPage("inicio");
    } else {
      errorBox.textContent = "Credenciales incorrectas. Verifica tu usuario y contraseña.";
    }
  });
}

/* ======================================================
   RESTAURAR SESIÓN
====================================================== */
function restoreSession() {
  const hasAccess = sessionStorage.getItem(SESSION_KEY) === "true";

  if (hasAccess) {
    showApp();
    goToPage("inicio");
  } else {
    showLogin();
  }
}

function showApp() {
  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("appLayout").classList.remove("hidden");
}

function showLogin() {
  document.getElementById("loginScreen").classList.remove("hidden");
  document.getElementById("appLayout").classList.add("hidden");
}

/* ======================================================
   VER / OCULTAR CONTRASEÑA
====================================================== */
function setupPasswordToggle() {
  const toggleBtn = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");

  if (!toggleBtn || !passwordInput) return;

  toggleBtn.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
    toggleBtn.textContent = isHidden ? "Ocultar" : "Ver";
  });
}

/* ======================================================
   CERRAR SESIÓN
====================================================== */
function setupLogout() {
  const logoutBtn = document.getElementById("logoutBtn");
  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem(SESSION_KEY);
    showLogin();
    clearLoginForm();
    closeSidebar();
  });
}

function clearLoginForm() {
  const loginForm = document.getElementById("loginForm");
  const loginError = document.getElementById("loginError");
  const passwordInput = document.getElementById("password");
  const toggleBtn = document.getElementById("togglePassword");

  if (loginForm) loginForm.reset();
  if (loginError) loginError.textContent = "";
  if (passwordInput) passwordInput.type = "password";
  if (toggleBtn) toggleBtn.textContent = "Ver";
}

/* ======================================================
   MENÚ LATERAL
====================================================== */
function setupSidebarMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const overlay = document.getElementById("sidebarOverlay");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const sidebar = document.getElementById("sidebar");
      sidebar.classList.toggle("open");
      overlay.classList.toggle("show");
    });
  }

  if (overlay) {
    overlay.addEventListener("click", closeSidebar);
  }
}

function closeSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");

  if (sidebar) sidebar.classList.remove("open");
  if (overlay) overlay.classList.remove("show");
}

/* ======================================================
   NAVEGACIÓN ENTRE VISTAS
====================================================== */
function setupNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((button) => {
    button.addEventListener("click", () => {
      const targetPage = button.dataset.page;
      goToPage(targetPage);
      closeSidebar();
    });
  });
}

function goToPage(pageName) {
  const views = document.querySelectorAll(".page-view");
  const navLinks = document.querySelectorAll(".nav-link");
  const badge = document.getElementById("topbarBadge");

  views.forEach((view) => {
    view.classList.remove("active");
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  const currentView = document.getElementById(`page-${pageName}`);
  const currentLink = document.querySelector(`.nav-link[data-page="${pageName}"]`);

  if (currentView) currentView.classList.add("active");
  if (currentLink) currentLink.classList.add("active");
  if (badge) badge.textContent = PAGE_TITLES[pageName] || "Uso interno";
}

/* ======================================================
   TARJETAS DE FORMULARIOS
====================================================== */
function setupTicketCards() {
  const cards = document.querySelectorAll(".ticket-card");
  if (!cards.length) return;

  cards.forEach((card) => {
    card.addEventListener("click", () => openCardLink(card));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openCardLink(card);
      }
    });
  });
}

function openCardLink(card) {
  const link = card.dataset.link;
  if (link) {
    window.open(link, "_blank", "noopener,noreferrer");
  }
}