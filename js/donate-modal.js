// Enhanced Donation Modal with Stripe Integration
(() => {
  'use strict';

  class MbxPaymentController {
    constructor() {
      this.stripe = null;
      this.elements = null;
      this.cardElement = null;
      this.currentAmount = 250;
      this.currentFrequency = 'one_time';
      this.isProcessing = false;
      
      this.init();
    }

    async init() {
      try {
        // Initialize Stripe
        if (typeof Stripe !== 'undefined') {
          this.stripe = Stripe('pk_live_51S4R0SRW56Pm3uYI8EKbysm1ok4peVXSD6G17HtFy8BDuG9Carn8Ry7iPVzulMBtdEFcz5pFvXpE04CIgn8PY6WS00aXOqMYEI');
          
          // Initialize Elements
          this.elements = this.stripe.elements({
            appearance: {
              theme: 'dark',
              variables: {
                colorPrimary: '#9945FF',
                colorBackground: 'rgba(26,74,82,0.3)',
                colorText: '#ffffff',
                colorDanger: '#ff6b6b',
                fontFamily: 'Inter, sans-serif',
                spacingUnit: '4px',
                borderRadius: '10px'
              }
            }
          });

          // Create card element
          this.cardElement = this.elements.create('card', {
            style: {
              base: {
                fontSize: '14px',
                color: '#ffffff',
                '::placeholder': {
                  color: 'rgba(255,255,255,0.5)'
                }
              }
            }
          });

          // Mount card element
          const cardContainer = document.getElementById('mbx-card-element');
          if (cardContainer) {
            this.cardElement.mount(cardContainer);
            
            // Handle real-time validation
            this.cardElement.on('change', (event) => {
              const displayError = document.getElementById('mbxCardErr');
              if (event.error) {
                displayError.textContent = event.error.message;
                displayError.classList.add('show');
              } else {
                displayError.textContent = '';
                displayError.classList.remove('show');
              }
            });
          }

          console.log('✅ Stripe initialized successfully');
        } else {
          console.warn('⚠️ Stripe not loaded');
        }
      } catch (error) {
        console.error('❌ Stripe initialization failed:', error);
      }
    }

    setAmount(amount) {
      this.currentAmount = amount;
      this.updateAmountButtons();
    }

    setFrequency(frequency) {
      this.currentFrequency = frequency;
      this.updateFrequencyButtons();
    }

    updateAmountButtons() {
      const buttons = document.querySelectorAll('.mbx-amount-btn');
      buttons.forEach(btn => {
        btn.classList.remove('selected');
        if (parseInt(btn.textContent.replace(/[^0-9]/g, '')) === this.currentAmount) {
          btn.classList.add('selected');
        }
      });
    }

    updateFrequencyButtons() {
      const buttons = document.querySelectorAll('.mbx-frequency-btn');
      buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(this.currentFrequency.replace('_', ' '))) {
          btn.classList.add('active');
        }
      });
    }

    async processPayment() {
      if (this.isProcessing) return;
      
      this.isProcessing = true;
      const submitBtn = document.querySelector('.mbx-donate-submit');
      const loading = document.getElementById('mbxLoading');
      const submitText = document.querySelector('.mbx-submit-text');
      
      if (!submitBtn || !loading || !submitText) return;

      try {
        // Show loading state
        submitBtn.disabled = true;
        submitText.style.display = 'none';
        loading.classList.add('active');

        // Get form data
        const firstName = document.getElementById('mbxFirstName')?.value;
        const lastName = document.getElementById('mbxLastName')?.value;
        const email = document.getElementById('mbxEmail')?.value;
        const designation = document.getElementById('mbxDesignation')?.value;
        
        // Validate required fields
        if (!firstName || !lastName || !email) {
          throw new Error('Please fill in all required fields');
        }

        if (!this.stripe || !this.cardElement) {
          throw new Error('Payment system not initialized');
        }

        // Create payment intent
        const response = await fetch('https://shhh-ox7c.onrender.com/donations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: this.currentAmount * 100, // Convert to cents
            frequency: this.currentFrequency,
            firstName,
            lastName,
            email,
            designation,
            currency: 'usd'
          })
        });

        if (!response.ok) {
          throw new Error('Payment processing failed');
        }

        const { clientSecret } = await response.json();

        // Confirm payment
        const { error, paymentIntent } = await this.stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: this.cardElement,
            billing_details: {
              name: `${firstName} ${lastName}`,
              email: email
            }
          }
        });

        if (error) {
          throw new Error(error.message);
        }

        if (paymentIntent.status === 'succeeded') {
          // Show success message
          this.showSuccess();
        } else {
          throw new Error('Payment was not completed');
        }

      } catch (error) {
        console.error('Payment error:', error);
        alert(`Payment failed: ${error.message}`);
      } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitText.style.display = 'inline';
        loading.classList.remove('active');
        this.isProcessing = false;
      }
    }

    showSuccess() {
      const successMsg = document.getElementById('mbxSuccessMsg');
      const donateGrid = document.querySelector('.mbx-donate-grid');
      
      if (successMsg) {
        successMsg.classList.add('show');
      }
      
      if (donateGrid) {
        donateGrid.style.display = 'none';
      }
      
      // Auto-close modal after 3 seconds
      setTimeout(() => {
        this.closeModal();
      }, 3000);
    }

    closeModal() {
      const modal = document.getElementById('mbxModalBackdrop');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset form
        this.resetForm();
      }
    }

    resetForm() {
      // Reset form fields
      const inputs = document.querySelectorAll('.mbx-form-input, .mbx-custom-amount');
      inputs.forEach(input => input.value = '');
      
      // Reset amount selection
      this.currentAmount = 250;
      this.updateAmountButtons();
      
      // Reset frequency
      this.currentFrequency = 'one_time';
      this.updateFrequencyButtons();
      
      // Clear card element
      if (this.cardElement) {
        this.cardElement.clear();
      }
      
      // Hide success message
      const successMsg = document.getElementById('mbxSuccessMsg');
      const donateGrid = document.querySelector('.mbx-donate-grid');
      
      if (successMsg) {
        successMsg.classList.remove('show');
      }
      
      if (donateGrid) {
        donateGrid.style.display = 'grid';
      }
    }
  }

  // Global payment controller instance
  let paymentController = null;

  // Initialize payment controller when DOM is ready
  function initPaymentController() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        paymentController = new MbxPaymentController();
      });
    } else {
      paymentController = new MbxPaymentController();
    }
  }

  // Global functions for donation modal
  window.openDonateModal = function() {
    const modal = document.getElementById('mbxModalBackdrop');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Initialize payment controller if not already done
      if (!paymentController) {
        paymentController = new MbxPaymentController();
      }
    }
  };

  window.closeDonateModal = function() {
    if (paymentController) {
      paymentController.closeModal();
    }
  };

  window.setMbxFrequency = function(frequency) {
    if (paymentController) {
      paymentController.setFrequency(frequency);
    }
  };

  window.selectMbxAmount = function(amount) {
    if (paymentController) {
      paymentController.setAmount(amount);
    }
  };

  window.selectMbxCustom = function(value) {
    if (value && value > 0 && paymentController) {
      paymentController.setAmount(parseFloat(value));
    }
  };

  window.processMbxDonation = function() {
    if (paymentController) {
      paymentController.processPayment();
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

  // Initialize payment controller
  initPaymentController();

})();