// ===============================
// Dynamic Navigation
// ===============================

const navActions = document.getElementById("navActions");

if (navActions) {

    const user = JSON.parse(localStorage.getItem("storynestUser"));

    if (user) {

        navActions.innerHTML = `

            <span class="user-name">
                👤 @${user.alias}
            </span>

            <button class="saved-btn" id="savedBtn">
                🔖 Saved
            </button>

            <button class="logout-btn" id="logoutBtn">
                Logout
            </button>

            <button class="share-btn" id="shareStoryBtn">
                + New Story
            </button>

        `;

    } else {

        navActions.innerHTML = `

            <a href="../auth/login.html" class="login-btn">
                Login
            </a>

            <a href="../auth/signup.html" class="signup-btn">
                Sign Up
            </a>

            <button class="share-btn" id="shareStoryBtn">
                + New Story
            </button>

        `;

    }

}


// ===============================
// Logout Button
// ===============================

const logoutButton = document.getElementById("logoutBtn");

if (logoutButton) {

    logoutButton.addEventListener("click", function () {

        localStorage.removeItem("storynestUser");

        window.location.href = "../index.html";

    });

}


// ===============================
// Saved Stories Button
// ===============================

const savedButton = document.getElementById("savedBtn");

if (savedButton) {

    savedButton.addEventListener("click", function () {

        window.location.href = "saved-stories.html";

    });

}


// ===============================
// New Story Button
// ===============================

const shareButton = document.getElementById("shareStoryBtn");

if (shareButton) {

    shareButton.addEventListener("click", function () {

        const user = localStorage.getItem("storynestUser");

        if (user) {

            window.location.href = "create-story.html";

        } else {

            alert("Please sign in or create an account before sharing your story.");

            window.location.href = "../auth/login.html";

        }

    });

}


// ===============================
// Open Story
// ===============================

function openStory(index) {

    localStorage.setItem("selectedStory", index);

    window.location.href = "story.html";

}