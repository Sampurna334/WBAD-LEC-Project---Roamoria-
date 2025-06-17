const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");
const wrapper = document.querySelector(".wrapper");
const loginTitle = document.querySelector(".title-login");
const registerTitle = document.querySelector(".title-register");
const signUpBtn = document.querySelector("#SignUpBtn");
const signInBtn = document.querySelector("#SignInBtn");

function loginFunction(){
    loginForm.style.left = "50%";
    loginForm.style.opacity = 1;
    registerForm.style.left = "150%";
    registerForm.style.opacity = 0;
    wrapper.style.height = "500px";
    loginTitle.style.top = "50%";
    loginTitle.style.opacity = 1;
    registerTitle.style.top = "50px";
    registerTitle.style.opacity = 0;
}

function registerFunction(){
    loginForm.style.left = "-150%";
    loginForm.style.opacity = 0;
    registerForm.style.left = "50%";
    registerForm.style.opacity = 1;
    wrapper.style.height = "720px";
    loginTitle.style.top = "-50px";
    loginTitle.style.opacity = 0;
    registerTitle.style.top = "30%";
    registerTitle.style.opacity = 1;
}


const loginFormLogin = document.getElementById('login');
const loginEmail = document.getElementById('log-email');
const loginPassword = document.getElementById('log-pass');

loginFormLogin.addEventListener('submit', e => {
    e.preventDefault();
    validateLoginInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = message;
    inputControl.classList.remove('success');
    inputControl.classList.add('error');
};

const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidateEmail = email => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

function validateLoginInputs() {
    const emailValue = loginEmail.value.trim();
    const passValue = loginPassword.value.trim();

    if (emailValue === '') {
        setError(loginEmail, 'Email is required');
    } else if (!isValidateEmail(emailValue)) {
        setError(loginEmail, 'Please enter a valid email');
    } else {
        setSuccess(loginEmail);
    }

    if (passValue === '') {
        setError(loginPassword, 'Password is required');
    } else if (passValue.length < 6) {
        setError(loginPassword, 'Password must be at least 6 characters');
    } else {
        setSuccess(loginPassword);
        window.location.href = "/index.html";
    }
}




// REGISTER FORM VALIDATION
const formRegister = document.getElementById('register');
const regName = document.getElementById('reg-name');
const regEmail = document.getElementById('reg-email');
const regPassword = document.getElementById('reg-pass');
const regCpass = document.getElementById('reg-cpass');
const regAgree = document.getElementById('agree');

registerForm.addEventListener('submit', e => {
    e.preventDefault();
    validateRegisterInputs();
});

const validatePassword = (password) => {
    const minLength = 6;
    const maxLength = 15;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!?,.()]/.test(password);

    if (password.length < minLength) {
        return "Password must be at least 6 characters";
    }
    if (password.length > maxLength) {
        return "Password must be no more than 15 characters";
    }
    if (!hasUppercase) {
        return "Password must contain at least one uppercase letter";
    }
    if (!hasNumber) {
        return "Password must contain at least one number";
    }
    if (!hasSymbol) {
        return "Password must contain at least one symbol: ! ? , . ( )";
    }
    return "";
};

const validateRegisterInputs = () => {
    const nameValue = regName.value.trim();
    const emailValue = regEmail.value.trim();
    const passValue = regPassword.value.trim();
    const cpassValue = regCpass.value.trim();
    const agreeChecked = regAgree.checked;

    // Username
    if (nameValue === '') {
        setError(regName, 'Username is required');
    } else if (nameValue.length < 3) {
        setError(regName, 'Username must be at least 3 characters');
    } else {
        setSuccess(regName);
    }

    // Email
    if (emailValue === '') {
        setError(regEmail, 'Email is required');
    } else if (!isValidateEmail(emailValue)) {
        setError(regEmail, 'Please enter a valid email');
    } else {
        setSuccess(regEmail);
    }

    // Password
   const passwordError = validatePassword(passValue);
   if (passValue === '') {
       setError(regPassword, 'Password is required');
   } else if (passwordError) {
       setError(regPassword, passwordError);
   } else {
       setSuccess(regPassword);
   }

   if (cpassValue === '') {
        setError(regCpass, 'Confirm Password is required');
    } else if (cpassValue !== passValue) {
        setError(regCpass, 'Password does not match');
    } else {
        setSuccess(regCpass);
    }

    // Checkbox
    if (!agreeChecked) {
        setError(regAgree, 'You must agree to terms & conditions');
    } else {
        setSuccess(regAgree);
    }
};