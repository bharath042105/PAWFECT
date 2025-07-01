


















function showSignupForm() {
    document.getElementById("login").style.display = "none";
    document.getElementById("signup").style.display = "block";
    return false; // Prevent default link behavior
   }
function isValidEmail(email) {
    // Regular expression for validating email format
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}   
function isValidPassword(password) {
    // Regular expressions for validating password format
    var minLength = 8; // Minimum length requirement
    var hasUppercase = /[A-Z]/; // At least one uppercase letter
    var hasLowercase = /[a-z]/; // At least one lowercase letter
    var hasNumber = /[0-9]/; // At least one number
    var hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/; // At least one special character

    // Check if password meets all criteria
    return (
        password.length >= minLength &&
        hasUppercase.test(password) &&
        hasLowercase.test(password) &&
        hasNumber.test(password) &&
        hasSpecialChar.test(password)
    );
}

function loginFunction(event) {
    event.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (email.trim() === "" || password.trim() === "") {
        alert("Please enter both email and password.");
        return;
    }
    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    if (!isValidPassword(password)) {
        alert("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
        return;
    }

    // Redirect to dashboard
    displayProfileIcon(email);
    window.location.replace("index.html");
   
}
/*function displayProfileIcon(email) {
    var profileIconContainer = document.getElementById("profileIconContainer");

    // Create and configure profile icon element
    var profileIcon = document.createElement("div");
    profileIcon.className = "profile-icon";
    profileIcon.textContent = email.charAt(0).toUpperCase(); // Display the first letter of the email in uppercase

    // Append profile icon to the container
    profileIconContainer.appendChild(profileIcon);
}*/
function displayProfileIcon(email) {
    var profileIconContainer = document.getElementById('profileIconContainer');
    var initialLetter = email.charAt(0).toUpperCase();
    profileIconContainer.innerHTML = '<h>' + initialLetter + '</h>';
    profileIconContainer.style.display = 'block';
}
function signupFunction(event) {
    event.preventDefault();
    var newEmail = document.getElementById("newEmail").value;
    var newPassword = document.getElementById("newPassword").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    // Basic validation: Check if any field is empty
    if (newEmail.trim() === "" || newPassword.trim() === "" || confirmPassword.trim() === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Check if email format is valid
    if (!isValidEmail(newEmail)) {
        alert("Please enter a valid email address.");
        return;
    }
    if (!isValidPassword(newPassword)) {
        alert("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
        return;
    }

    // Redirect to welcome page
    window.location.replace("index.html");
}



