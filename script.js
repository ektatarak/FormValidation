document.addEventListener("DOMContentLoaded", function () {

    // Signup Form
    let signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();

            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            let contact = document.getElementById("contact").value;

            // Validate email format
            if (!/^\S+@\S+\.\S+$/.test(email)) {
                alert("Invalid email format!");
                return;
            }

            // Validate password
            if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,16}/.test(password)) {
                alert("Password must be strong (8-16 characters, uppercase, lowercase, number, special character).");
                return;
            }

            // Validate contact number (Example: +91XXXXXXXXXX)
            if (!/^\+\d{1,3}\d{10}$/.test(contact)) {
                alert("Invalid contact number format! Use +91XXXXXXXXXX.");
                return;
            }

            // Store data in localStorage
            let users = JSON.parse(localStorage.getItem("users")) || [];
            if (users.some(user => user.email === email)) {
                alert("Email already registered!");
                return;
            }

            users.push({ email, password, contact });
            localStorage.setItem("users", JSON.stringify(users));
            alert("Signup successful!");
            window.location.href = "login.html";
        });
    }

    // Login Form
    let loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            let loginEmail = document.getElementById("loginEmail").value;
            let loginPassword = document.getElementById("loginPassword").value;
            let users = JSON.parse(localStorage.getItem("users")) || [];

            let validUser = users.find(user => user.email === loginEmail && user.password === loginPassword);
            if (validUser) {
                alert("Login successful!");
                window.location.href = "dashboard.html";
            } else {
                alert("Invalid credentials!");
            }
        });
    }
});
