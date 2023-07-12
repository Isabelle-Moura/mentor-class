const passwordInput = document.getElementById('password');
      const togglePassword = document.getElementById('toggle-password');

      togglePassword.addEventListener('click', function() {
        const passwordType = passwordInput.getAttribute('type');
        if (passwordType === 'password') {
          passwordInput.setAttribute('type', 'text');
          togglePassword.classList.remove('fa-eye');
          togglePassword.classList.add('fa-eye-slash');
        } else {
          passwordInput.setAttribute('type', 'password');
          togglePassword.classList.remove('fa-eye-slash');
          togglePassword.classList.add('fa-eye');
        }
      });