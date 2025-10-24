// Enhanced Footer JavaScript for Meauxbility
(() => {
  'use strict';

  // Initialize footer functionality
  function initFooter() {
    // Set current year
    const yearElement = document.getElementById('mbx-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }

    // Initialize theme management
    initThemeManagement();
    
    // Initialize 3D model performance management
    init3DModelManagement();
    
    // Initialize payment controller
    initPaymentController();
    
    // Initialize newsletter form
    initNewsletterForm();
    
    console.log('✅ Footer initialized successfully');
  }

  // Theme Management
  function initThemeManagement() {
    const footer = document.getElementById('mbx-footer');
    if (!footer) return;

    // Apply theme based on page context
    const darkPages = ['about', 'community', 'resources'];
    const currentPath = window.location.pathname;
    
    let theme = 'light';
    darkPages.forEach(page => {
      if (currentPath.includes(page)) {
        theme = 'dark';
      }
    });

    // Apply theme to footer
    footer.setAttribute('data-theme', theme);
    
    // Update theme variables
    updateThemeVariables(theme);
  }

  function updateThemeVariables(theme) {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.style.setProperty('--footer-bg-start', '#1a1a2e');
      root.style.setProperty('--footer-bg-mid', '#16213e');
      root.style.setProperty('--footer-bg-end', '#0f1c2e');
      root.style.setProperty('--footer-accent', '#9945FF');
      root.style.setProperty('--footer-accent-hover', '#7928CA');
      root.style.setProperty('--footer-glow', '#9945FF');
    } else {
      root.style.setProperty('--footer-bg-start', '#339999');
      root.style.setProperty('--footer-bg-mid', '#2C8B8B');
      root.style.setProperty('--footer-bg-end', '#237373');
      root.style.setProperty('--footer-accent', '#FF6B35');
      root.style.setProperty('--footer-accent-hover', '#E85D00');
      root.style.setProperty('--footer-glow', '#FF6B35');
    }
  }

  // 3D Model Performance Management
  function init3DModelManagement() {
    const modelViewer = document.querySelector('model-viewer');
    if (!modelViewer) return;

    // Intersection Observer for performance
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          modelViewer.setAttribute('auto-rotate', '');
          modelViewer.setAttribute('rotation-per-second', '18deg');
        } else {
          modelViewer.removeAttribute('auto-rotate');
        }
      });
    }, { threshold: 0.1 });

    observer.observe(modelViewer);

    // Pause on hover for better performance
    modelViewer.addEventListener('mouseenter', () => {
      modelViewer.removeAttribute('auto-rotate');
    });

    modelViewer.addEventListener('mouseleave', () => {
      if (modelViewer.getBoundingClientRect().top < window.innerHeight) {
        modelViewer.setAttribute('auto-rotate', '');
        modelViewer.setAttribute('rotation-per-second', '18deg');
      }
    });
  }

  // Payment Controller
  function initPaymentController() {
    // Initialize Stripe
    if (typeof Stripe !== 'undefined') {
      window.mbxStripe = Stripe('pk_live_51S4R0SRW56Pm3uYI8EKbysm1ok4peVXSD6G17HtFy8BDuG9Carn8Ry7iPVzulMBtdEFcz5pFvXpE04CIgn8PY6WS00aXOqMYEI');
    }
  }

  // Newsletter Form
  function initNewsletterForm() {
    const form = document.getElementById('mbx-newsletterForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = form.querySelector('input[type="email"]').value;
      const button = form.querySelector('button[type="submit"]');
      
      if (!email) return;

      // Show loading state
      button.textContent = 'Subscribing...';
      button.disabled = true;

      try {
        // Simulate API call (replace with actual endpoint)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show success
        button.textContent = 'Subscribed!';
        button.style.background = '#21c48c';
        
        // Reset form
        form.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
          button.textContent = 'Subscribe';
          button.disabled = false;
          button.style.background = '';
        }, 3000);
        
      } catch (error) {
        console.error('Newsletter subscription error:', error);
        button.textContent = 'Try Again';
        button.disabled = false;
      }
    });
  }

  // Global functions for donation modal
  window.openDonateModal = function() {
    const modal = document.getElementById('mbxModalBackdrop');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeDonateModal = function() {
    const modal = document.getElementById('mbxModalBackdrop');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // Donation modal functions
  window.setMbxFrequency = function(frequency) {
    const buttons = document.querySelectorAll('.mbx-frequency-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Store frequency for payment processing
    window.mbxDonationFrequency = frequency;
  };

  window.selectMbxAmount = function(amount) {
    const buttons = document.querySelectorAll('.mbx-amount-btn');
    buttons.forEach(btn => btn.classList.remove('selected'));
    event.target.classList.add('selected');
    
    // Store amount for payment processing
    window.mbxDonationAmount = amount;
  };

  window.selectMbxCustom = function(value) {
    if (value && value > 0) {
      const buttons = document.querySelectorAll('.mbx-amount-btn');
      buttons.forEach(btn => btn.classList.remove('selected'));
      window.mbxDonationAmount = parseFloat(value);
    }
  };

  window.processMbxDonation = async function() {
    const submitBtn = document.querySelector('.mbx-donate-submit');
    const loading = document.getElementById('mbxLoading');
    const submitText = document.querySelector('.mbx-submit-text');
    
    if (!submitBtn || !loading || !submitText) return;

    // Show loading state
    submitBtn.disabled = true;
    submitText.style.display = 'none';
    loading.classList.add('active');

    try {
      // Get form data
      const firstName = document.getElementById('mbxFirstName')?.value;
      const lastName = document.getElementById('mbxLastName')?.value;
      const email = document.getElementById('mbxEmail')?.value;
      const designation = document.getElementById('mbxDesignation')?.value;
      
      // Validate required fields
      if (!firstName || !lastName || !email) {
        throw new Error('Please fill in all required fields');
      }

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      const successMsg = document.getElementById('mbxSuccessMsg');
      if (successMsg) {
        successMsg.classList.add('show');
      }
      
      // Hide form and show success
      const donateGrid = document.querySelector('.mbx-donate-grid');
      if (donateGrid) {
        donateGrid.style.display = 'none';
      }
      
    } catch (error) {
      console.error('Donation processing error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      // Reset button state
      submitBtn.disabled = false;
      submitText.style.display = 'inline';
      loading.classList.remove('active');
    }
  };

  // Close modal on backdrop click
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('mbx-modal-backdrop')) {
      closeDonateModal();
    }
  });

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('mbxModalBackdrop');
      if (modal && modal.classList.contains('active')) {
        closeDonateModal();
      }
    }
  });

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFooter);
  } else {
    initFooter();
  }

})();