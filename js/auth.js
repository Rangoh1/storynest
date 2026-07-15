// ===============================
// StoryNest Authentication
// Sprint 4 - Part 2
// ===============================

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

        const user = {
            alias,
            contact,
            password
        };

        localStorage.setItem("storynestUser", JSON.stringify(user));

window.location.href = "verify.html";

    });

}