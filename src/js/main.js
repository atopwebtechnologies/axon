import { projects } from '../data/projects.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initProjectsShowcase();
  initModal();
  initContactForm();
});

/* --------------------------------------------------------------------------
   Navigation & Mobile Menu
   -------------------------------------------------------------------------- */
function initNavigation() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active section scroll spy
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Projects Showcase & Filtering
   -------------------------------------------------------------------------- */
function initProjectsShowcase() {
  const gridContainer = document.getElementById('projectsGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  if (!gridContainer) return;

  function renderProjects(category = 'all') {
    gridContainer.innerHTML = '';

    const filtered = category === 'all' 
      ? projects 
      : projects.filter(p => p.category.toLowerCase() === category.toLowerCase());

    filtered.forEach(p => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.setAttribute('data-id', p.id);
      card.innerHTML = `
        <div class="project-image-wrapper">
          <img src="${p.image}" alt="${p.title}" class="project-image" loading="lazy" />
          <span class="project-category-badge">${p.category}</span>
        </div>
        <div class="project-content">
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.description}</p>
          <div class="project-tags">
            ${p.tags.map(t => `<span class="tag-pill">${t}</span>`).join('')}
          </div>
          <div class="project-footer">
            <span class="btn-link">View Project Specs &rarr;</span>
          </div>
        </div>
      `;

      card.addEventListener('click', () => openProjectModal(p.id));
      gridContainer.appendChild(card);
    });
  }

  // Initial render
  renderProjects('all');

  // Filter click handlers
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-filter');
      renderProjects(category);
    });
  });
}

/* --------------------------------------------------------------------------
   Interactive Project Modal Dialog
   -------------------------------------------------------------------------- */
function initModal() {
  const modalOverlay = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalCloseBtn');

  if (!modalOverlay || !closeBtn) return;

  closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

function openProjectModal(projectId) {
  const project = projects.find(p => p.id === projectId);
  const modalOverlay = document.getElementById('projectModal');
  const modalContent = document.getElementById('modalBody');

  if (!project || !modalOverlay || !modalContent) return;

  modalContent.innerHTML = `
    <span class="section-label">${project.category}</span>
    <h2 style="font-size: 2rem; margin-bottom: 16px;">${project.title}</h2>
    <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 280px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 24px;" />
    
    <div style="background-color: var(--bg-secondary); padding: 16px 20px; border-radius: var(--radius-sm); margin-bottom: 24px; font-weight: 600; font-size: 0.875rem; color: var(--accent-crimson);">
      ⚡ Key Metric: ${project.metrics}
    </div>

    <p style="font-size: 1.0625rem; line-height: 1.7; margin-bottom: 24px; color: var(--text-secondary);">
      ${project.longDescription}
    </p>

    <div style="margin-bottom: 28px;">
      <h4 style="font-size: 0.9375rem; margin-bottom: 12px;">Architecture & Technologies</h4>
      <div class="project-tags">
        ${project.tags.map(t => `<span class="tag-pill" style="background-color: var(--bg-secondary);">${t}</span>`).join('')}
      </div>
    </div>

    <div style="display: flex; gap: 16px;">
      <a href="${project.liveUrl}" class="btn btn-primary" target="_blank" rel="noopener">Live Demo</a>
      <a href="${project.githubUrl}" class="btn btn-secondary" target="_blank" rel="noopener">View Source</a>
    </div>
  `;

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modalOverlay = document.getElementById('projectModal');
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

/* --------------------------------------------------------------------------
   Contact Form Validation & Toast Notification
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('toastNotification');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Reset errors
    [nameInput, emailInput, messageInput].forEach(input => {
      if (input) {
        input.parentElement.classList.remove('error');
      }
    });

    // Validate Name
    if (!nameInput || nameInput.value.trim() === '') {
      setError(nameInput, 'Name is required');
      isValid = false;
    }

    // Validate Email
    if (!emailInput || !validateEmail(emailInput.value.trim())) {
      setError(emailInput, 'Please enter a valid email address');
      isValid = false;
    }

    // Validate Message
    if (!messageInput || messageInput.value.trim().length < 10) {
      setError(messageInput, 'Message must be at least 10 characters long');
      isValid = false;
    }

    if (isValid) {
      form.reset();
      showToast('Thank you! Your message has been sent successfully.');
    }
  });
}

function setError(input, message) {
  const parent = input.parentElement;
  parent.classList.add('error');
  const errorElement = parent.querySelector('.error-message');
  if (errorElement) {
    errorElement.textContent = message;
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const toastText = document.getElementById('toastText');
  
  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
