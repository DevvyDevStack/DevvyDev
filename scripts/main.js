/*===== DEVVY DEV - MAIN JAVASCRIPT =====*/

/**
 * The Devvy Dev Landing Page JavaScript
 * Modern, clean code with ES6+ features
 * Implements smooth animations, mobile navigation, and form handling
 */

class DevvyDevSite {
  constructor() {
    this.init();
  }

  /**
   * Initialize all site functionality
   */
  init() {
    this.setupEventListeners();
    this.setupNavigation();
    this.setupScrollAnimations();
    this.setupContactForm();
    this.setupThemeHandling();
    this.setupPerformanceOptimizations();
  }

  /**
   * Set up all event listeners
   */
  setupEventListeners() {
    // DOM Content Loaded
    document.addEventListener('DOMContentLoaded', () => {
      this.onDOMContentLoaded();
    });

    // Window events
    window.addEventListener('scroll', this.throttle(this.onScroll.bind(this), 16));
    window.addEventListener('resize', this.debounce(this.onResize.bind(this), 250));
    window.addEventListener('load', this.onWindowLoad.bind(this));

    // Keyboard navigation
    document.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  /**
   * Handle DOM content loaded
   */
  onDOMContentLoaded() {
    this.addLoadingClass();
    this.preloadCriticalAssets();
    
    // Remove loading class after a short delay
    setTimeout(() => {
      document.body.classList.add('loaded');
    }, 100);
  }

  /**
   * Add loading class for smooth transitions
   */
  addLoadingClass() {
    const animatedElements = document.querySelectorAll(
      '.hero__text, .hero__code, .service-card, .project-card, .about__content'
    );
    
    animatedElements.forEach(element => {
      element.classList.add('loading');
    });
  }

  /**
   * Preload critical assets
   */
  preloadCriticalAssets() {
    // Preload fonts
    const fontLinks = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap'
    ];

    fontLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      document.head.appendChild(link);
    });
  }

  /**
   * Set up mobile navigation
   */
  setupNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');

    // Toggle mobile menu
    if (navToggle) {
      navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
        this.updateAriaExpanded(navToggle, navMenu.classList.contains('show-menu'));
      });
    }

    // Close mobile menu
    if (navClose) {
      navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        this.updateAriaExpanded(navToggle, false);
      });
    }

    // Close menu when clicking on nav links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        this.updateAriaExpanded(navToggle, false);
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu && navMenu.classList.contains('show-menu')) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
          navMenu.classList.remove('show-menu');
          this.updateAriaExpanded(navToggle, false);
        }
      }
    });

    // Set up smooth scrolling for navigation links
    this.setupSmoothScrolling();
    
    // Set up active navigation highlighting
    this.setupActiveNavigation();
  }

  /**
   * Update aria-expanded attribute for accessibility
   */
  updateAriaExpanded(toggle, isExpanded) {
    if (toggle) {
      toggle.setAttribute('aria-expanded', isExpanded.toString());
    }
  }

  /**
   * Set up smooth scrolling for anchor links
   */
  setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const headerHeight = document.querySelector('.nav').offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /**
   * Set up active navigation highlighting
   */
  setupActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    if (sections.length === 0 || navLinks.length === 0) return;

    const observerOptions = {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentSection = entry.target.getAttribute('id');
          this.updateActiveNavLink(currentSection, navLinks);
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }

  /**
   * Update active navigation link
   */
  updateActiveNavLink(currentSection, navLinks) {
    navLinks.forEach(link => {
      link.classList.remove('nav__link--active');
      
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('nav__link--active');
      }
    });
  }

  /**
   * Set up scroll animations using Intersection Observer
   */
  setupScrollAnimations() {
    const animatedElements = document.querySelectorAll(
      '.hero__text, .hero__code, .section__header, .service-card, .project-card, .about__content, .contact__content'
    );

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('loaded');
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    }, observerOptions);

    animatedElements.forEach(element => {
      observer.observe(element);
    });

    // Stagger animations for cards
    this.setupStaggeredAnimations();
  }

  /**
   * Set up staggered animations for card grids
   */
  setupStaggeredAnimations() {
    const cardGroups = [
      document.querySelectorAll('.service-card'),
      document.querySelectorAll('.project-card'),
      document.querySelectorAll('.skill-item')
    ];

    cardGroups.forEach(cards => {
      if (cards.length === 0) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('loaded');
              }, index * 100); // 100ms delay between each card
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      // Observe the first card to trigger the stagger
      if (cards[0]) {
        observer.observe(cards[0]);
      }
    });
  }

  /**
   * Set up contact form handling
   */
  setupContactForm() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;

    form.addEventListener('submit', this.handleFormSubmit.bind(this));
    
    // Add real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });
  }

  /**
   * Handle form submission
   */
  async handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Validate all fields
    if (!this.validateForm(form)) {
      return;
    }

    // Show loading state
    this.setSubmitButtonState(submitButton, 'loading');

    try {
      // Check if we're on Netlify (has data-netlify attribute)
      if (form.hasAttribute('data-netlify')) {
        // Submit to Netlify Forms
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData).toString()
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        // Show success message
        this.showFormMessage('success', 'Thank you! Your message has been sent successfully.');
        form.reset();
        
      } else {
        // Fallback to simulation for local development
        await this.simulateFormSubmission(formData);
        this.showFormMessage('success', 'Thank you! Your message has been sent successfully.');
        form.reset();
      }
      
    } catch (error) {
      // Show error message
      this.showFormMessage('error', 'Sorry, there was an error sending your message. Please try again.');
      console.error('Form submission error:', error);
      
    } finally {
      // Reset button state
      this.setSubmitButtonState(submitButton, 'default');
    }
  }

  /**
   * Validate entire form
   */
  validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  /**
   * Validate individual field
   */
  validateField(input) {
    const value = input.value.trim();
    const type = input.type;
    let isValid = true;
    let errorMessage = '';

    // Check if required field is empty
    if (input.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'This field is required.';
    }
    // Validate email
    else if (type === 'email' && value && !this.isValidEmail(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address.';
    }
    
    // Validate phone number
    else if (type === 'tel' && value && !this.isValidPhone(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid phone number.';
    }
    // Validate minimum length
    else if (input.hasAttribute('minlength')) {
      const minLength = parseInt(input.getAttribute('minlength'));
      if (value.length < minLength) {
        isValid = false;
        errorMessage = `Minimum ${minLength} characters required.`;
      }
    }

    this.toggleFieldError(input, isValid, errorMessage);
    return isValid;
  }

  /**
   * Check if email is valid
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Check if phone number is valid
   */
  isValidPhone(phone) {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    // Check if it's a valid length (10-15 digits)
    return cleaned.length >= 10 && cleaned.length <= 15;
  }

  /**
   * Toggle field error display
   */
  toggleFieldError(input, isValid, errorMessage) {
    const formGroup = input.closest('.form__group');
    const existingError = formGroup.querySelector('.form__error');

    if (isValid) {
      input.classList.remove('form__input--error');
      if (existingError) {
        existingError.remove();
      }
    } else {
      input.classList.add('form__input--error');
      if (!existingError) {
        const errorElement = document.createElement('span');
        errorElement.className = 'form__error';
        errorElement.textContent = errorMessage;
        formGroup.appendChild(errorElement);
      }
    }
  }

  /**
   * Clear field error
   */
  clearFieldError(input) {
    const formGroup = input.closest('.form__group');
    const existingError = formGroup.querySelector('.form__error');
    
    input.classList.remove('form__input--error');
    if (existingError) {
      existingError.remove();
    }
  }

  /**
   * Set submit button state
   */
  setSubmitButtonState(button, state) {
    const originalText = button.textContent;
    
    switch (state) {
      case 'loading':
        button.disabled = true;
        button.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin">
            <path d="M21 12a9 9 0 11-6.219-8.56"/>
          </svg>
          Sending...
        `;
        break;
      case 'default':
        button.disabled = false;
        button.innerHTML = `
          Send Message
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22,2 15,22 11,13 2,9 22,2"/>
          </svg>
        `;
        break;
    }
  }

  /**
   * Simulate form submission (replace with actual API call)
   */
  simulateFormSubmission(formData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success/failure
        const isSuccess = Math.random() > 0.1; // 90% success rate
        
        if (isSuccess) {
          resolve({ success: true });
        } else {
          reject(new Error('Simulated server error'));
        }
      }, 2000);
    });
  }

  /**
   * Show form message
   */
  showFormMessage(type, message) {
    const form = document.getElementById('contact-form');
    const existingMessage = form.querySelector('.form__message');
    
    // Remove existing message
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create new message
    const messageElement = document.createElement('div');
    messageElement.className = `form__message form__message--${type}`;
    messageElement.textContent = message;
    
    // Insert at the top of the form
    form.insertBefore(messageElement, form.firstChild);
    
    // Remove message after 5 seconds
    setTimeout(() => {
      messageElement.remove();
    }, 5000);
  }

  /**
   * Set up theme handling (for future dark mode implementation)
   */
  setupThemeHandling() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('devvy-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('devvy-theme')) {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      }
    });
  }

  /**
   * Set up performance optimizations
   */
  setupPerformanceOptimizations() {
    // Lazy load images when implemented
    this.setupLazyLoading();
    
    // Optimize scroll performance
    this.optimizeScrollPerformance();
    
    // Preload critical resources
    this.preloadCriticalResources();
  }

  /**
   * Set up lazy loading for images
   */
  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const images = document.querySelectorAll('img[data-src]');
      
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    }
  }

  /**
   * Optimize scroll performance
   */
  optimizeScrollPerformance() {
    let isScrolling = false;
    
    window.addEventListener('scroll', () => {
      if (!isScrolling) {
        window.requestAnimationFrame(() => {
          this.handleScroll();
          isScrolling = false;
        });
        isScrolling = true;
      }
    });
  }

  /**
   * Handle scroll events
   */
  handleScroll() {
    const scrollY = window.pageYOffset;
    const nav = document.querySelector('.nav');
    
    // Add/remove nav background on scroll
    if (scrollY > 50) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  /**
   * Preload critical resources
   */
  preloadCriticalResources() {
    // Preload hero assets
    const criticalAssets = [
      // Add any critical images or assets here
    ];

    criticalAssets.forEach(asset => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = asset;
      link.as = 'image';
      document.head.appendChild(link);
    });
  }

  /**
   * Handle window scroll
   */
  onScroll() {
    this.handleScroll();
  }

  /**
   * Handle window resize
   */
  onResize() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
      const navMenu = document.getElementById('nav-menu');
      const navToggle = document.getElementById('nav-toggle');
      
      if (navMenu && navMenu.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu');
        this.updateAriaExpanded(navToggle, false);
      }
    }
  }

  /**
   * Handle window load
   */
  onWindowLoad() {
    // Remove any loading states
    document.body.classList.add('page-loaded');
    
    // Initialize any load-dependent features
    this.initializeLoadDependentFeatures();
  }

  /**
   * Initialize features that depend on full page load
   */
  initializeLoadDependentFeatures() {
    // Add any features that need the full page to be loaded
    this.setupParallaxEffects();
  }

  /**
   * Set up subtle parallax effects
   */
  setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero');
    
    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', this.throttle(() => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      parallaxElements.forEach(element => {
        element.style.transform = `translateY(${rate}px)`;
      });
    }, 16));
  }

  /**
   * Handle keyboard navigation
   */
  onKeyDown(e) {
    // Handle escape key for closing modals/menus
    if (e.key === 'Escape') {
      const navMenu = document.getElementById('nav-menu');
      const navToggle = document.getElementById('nav-toggle');
      
      if (navMenu && navMenu.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu');
        this.updateAriaExpanded(navToggle, false);
        navToggle.focus();
      }
    }
  }

  /**
   * Utility: Throttle function
   */
  throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    
    return function (...args) {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }

  /**
   * Utility: Debounce function
   */
  debounce(func, delay) {
    let timeoutId;
    
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }
}

// Initialize the site when the script loads
const devvyDevSite = new DevvyDevSite();

// Add some CSS for form validation and animations
const additionalStyles = `
<style>
  .form__input--error {
    border-color: #ef4444 !important;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
  }
  
  .form__error {
    display: block;
    color: #ef4444;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    font-weight: 500;
  }
  
  .form__message {
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1.5rem;
    font-weight: 500;
  }
  
  .form__message--success {
    background: #d1fae5;
    color: #065f46;
    border: 1px solid #a7f3d0;
  }
  
  .form__message--error {
    background: #fee2e2;
    color: #991b1b;
    border: 1px solid #fca5a5;
  }
  
  .nav--scrolled {
    background: rgba(255, 255, 255, 0.98) !important;
    backdrop-filter: blur(20px);
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  
  .loading {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease-out;
  }
  
  .loaded {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Stagger delay for multiple elements */
  .service-card:nth-child(1) { transition-delay: 0.1s; }
  .service-card:nth-child(2) { transition-delay: 0.2s; }
  .service-card:nth-child(3) { transition-delay: 0.3s; }
  
  .project-card:nth-child(1) { transition-delay: 0.1s; }
  .project-card:nth-child(2) { transition-delay: 0.2s; }
  .project-card:nth-child(3) { transition-delay: 0.3s; }
  
  /* Smooth scroll for browsers that don't support scroll-behavior */
  @media (prefers-reduced-motion: no-preference) {
    html {
      scroll-behavior: smooth;
    }
  }
</style>
`;

// Inject additional styles
document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DevvyDevSite;
}
