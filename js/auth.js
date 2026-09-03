const usersStorageKey = "gameVaultUsers";
const currentUserStorageKey = "gameVaultCurrentUser";

function getUsers() {
    const savedUsers = localStorage.getItem(usersStorageKey);

    if (!savedUsers) {
        return [];
    }

    return JSON.parse(savedUsers);
}

function saveUsers(users) {
    localStorage.setItem(usersStorageKey, JSON.stringify(users));
}

function setMessage(elementId, message, isError = false) {
    const messageElement = document.querySelector(`#${elementId}`);

    if (!messageElement) {
        return;
    }

    messageElement.textContent = message;
    messageElement.classList.toggle("error-message", isError);
    messageElement.classList.toggle("success-message", !isError);
}

function signUp(event) {
    event.preventDefault();

    const name = document.querySelector("#signup-name").value.trim();
    const email = document.querySelector("#signup-email").value.trim().toLowerCase();
    const password = document.querySelector("#signup-password").value;
    const confirmPassword = document.querySelector("#signup-confirm-password").value;

    if (password !== confirmPassword) {
        setMessage("signup-message", "Passwords do not match.", true);
        return;
    }

    const users = getUsers();

    const existingUser = users.find((user) => {
        return user.email === email;
    });

    if (existingUser) {
        setMessage(
            "signup-message",
            "An account with this email already exists.",
            true
        );
        return;
    }

    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password
    };

    users.push(newUser);
    saveUsers(users);

    localStorage.setItem(
        currentUserStorageKey,
        JSON.stringify({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        })
    );

    window.location.href = "dashboard.html";
}

function logIn(event) {
    event.preventDefault();

    const email = document.querySelector("#login-email").value.trim().toLowerCase();
    const password = document.querySelector("#login-password").value;

    const users = getUsers();

    const user = users.find((savedUser) => {
        return savedUser.email === email && savedUser.password === password;
    });

    if (!user) {
        setMessage(
            "login-message",
            "Incorrect email address or password.",
            true
        );
        return;
    }

    localStorage.setItem(
        currentUserStorageKey,
        JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email
        })
    );

    window.location.href = "dashboard.html";
}

function getCurrentUser() {
    const savedCurrentUser = localStorage.getItem(currentUserStorageKey);

    if (!savedCurrentUser) {
        return null;
    }

    return JSON.parse(savedCurrentUser);
}

function logOut() {
    localStorage.removeItem(currentUserStorageKey);
    window.location.href = "index.html";
}

const signupForm = document.querySelector("#signup-form");
const loginForm = document.querySelector("#login-form");

if (signupForm) {
    signupForm.addEventListener("submit", signUp);
}

if (loginForm) {
    loginForm.addEventListener("submit", logIn);
}