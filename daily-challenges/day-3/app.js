const contactForm = document.getElementById("contactForm");
const status = document.getElementById("status");

const inputs = contactForm.querySelectorAll("input, textarea");

const STORAGE_KEY = "contactFormData";
const AUTO_SAVE_INTERVAL = 5000;

function saveForm() {
    const formData = {};

    inputs.forEach(input => {
        formData[input.name] = input.value;
    });

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
        status.textContent = "Your information has been saved!";
    } catch (error) {
        status.textContent = "Unable to save your information.";
        console.error(error);
    }
}

function loadForm() {
    try {
        const savedData = JSON.parse(
            localStorage.getItem(STORAGE_KEY)
        );

        if (!savedData || typeof savedData !== "object" || Array.isArray(savedData)) {
            return;
        }

        inputs.forEach(input => {
            if (typeof savedData[input.name] === "string") {
                input.value = savedData[input.name];
            }
        });
    } catch (error) {
        console.error("Unable to restore form:", error);
    }
}

loadForm();

const autoSaveTimer = setInterval(saveForm, AUTO_SAVE_INTERVAL);

contactForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }

    clearInterval(autoSaveTimer);

    localStorage.removeItem(STORAGE_KEY);

    contactForm.reset();

    status.textContent = "Form submitted successfully!";
});
