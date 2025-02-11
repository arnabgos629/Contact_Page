document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let isValid = true;
        let errorMessage = "";

        // Fetch input fields
        const name = form.querySelector('input[type="text"]');
        const email = form.querySelector('input[type="email"]');
        const phone = form.querySelector('input[type="tel"]');
        const dob = form.querySelector('input[type="date"]');
        const gender = form.querySelectorAll('input[type="text"]')[1];
        const city = form.querySelectorAll('input[type="text"]')[2];
        const state = form.querySelectorAll('input[type="text"]')[3];
        const country = form.querySelectorAll('input[type="text"]')[4];
        const address = form.querySelectorAll('input[type="text"]')[5];
        const message = form.querySelector('textarea');
        const counseling = form.querySelector('input[name="counseling"]:checked');
        const resume = form.querySelector('input[type="file"]');
        const terms = form.querySelector("#terms");

        // Reset previous styles
        form.querySelectorAll("input, textarea").forEach(input => input.classList.remove("error"));

        // Name validation
        if (!/^[a-zA-Z\s]{3,}$/.test(name.value.trim())) {
            isValid = false;
            errorMessage += "❌ Name must be at least 3 characters and contain only letters.\n";
            name.classList.add("error");
        }

        // Email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
            isValid = false;
            errorMessage += "❌ Enter a valid email address.\n";
            email.classList.add("error");
        }

        // Phone validation
        if (!/^\d{10}$/.test(phone.value.trim())) {
            isValid = false;
            errorMessage += "❌ Phone number must be 10 digits.\n";
            phone.classList.add("error");
        }

        // Date of Birth validation
        if (!dob.value) {
            isValid = false;
            errorMessage += "❌ Please enter your Date of Birth.\n";
            dob.classList.add("error");
        }

        // Gender validation
        if (!/^(Male|Female|Other)$/i.test(gender.value.trim())) {
            isValid = false;
            errorMessage += "❌ Enter a valid Gender (Male, Female, Other).\n";
            gender.classList.add("error");
        }

        // City, State, Country validation
        [city, state, country, address].forEach((field, index) => {
            if (field.value.trim().length < 2) {
                isValid = false;
                errorMessage += `❌ ${["City", "State", "Country", "Address"][index]} must be at least 2 characters.\n`;
                field.classList.add("error");
            }
        });

        // Message validation
        if (message.value.trim().length < 10) {
            isValid = false;
            errorMessage += "❌ Message must be at least 10 characters long.\n";
            message.classList.add("error");
        }

        // Counseling validation
        if (!counseling) {
            isValid = false;
            errorMessage += "❌ Please select if you want counseling.\n";
        }

        // Resume validation
        if (!resume.files.length) {
            isValid = false;
            errorMessage += "❌ Please upload your CV/Resume.\n";
        }

        // Terms & Conditions validation
        if (!terms.checked) {
            isValid = false;
            errorMessage += "❌ You must agree to the terms and conditions.\n";
        }

        // Final check
        if (!isValid) {
            alert(errorMessage);
            return;
        }

        // Successful submission
        alert("✅ Form submitted successfully!");
        form.reset();
    });
});
