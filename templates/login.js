document.addEventListener('DOMContentLoaded', function() {
    // Get login form and signup link
    var loginForm = document.getElementById('loginForm');
    var signupLink = document.getElementById('signupLink');
    // Get signup form
    var signupForm = document.getElementById('signupForm');

    // Add click event listener to the signup link
    signupLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default action of the link
        loginForm.style.display = 'none'; // Hide login form
        signupForm.style.display = 'block'; // Display signup form
    });
});

