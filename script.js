document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const inputs = form.querySelectorAll("input, textarea");
    const submitButton = form.querySelector("button[type='submit']");

    // Function to validate the form
    function validateForm() {
        let isValid = true;

        inputs.forEach((input) => {
            const errorMessage = input.nextElementSibling;

            // Check if the input is empty
            if (!input.value.trim()) {
                showError(input, "This field is required.");
                isValid = false;
            } else {
                // Validate specific input types
                if (input.type === "email" && !validateEmail(input.value)) {
                    showError(input, "Please enter a valid email address.");
                    isValid = false;
                } else if (input.type === "tel" && !validatePhone(input.value)) {
                    showError(input, "Please enter a valid phone number.");
                    isValid = false;
                } else if (input.type === "date" && !validateDate(input.value)) {
                    showError(input, "Please enter a valid date.");
                    isValid = false;
                } else {
                    clearError(input);
                }
            }
        });

        // Validate the terms checkbox
        const termsCheckbox = form.querySelector("#terms");
        if (!termsCheckbox.checked) {
            showError(termsCheckbox, "You must agree to the terms and conditions.");
            isValid = false;
        } else {
            clearError(termsCheckbox);
        }

        return isValid;
    }

    // Function to show error messages
    function showError(input, message) {
        const errorMessage = input.nextElementSibling || document.createElement("div");
        errorMessage.className = "text-red-500 text-sm mt-1";
        errorMessage.textContent = message;
        input.classList.add("border-red-500");
        input.classList.remove("border-gray-200");
        input.parentNode.insertBefore(errorMessage, input.nextSibling);
    }

    // Function to clear error messages
    function clearError(input) {
        const errorMessage = input.nextElementSibling;
        if (errorMessage && errorMessage.classList.contains("text-red-500")) {
            errorMessage.remove();
        }
        input.classList.remove("border-red-500");
        input.classList.add("border-gray-200");
    }

    // Email validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Phone number validation
    function validatePhone(phone) {
        const re = /^\d{10}$/;
        return re.test(String(phone));
    }

    // Date validation
    function validateDate(date) {
        const selectedDate = new Date(date);
        const currentDate = new Date();
        return selectedDate <= currentDate;
    }

    // Simulate form submission
    function submitForm() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (validateForm()) {
                    resolve("Form submitted successfully!");
                } else {
                    reject("Please fix the errors before submitting.");
                }
            }, 1000);
        });
    }

    // Handle form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        submitForm()
            .then((message) => {
                // Show success popup
                alert(message);
                form.reset(); // Reset the form
            })
            .catch((error) => {
                alert(error);
            });
    });

    // Add real-time validation for inputs
    inputs.forEach((input) => {
        input.addEventListener("input", () => {
            if (input.value.trim()) {
                clearError(input);
            }
        });
    });
});