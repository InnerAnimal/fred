// Donate Modal JavaScript - Meauxbility
// This file contains the Stripe payment modal functionality
// Uses environment variables for API keys

(function() {
  'use strict';

  // Stripe Configuration
  const STRIPE_CONFIG = {
    publishableKey: process?.env?.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_live_51S4R0SRW56Pm3uYI8EKbysm1ok4peVXSD6G17HtFy8BDuG9Carn8Ry7iPVzulMBtdEFcz5pFvXpE04CIgn8PY6WS00aXOqMYEI',
    backendUrl: 'https://shhh-ox7c.onrender.com/donations'
  };

  // Payment Modal Controller
  class DonateModalController {
    constructor() {
      this.stripe = null;
      this.elements = null;
      this.card = null;
      this.amount = 250;
      this.frequency = 'one_time';
      this.isInitialized = false;
    }

    async initialize() {
      if (this.isInitialized) return;
      
      try {
        // Load Stripe if not already loaded
        if (typeof Stripe === 'undefined') {
          await this.loadStripe();
        }
        
        this.stripe = Stripe(STRIPE_CONFIG.publishableKey);
        this.elements = this.stripe.elements();
        
        this.card = this.elements.create('card', {
          style: {
            base: {
              fontSize: '14px',
              color: '#fff',
              fontFamily: 'Inter, sans-serif',
              '::placeholder': {
                color: 'rgba(255,255,255,0.5)'
              }
            },
            invalid: {
              color: '#ff6b6b'
            }
          }
        });
        
        this.isInitialized = true;
        console.log('✅ Donate Modal initialized');
      } catch (error) {
        console.error('❌ Failed to initialize donate modal:', error);
      }
    }

    async loadStripe() {
      return new Promise((resolve, reject) => {
        if (typeof Stripe !== 'undefined') {
          resolve();
          return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://js.stripe.com/v3/';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }

    async open() {
      await this.initialize();
      
      const backdrop = document.getElementById('mbxModalBackdrop');
      if (!backdrop) return;
      
      // Mount card element if not already mounted
      const cardElement = document.getElementById('mbx-card-element');
      if (cardElement && !cardElement.hasChildNodes()) {
        this.card.mount('#mbx-card-element');
        
        this.card.on('change', (event) => {
          this.handleCardChange(event);
        });
      }
      
      backdrop.classList.add('active');
      backdrop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      
      // Focus first input
      const firstNameInput = document.getElementById('mbxFirstName');
      if (firstNameInput) {
        setTimeout(() => firstNameInput.focus(), 100);
      }
    }

    close() {
      const backdrop = document.getElementById('mbxModalBackdrop');
      if (!backdrop) return;
      
      backdrop.classList.remove('active');
      backdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      
      this.reset();
    }

    handleCardChange(event) {
      const errorElement = document.getElementById('mbxCardErr');
      if (!errorElement) return;
      
      if (event.error) {
        errorElement.textContent = event.error.message;
        errorElement.classList.add('show');
      } else {
        errorElement.classList.remove('show');
      }
    }

    selectAmount(amount) {
      this.amount = amount;
      
      // Update UI
      document.querySelectorAll('.mbx-amount-btn').forEach(btn => {
        btn.classList.remove('selected');
      });
      
      if (event && event.target) {
        event.target.classList.add('selected');
      }
      
      // Clear custom amount
      const customInput = document.querySelector('.mbx-custom-amount');
      if (customInput) {
        customInput.value = '';
      }
    }

    selectCustomAmount(value) {
      if (value && value > 0) {
        this.amount = parseFloat(value);
        
        // Remove selection from preset buttons
        document.querySelectorAll('.mbx-amount-btn').forEach(btn => {
          btn.classList.remove('selected');
        });
      }
    }

    setFrequency(frequency) {
      this.frequency = frequency;
      
      // Update UI
      document.querySelectorAll('.mbx-frequency-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      
      if (event && event.target) {
        event.target.classList.add('active');
      }
    }

    validateForm() {
      let isValid = true;
      
      // Required fields
      const requiredFields = ['mbxFirstName', 'mbxLastName', 'mbxEmail'];
      
      requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(fieldId + 'Err');
        
        if (!field || !field.value.trim()) {
          if (error) {
            error.classList.add('show');
          }
          isValid = false;
        } else {
          if (error) {
            error.classList.remove('show');
          }
        }
      });
      
      // Email validation
      const emailField = document.getElementById('mbxEmail');
      const emailError = document.getElementById('mbxEmailErr');
      
      if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
          if (emailError) {
            emailError.classList.add('show');
          }
          isValid = false;
        }
      }
      
      return isValid;
    }

    async processPayment() {
      if (!this.validateForm()) {
        return;
      }
      
      const submitButton = document.querySelector('.mbx-donate-submit');
      const submitText = document.querySelector('.mbx-submit-text');
      const loading = document.getElementById('mbxLoading');
      
      if (!submitButton || !submitText || !loading) return;
      
      // Show loading state
      submitButton.disabled = true;
      submitText.style.display = 'none';
      loading.classList.add('active');
      
      try {
        // Create payment intent
        const response = await fetch(STRIPE_CONFIG.backendUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Idempotency-Key': `don_${Date.now()}_${Math.random()}`
          },
          body: JSON.stringify({
            fund: document.getElementById('mbxDesignation')?.value || 'general',
            frequency: this.frequency,
            amount: this.amount,
            currency: 'usd',
            metadata: {
              firstName: document.getElementById('mbxFirstName')?.value || '',
              lastName: document.getElementById('mbxLastName')?.value || '',
              email: document.getElementById('mbxEmail')?.value || ''
            }
          })
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const { clientSecret } = await response.json();
        
        // Confirm payment
        const { error, paymentIntent } = await this.stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: this.card,
            billing_details: {
              name: `${document.getElementById('mbxFirstName')?.value || ''} ${document.getElementById('mbxLastName')?.value || ''}`.trim(),
              email: document.getElementById('mbxEmail')?.value || ''
            }
          }
        });
        
        if (error) {
          throw new Error(error.message);
        }
        
        if (paymentIntent && paymentIntent.status === 'succeeded') {
          this.showSuccess();
        }
        
      } catch (error) {
        console.error('Payment error:', error);
        alert(`Payment failed: ${error.message}`);
      } finally {
        // Reset loading state
        submitButton.disabled = false;
        submitText.style.display = 'inline';
        loading.classList.remove('active');
      }
    }

    showSuccess() {
      const successMessage = document.getElementById('mbxSuccessMsg');
      if (successMessage) {
        successMessage.classList.add('show');
        setTimeout(() => this.close(), 3000);
      }
    }

    reset() {
      // Clear form fields
      document.querySelectorAll('.mbx-form-input').forEach(input => {
        input.value = '';
      });
      
      // Clear errors
      document.querySelectorAll('.mbx-error').forEach(error => {
        error.classList.remove('show');
      });
      
      // Hide success message
      const successMessage = document.getElementById('mbxSuccessMsg');
      if (successMessage) {
        successMessage.classList.remove('show');
      }
      
      // Clear card
      if (this.card) {
        this.card.clear();
      }
      
      // Reset amount and frequency
      this.amount = 250;
      this.frequency = 'one_time';
      
      // Reset UI
      document.querySelectorAll('.mbx-amount-btn').forEach(btn => {
        btn.classList.remove('selected');
      });
      document.querySelectorAll('.mbx-frequency-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      
      // Set default selections
      const defaultAmountBtn = document.querySelector('.mbx-amount-btn[onclick*="250"]');
      const defaultFreqBtn = document.querySelector('.mbx-frequency-btn[onclick*="one_time"]');
      
      if (defaultAmountBtn) defaultAmountBtn.classList.add('selected');
      if (defaultFreqBtn) defaultFreqBtn.classList.add('active');
    }
  }

  // Global instance
  let donateModal = null;

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    donateModal = new DonateModalController();
    
    // Set up event listeners
    setupEventListeners();
  });

  function setupEventListeners() {
    // Backdrop click to close
    const backdrop = document.getElementById('mbxModalBackdrop');
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
          closeDonateModal();
        }
      });
    }

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const backdrop = document.getElementById('mbxModalBackdrop');
        if (backdrop && backdrop.classList.contains('active')) {
          closeDonateModal();
        }
      }
    });
  }

  // Global functions for HTML onclick handlers
  window.openDonateModal = () => {
    if (donateModal) {
      donateModal.open();
    }
  };

  window.closeDonateModal = () => {
    if (donateModal) {
      donateModal.close();
    }
  };

  window.selectMbxAmount = (amount) => {
    if (donateModal) {
      donateModal.selectAmount(amount);
    }
  };

  window.selectMbxCustom = (value) => {
    if (donateModal) {
      donateModal.selectCustomAmount(value);
    }
  };

  window.setMbxFrequency = (frequency) => {
    if (donateModal) {
      donateModal.setFrequency(frequency);
    }
  };

  window.processMbxDonation = () => {
    if (donateModal) {
      donateModal.processPayment();
    }
  };

})();
