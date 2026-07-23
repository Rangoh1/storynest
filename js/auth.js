// ===============================
// StoryNest Authentication
// Sprint 4 - Part 2
// ===============================

const currentPage = window.location.pathname.split("/").pop();

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (event) {


        event.preventDefault();

        const alias = document.getElementById("alias").value.trim();
        const contact = document.getElementById("contact").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        

const terms = document.getElementById("terms").checked;

        if (!alias || !contact || !password || !confirmPassword) {
            alert("Please complete all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        if (!terms) {
            alert("You must agree to the Community Guidelines.");
            return;
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000);

const user = {
    alias,
    contact,
    password
};

localStorage.setItem("storynestUser", JSON.stringify(user));

localStorage.setItem("verificationCode", verificationCode);

window.location.href = "verify.html";

    });

}

// ===============================
// Verify Page
// ===============================

if (currentPage === "verify.html") {

    const user = JSON.parse(localStorage.getItem("storynestUser"));

    if (user) {

        let contact = user.contact;

        // Mask phone number
        if (/^\d+$/.test(contact)) {

            contact =
                contact.substring(0, 4) +
                "****" +
                contact.substring(contact.length - 2);

        }

        // Mask email
        else if (contact.includes("@")) {

            const parts = contact.split("@");

            contact =
                parts[0].substring(0, 3) +
                "*****@" +
                parts[1];

        }

        document.getElementById("verificationMessage").textContent =
            `We've sent a 6-digit verification code to ${contact}.`;

const code = localStorage.getItem("verificationCode");

const developerCode = document.getElementById("developerCode");

if (developerCode && code) {
    developerCode.textContent = code;
}

    }

}

// ===============================
// Verify Submitted Code
// ===============================

const verifyForm = document.getElementById("verifyForm");

if (verifyForm) {

    verifyForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const enteredCode =
            document.getElementById("verificationInput").value.trim();

        const savedCode =
            localStorage.getItem("verificationCode");

        if (enteredCode === savedCode) {

            alert("Account verified successfully!");

            localStorage.setItem("verified", "true");

            window.location.href = "login.html";

        } else {

            alert("Incorrect verification code.");

        }

    });

}
