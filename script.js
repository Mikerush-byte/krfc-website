// ===== NAVIGATION TOGGLE =====
function toggleMenu() {
  const navLinks = document.getElementById('nav-links');
  navLinks.classList.toggle('open');
}

// Close menu when clicking a link
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      const navMenu = document.getElementById('nav-links');
      navMenu.classList.remove('open');
    });
  });

  // Handle dropdown menus on mobile
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      if (window.innerWidth <= 600) {
        e.preventDefault();
        const dropdownMenu = this.nextElementSibling;
        dropdownMenu.classList.toggle('open');
      }
    });
  });
});

// ===== NEWSLETTER SUBSCRIPTION =====
function subscribeNewsletter() {
  const emailInput = document.querySelector('.newsletter-form input');
  const email = emailInput.value.trim();

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    showToast('Please enter your email address', 'error');
    return;
  }

  if (!emailRegex.test(email)) {
    showToast('Please enter a valid email address', 'error');
    return;
  }

  // Simulate subscription (in real scenario, send to server)
  showToast('Thank you for subscribing! Check your email for confirmation.', 'success');
  emailInput.value = '';
}

// ===== TOAST NOTIFICATION =====
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');

  // Remove previous classes
  toast.classList.remove('show');

  // Set message and styling
  toast.textContent = message;
  toast.style.backgroundColor = type === 'success'
    ? '#2d6a35'
    : '#c9392f';

  // Show toast
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  // Hide after 4 seconds
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// ===== SET ACTIVE NAV LINK =====
document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  // Get all nav links
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');

    // Check if this link matches current page
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

// ===== SMOOTH SCROLL =====
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});

// ===== LAZY LOADING FOR IMAGES =====
document.addEventListener('DOMContentLoaded', function() {
  // Add intersection observer for fade-in effects
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all cards and sections
  document.querySelectorAll(
    '.initiative-card, .program-card, .testimonial-card, .leadership-card, ' +
    '.trainer-card, .partner-item, .culture-card, .value-card-large, .org-unit'
  ).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// ===== FORM VALIDATION (for contact page) =====
function validateForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return false;

  const requiredFields = form.querySelectorAll('[required]');
  let isValid = true;

  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      field.style.borderColor = '#c9392f';
      isValid = false;
    } else {
      field.style.borderColor = '';
    }
  });

  // Email validation
  const emailField = form.querySelector('input[type="email"]');
  if (emailField && emailField.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailField.value)) {
      emailField.style.borderColor = '#c9392f';
      isValid = false;
    }
  }

  return isValid;
}

// ===== CONTACT FORM SUBMISSION =====
function submitContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  if (!validateForm('contactForm')) {
    showToast('Please fill in all required fields correctly', 'error');
    return;
  }

  // Get form data
  const formData = new FormData(form);

  // In a real application, send to server
  // For now, show success message
  showToast('Thank you for your message! We will get back to you soon.', 'success');

  // Reset form
  form.reset();
}

// ===== SCROLL TO TOP BUTTON =====
let scrollTopButton;

document.addEventListener('DOMContentLoaded', function() {
  // Create scroll to top button if it doesn't exist
  if (!document.getElementById('scrollTopBtn')) {
    scrollTopButton = document.createElement('button');
    scrollTopButton.id = 'scrollTopBtn';
    scrollTopButton.innerHTML = '↑';
    scrollTopButton.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      background: #2d6a35;
      color: white;
      border: none;
      border-radius: 50%;
      font-size: 1.5rem;
      cursor: pointer;
      display: none;
      z-index: 98;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;

    document.body.appendChild(scrollTopButton);

    // Show/hide button based on scroll
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        scrollTopButton.style.display = 'block';
      } else {
        scrollTopButton.style.display = 'none';
      }
    });

    // Scroll to top on click
    scrollTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Hover effects
    scrollTopButton.addEventListener('mouseover', function() {
      this.style.background = '#c9a84c';
      this.style.color = '#1a3a1f';
    });

    scrollTopButton.addEventListener('mouseout', function() {
      this.style.background = '#2d6a35';
      this.style.color = 'white';
    });
  }
});

// ===== UTILITY: PREVENT MULTIPLE SUBMISSIONS =====
function preventDoubleSubmit(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', function(e) {
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.style.opacity = '0.6';
      setTimeout(() => {
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
      }, 2000);
    }
  });
}

// ===== MODAL FUNCTIONALITY =====
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal')) {
    e.target.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// ===== RESPONSIVE NAVIGATION =====
window.addEventListener('resize', function() {
  if (window.innerWidth > 600) {
    const navLinks = document.getElementById('nav-links');
    if (navLinks) {
      navLinks.classList.remove('open');
    }
  }
});

// ===== PAGE LOAD ANIMATION =====
document.addEventListener('DOMContentLoaded', function() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';

  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// ===== UTILITY: FORMAT CURRENCY =====
function formatCurrency(amount, currency = 'KES') {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: currency
  }).format(amount);
}

// ===== UTILITY: FORMAT DATE =====
function formatDate(date) {
  return new Intl.DateTimeFormat('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
}

// ===== CONSOLE MESSAGE =====
console.log('%c Welcome to Kenya Rural Food Centre Website', 'color: #2d6a35; font-size: 16px; font-weight: bold;');
console.log('%c Transforming Rural Agriculture Through Education, Innovation, and Sustainable Development', 'color: #c9a84c; font-size: 12px;');
