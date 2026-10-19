const form = document.getElementById("registrationForm");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const phone = document.getElementById("phone");
const country = document.getElementById("country");
const successMessage = document.getElementById("successMessage");

// Show error message and highlight invalid fields
function showError(field, errorId, message) {
    document.getElementById(errorId).textContent = message;

    field.classList.toggle("invalid", message !== "");
}

// Validate Full Name
function validateFullName() {
    if (fullName.value.trim() === "") {
        showError(fullName, "fullNameError", "Full name cannot be empty.");
        return false;
    }

    showError(fullName, "fullNameError", "");
    return true;
}

// Validate Email Address
function validateEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() === "") {
        showError(email, "emailError", "Email address cannot be empty.");
        return false;
    }

    if (!emailPattern.test(email.value.trim())) {
        showError(email, "emailError", "Please enter a valid email address.");
        return false;
    }

    showError(email, "emailError", "");
    return true;
}

// Validate Password
function validatePassword() {
    let isValid = true;

    if (password.value.length < 6) {
        showError(password, "passwordError", "Password must be at least 6 characters.");
        isValid = false;
    } else {
        showError(password, "passwordError", "");
    }

    // Check confirmation again when the password changes
    if (confirmPassword.value !== "") {
        validateConfirmPassword();
    }

    return isValid;
}

// Validate Confirm Password
function validateConfirmPassword() {
    if (confirmPassword.value === "") {
        showError(confirmPassword, "confirmPasswordError", "Please confirm your password.");
        return false;
    }

    if (confirmPassword.value !== password.value) {
        showError(confirmPassword, "confirmPasswordError", "Passwords do not match.");
        return false;
    }

    showError(confirmPassword, "confirmPasswordError", "");
    return true;
}

// Validate Phone Number
function validatePhone() {
    const value = phone.value.trim();
    const phonePattern = /^\d+$/;

    if (value === "") {
        showError(phone, "phoneError", "Phone number cannot be empty.");
        return false;
    }

    if (!phonePattern.test(value)) {
        showError(phone, "phoneError", "Phone number must contain numbers only.");
        return false;
    }

    if (value.length < 10) {
        showError(phone, "phoneError", "Phone number must be at least 10 digits.");
        return false;
    }

    showError(phone, "phoneError", "");
    return true;
}

// Validate Gender
function validateGender() {
    const gender = document.querySelector('input[name="gender"]:checked');
    const error = document.getElementById("genderError");

    if (!gender) {
        error.textContent = "Please select a gender.";
        return false;
    }

    error.textContent = "";
    return true;
}

// Validate Hobbies
function validateHobbies() {
    const hobbies = document.querySelectorAll('input[name="hobbies"]:checked');
    const error = document.getElementById("hobbiesError");

    if (hobbies.length === 0) {
        error.textContent = "Please select at least one hobby.";
        return false;
    }

    error.textContent = "";
    return true;
}

// Validate Country
function validateCountry() {
    if (country.value === "") {
        showError(country, "countryError", "Please select your country.");
        return false;
    }

    showError(country, "countryError", "");
    return true;
}

// Real-time validation
fullName.addEventListener("input", validateFullName);
email.addEventListener("input", validateEmail);
password.addEventListener("input", validatePassword);
confirmPassword.addEventListener("input", validateConfirmPassword);
phone.addEventListener("input", validatePhone);
country.addEventListener("change", validateCountry);

document.querySelectorAll('input[name="gender"]').forEach(function (radio) {
    radio.addEventListener("change", validateGender);
});

document.querySelectorAll('input[name="hobbies"]').forEach(function (checkbox) {
    checkbox.addEventListener("change", validateHobbies);
});

// Validate the form before submission
form.addEventListener("submit", function (event) {
    // Prevent page reload
    event.preventDefault();

    successMessage.textContent = "";

    const isNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const isPhoneValid = validatePhone();
    const isGenderValid = validateGender();
    const areHobbiesValid = validateHobbies();
    const isCountryValid = validateCountry();

    if (
        isNameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid &&
        isPhoneValid &&
        isGenderValid &&
        areHobbiesValid &&
        isCountryValid
    ) {
        successMessage.textContent =
            "Registration form submitted successfully!";

        form.reset();

        // Remove validation borders after successful submission
        document.querySelectorAll(".invalid").forEach(function (field) {
            field.classList.remove("invalid");
        });
    }
});