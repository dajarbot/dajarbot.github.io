// Client organization configuration
const organizations = [
  { name: 'RAS', subdomain: 'ras' },
  { name: 'WEM', subdomain: 'wem' },
  { name: 'Demo', subdomain: 'demo' }
];

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById('organizationInput');
  const button = document.getElementById('continueLoginBtn');
  const form = document.getElementById('loginForm');

  if (!input || !button || !form) return;

  // Validate input and enable/disable button
  function validateInput() {
    const value = input.value.trim().toLowerCase();
    const isValid = organizations.some(org => org.name.toLowerCase() === value);
    button.disabled = !isValid;

    if (isValid) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
    } else if (value.length > 0) {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
    } else {
      input.classList.remove('is-valid', 'is-invalid');
    }
  }

  // Listen for input changes
  input.addEventListener('input', validateInput);

  // Handle form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const value = input.value.trim().toLowerCase();
    const org = organizations.find(o => o.name.toLowerCase() === value);

    if (org) {
      // Redirect to subdomain
      window.location.href = `https://${org.subdomain}.landhorn.co`;
    }
  });

  // Auto-focus input when modal opens
  const modal = document.getElementById('loginModal');
  if (modal) {
    modal.addEventListener('shown.bs.modal', function() {
      input.focus();
    });

    // Reset form when modal closes
    modal.addEventListener('hidden.bs.modal', function() {
      input.value = '';
      input.classList.remove('is-valid', 'is-invalid');
      button.disabled = true;
    });
  }
});
