// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
  // Update footer year
  updateFooterYear();
  
  // Initialize filter tabs
  initializeFilters();
  
  // Initialize contact form
  initializeContactForm();
  
  // Initialize newsletter forms
  initializeNewsletterForms();
  
  // Animate elements on scroll
  initializeScrollAnimations();
  
  // Add parallax effect to shapes
  initializeParallax();
  
  // Mobile menu close on link click
  initializeMobileMenu();
  
  // Smooth scroll for anchor links
  initializeSmoothScroll();
});

// ==================== FOOTER YEAR ====================
function updateFooterYear() {
  const yearSpans = document.querySelectorAll('#year');
  const currentYear = new Date().getFullYear();
  yearSpans.forEach(span => {
    span.textContent = currentYear;
  });
}

// ==================== FILTER TABS ====================
function initializeFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  
  filterTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      // Update active tab
      filterTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      // Filter items
      filterItems(filter);
    });
  });
}

function filterItems(category) {
  // For courses page
  const courseCards = document.querySelectorAll('[data-category]');
  
  courseCards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    
    if (category === 'all' || cardCategory === category) {
      card.style.display = 'block';
      card.style.opacity = '0';
      setTimeout(() => {
        card.style.transition = 'opacity 0.5s ease';
        card.style.opacity = '1';
      }, 10);
    } else {
      card.style.transition = 'opacity 0.3s ease';
      card.style.opacity = '0';
      setTimeout(() => {
        card.style.display = 'none';
      }, 300);
    }
  });
  
  // For blog page
  const blogCards = document.querySelectorAll('.blog-card');
  
  blogCards.forEach(card => {
    const cardCategory = card.querySelector('.blog-category');
    if (!cardCategory) return;
    
    const categoryText = cardCategory.textContent.toLowerCase();
    
    if (category === 'all' || categoryText.includes(category)) {
      card.parentElement.style.display = 'block';
      card.parentElement.style.opacity = '0';
      setTimeout(() => {
        card.parentElement.style.transition = 'opacity 0.5s ease';
        card.parentElement.style.opacity = '1';
      }, 10);
    } else {
      card.parentElement.style.transition = 'opacity 0.3s ease';
      card.parentElement.style.opacity = '0';
      setTimeout(() => {
        card.parentElement.style.display = 'none';
      }, 300);
    }
  });
}

// ==================== CONTACT FORM ====================
function initializeContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (!contactForm) return;
  
  // Form submission
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    if (contactForm.checkValidity()) {
      // Show success alert
      const successAlert = document.getElementById('successAlert');
      if (successAlert) {
        successAlert.classList.remove('d-none');
        successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Add success animation
        successAlert.style.animation = 'slideInLeft 0.5s ease';
      }
      
      // Simulate form submission
      console.log('Form submitted with data:', {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        newsletter: document.getElementById('newsletter').checked
      });
      
      // Reset form after delay
      setTimeout(() => {
        contactForm.reset();
        contactForm.classList.remove('was-validated');
        
        // Hide success alert
        if (successAlert) {
          successAlert.classList.add('d-none');
        }
        
        // Remove validation classes
        contactForm.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
          el.classList.remove('is-valid', 'is-invalid');
        });
      }, 3000);
    } else {
      contactForm.classList.add('was-validated');
    }
  });
  
  // Real-time validation
  const inputs = contactForm.querySelectorAll('input:not([type="checkbox"]), textarea, select');
  
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateField(this);
    });
    
    input.addEventListener('input', function() {
      if (this.classList.contains('is-invalid')) {
        validateField(this);
      }
    });
  });
  
  // Reset button
  const resetButton = contactForm.querySelector('[type="reset"]');
  if (resetButton) {
    resetButton.addEventListener('click', function() {
      setTimeout(() => {
        contactForm.classList.remove('was-validated');
        contactForm.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
          el.classList.remove('is-valid', 'is-invalid');
        });
      }, 10);
    });
  }
}

function validateField(field) {
  if (field.checkValidity()) {
    field.classList.add('is-valid');
    field.classList.remove('is-invalid');
  } else {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
  }
}

// ==================== NEWSLETTER FORMS ====================
function initializeNewsletterForms() {
  const newsletterForms = document.querySelectorAll('.newsletter-form, .newsletter-form-inline');
  
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value;
      
      if (emailInput.checkValidity()) {
        // Success feedback
        const button = this.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        
        button.textContent = '✓ SUBSCRIBED!';
        button.style.background = 'var(--secondary)';
        button.style.color = 'var(--dark)';
        
        console.log('Newsletter subscription:', email);
        
        // Reset after delay
        setTimeout(() => {
          button.textContent = originalText;
          button.style.background = '';
          button.style.color = '';
          this.reset();
        }, 3000);
      } else {
        emailInput.classList.add('is-invalid');
        emailInput.style.animation = 'shake 0.5s ease';
        
        setTimeout(() => {
          emailInput.style.animation = '';
        }, 500);
      }
    });
  });
}

// ==================== SCROLL ANIMATIONS ====================
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
          entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 100);
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe cards
  const elements = document.querySelectorAll(`
    .feature-card:not([data-delay]),
    .testimonial-card,
    .course-card,
    .pricing-card,
    .blog-card,
    .team-card,
    .stat-box
  `);
  
  elements.forEach(el => observer.observe(el));
}

// ==================== PARALLAX EFFECT ====================
function initializeParallax() {
  const shapes = document.querySelectorAll('.shape');
  
  if (shapes.length === 0) return;
  
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        
        shapes.forEach((shape, index) => {
          const speed = (index + 1) * 0.5;
          const yPos = -(scrolled * speed);
          shape.style.transform = `translateY(${yPos}px) rotate(${45 + scrolled * 0.05}deg)`;
        });
        
        ticking = false;
      });
      
      ticking = true;
    }
  });
}

// ==================== MOBILE MENU ====================
function initializeMobileMenu() {
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: false
        });
        bsCollapse.hide();
      }
    });
  });
}

// ==================== SMOOTH SCROLL ====================
function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#' || href === '#!') return;
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        const offsetTop = target.offsetTop - 100;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ==================== LOAD MORE BUTTON ====================
const loadMoreBtn = document.querySelector('.btn-outline-large');

if (loadMoreBtn && loadMoreBtn.textContent.includes('LOAD MORE')) {
  loadMoreBtn.addEventListener('click', function() {
    // Simulate loading
    this.textContent = 'LOADING...';
    this.disabled = true;
    
    setTimeout(() => {
      this.textContent = 'NO MORE POSTS';
      this.style.opacity = '0.5';
      
      console.log('All posts loaded');
    }, 1500);
  });
}

// ==================== LIVE CHAT BUTTON ====================
const chatButtons = document.querySelectorAll('button');

chatButtons.forEach(button => {
  if (button.textContent.includes('START CHAT')) {
    button.addEventListener('click', function() {
      alert('Live chat feature would connect here!\n\nIn production, this would integrate with:\n- Intercom\n- Zendesk Chat\n- Drift\n- Crisp\n\nOr a custom WebSocket chat solution.');
    });
  }
});

// ==================== UTILITY FUNCTIONS ====================

// Add shake animation to invalid inputs
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }
`;
document.head.appendChild(style);

// Console welcome message
console.log('%c[CODEX LABS]', 'color: #FF006E; font-size: 24px; font-weight: bold;');
console.log('%cNeo-Brutalist Code Education', 'color: #00D9FF; font-size: 14px;');
console.log('%cBuilt different. 🚀', 'color: #FFD60A; font-size: 12px;');

// ==================== KEYBOARD NAVIGATION ====================
document.addEventListener('keydown', function(e) {
  // Press 'C' to go to contact page
  if (e.key === 'c' && !e.ctrlKey && !e.metaKey) {
    const activeElement = document.activeElement;
    if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
      window.location.href = 'contact.html';
    }
  }
  
  // Press 'H' to go to homepage
  if (e.key === 'h' && !e.ctrlKey && !e.metaKey) {
    const activeElement = document.activeElement;
    if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
      window.location.href = 'index.html';
    }
  }
});

// ==================== EASTER EGG ====================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);
  
  if (konamiCode.join(',') === konamiPattern.join(',')) {
    document.body.style.animation = 'rainbow 2s infinite';
    
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
      @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
      }
    `;
    document.head.appendChild(rainbowStyle);
    
    setTimeout(() => {
      document.body.style.animation = '';
    }, 10000);
    
    console.log('%c🎉 KONAMI CODE ACTIVATED! 🎉', 'color: #FF006E; font-size: 20px; font-weight: bold;');
  }
});

// ==================== PERFORMANCE MONITORING ====================
window.addEventListener('load', function() {
  if ('performance' in window) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    
    console.log(`%c⚡ Page loaded in ${pageLoadTime}ms`, 'color: #00D9FF; font-weight: bold;');
  }
});

// ==================== EXPORT FOR TESTING ====================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    updateFooterYear,
    filterItems,
    validateField
  };
}
