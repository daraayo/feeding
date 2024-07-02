const loginForm = document.querySelector("form.login-form");
const signupForm = document.querySelector("form.signup-form");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector(".signup-link a");
const loginTextElement = document.querySelector(".title-text .login");
const signupTextElement = document.querySelector(".title-text .signup");

signupBtn.onclick = function() {
    loginForm.style.marginLeft = "-50%";
    signupForm.style.display = "block";
    loginForm.style.display = "none";
    signupTextElement.style.marginLeft = "-50%";
};

loginBtn.onclick = function() {
    loginForm.style.marginLeft = "0%";
    signupForm.style.display = "none";
    loginForm.style.display = "block";
};

signupLink.onclick = function(){
    signupBtn.click();
    return false;
};

// Save signup information
const signupFormElement = document.querySelector("form.signup-form");
signupFormElement.addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.querySelector("form.signup-form input[type='text']").value;
    const password = document.querySelector("form.signup-form input[type='password']:first-of-type").value;
    const confirmPassword = document.querySelector("form.signup-form input[type='password']:last-of-type").value;

    // Check if the username has been used before
    let existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = existingUsers.some(user => user.username === username);

    if (userExists) {
        alert("Username has already been used. Please choose a different username.");
        return;
    }

    if (password === confirmPassword) {
        // Add the new user to the list of existing users
        const newUser = { username, password };
        existingUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(existingUsers));

        // Redirect the user to the bank.html page
        window.location.href = "tasks.html";
    } else {
        alert("Passwords do not match");
    }
});

// Add the login logic
loginForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.querySelector("form.login-form input[type='text']").value;
    const password = document.querySelector("form.login-form input[type='password']").value;

    // Check if the user exists in the list of existing users
    let existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = existingUsers.find(user => user.username === username && user.password === password);

    if (user) {
        // Redirect the user to the bank.html page
        window.location.href = "tasks.html";
    } else {
        alert("Invalid username or password");
    }
});