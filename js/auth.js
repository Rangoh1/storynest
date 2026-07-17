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

if (window.location.pathname.includes("verify.html")) {

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

// ===============================
// Share Story Button
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
// Create Story
// ===============================

const storyForm = document.getElementById("storyForm");

if (storyForm) {

    storyForm.addEventListener("submit", function(event){

        event.preventDefault();

        const title = document.getElementById("storyTitle").value.trim();

        const category = document.getElementById("storyCategory").value;

        const content = document.getElementById("storyContent").value.trim();

        const story = {

            title,
            category,
            content,

            author: "@You",

            time: "Just now",

            likes: 0,

            comments: 0,

            views: 0,

liked: false,

saved: false

        };

        // Get existing stories
let stories = JSON.parse(localStorage.getItem("stories")) || [];

// Add new story at the beginning
stories.unshift(story);

// Save all stories
localStorage.setItem("stories", JSON.stringify(stories));

// Return home
window.location.href = "home.html";

    });

}

// ===============================
// Home Page
// ===============================

if (window.location.pathname.includes("home.html")) {

    const container = document.getElementById("storiesContainer");

    const stories =
        JSON.parse(localStorage.getItem("stories")) || [];

    if (stories.length === 0) {

        container.innerHTML = `

            <p>No stories have been published yet.</p>

        `;

    }

    stories.forEach(function(story){

        container.innerHTML += `

        <div class="story-card">

            <div class="story-header">

                <div class="story-author">

                    <div class="story-category">

                        ${story.category}

                    </div>

                    <strong>${story.author}</strong>

                    <span>${story.time}</span>

                </div>

            </div>

            <h2 class="story-title">

                ${story.title}

            </h2>

            <p class="story-preview">

                ${story.content.substring(0,150)}...

            </p>

            <div class="story-footer">

                <div class="story-stats">

                    <span>❤️ ${story.likes}</span>

                    <span>💬 ${story.comments}</span>

                    <span>👁️ ${story.views}</span>

                </div>

            </div>

           <a href="#" class="read-link"
onclick="openStory(${stories.indexOf(story)})">

    Continue Reading →

</a>

        </div>

        `;

    });

}

// ===============================
// Open Story
// ===============================

function openStory(index){

    localStorage.setItem("selectedStory", index);

    window.location.href = "story.html";

}

// ===============================
// Story Page
// ===============================

if (window.location.pathname.includes("story.html")) {

    const stories =
        JSON.parse(localStorage.getItem("stories")) || [];

    const selected =
        localStorage.getItem("selectedStory");

    if (selected !== null && stories[selected]) {

        const story = stories[selected];

        // Like Button

const likeButton = document.getElementById("storyLikes");

likeButton.addEventListener("click", function () {

    if (!story.liked) {

    story.likes++;

    story.liked = true;

} else {

    story.likes--;

    story.liked = false;

}

const likeElement = document.getElementById("storyLikes");

likeElement.textContent =
    (story.liked ? "❤️ " : "🤍 ") + story.likes;

localStorage.setItem("stories", JSON.stringify(stories));

});

        document.getElementById("storyCategory").textContent =
            story.category;

        document.getElementById("storyTitle").textContent =
            story.title;

        document.getElementById("storyAuthor").textContent =
            story.author;

        document.getElementById("storyTime").textContent =
            story.time;

        document.getElementById("storyViews").textContent =
            "👁️ " + story.views;

        document.getElementById("storyLikes").textContent =
    (story.liked ? "❤️ " : "🤍 ") + story.likes;

    const saveButton = document.getElementById("saveStory");

saveButton.textContent =
    story.saved ? "✅ Saved" : "🔖 Save";

    saveButton.addEventListener("click", function () {

    story.saved = !story.saved;

    saveButton.textContent =
        story.saved ? "✅ Saved" : "🔖 Save";

    localStorage.setItem("stories", JSON.stringify(stories));

});

        document.getElementById("storyComments").textContent =
            "💬 " + story.comments;

        document.getElementById("storyContent").textContent =
            story.content;

    }

}

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

            <button class="logout-btn" id="logoutBtn">

                Logout

            </button>

            <button class="share-btn" id="shareStoryBtn">

                + New Story

            </button>

        `;

    }

    else {

        navActions.innerHTML = `

            <a href="../auth/login.html"
               class="login-btn">

                Login

            </a>

            <a href="../auth/signup.html"
               class="signup-btn">

                Sign Up

            </a>

            <button class="share-btn"
                    id="shareStoryBtn">

                + New Story

            </button>

        `;

    }

}

// ===============================
// Logout
// ===============================

const logoutButton = document.getElementById("logoutBtn");

if (logoutButton) {

    logoutButton.addEventListener("click", function(){

        localStorage.removeItem("storynestUser");

        window.location.href = "../index.html";

    });

}

// ===============================
// New Story Button
// ===============================

const newStoryButton =
    document.getElementById("shareStoryBtn");

if (newStoryButton) {

    newStoryButton.addEventListener("click", function(){

        const user =
            localStorage.getItem("storynestUser");

        if(user){

            window.location.href = "create-story.html";

        }

        else{

            alert("Please login or create an account first.");

            window.location.href = "../index.html";

        }

    });

}

// ================================
// Saved Stories Page
// ================================

const savedStoriesContainer =
    document.getElementById("savedStoriesContainer");

if (savedStoriesContainer) {

    const stories =
        JSON.parse(localStorage.getItem("stories")) || [];

    const savedStories =
        stories.filter(story => story.saved);

    if (savedStories.length === 0) {

        savedStoriesContainer.innerHTML = `

            <p>You haven't saved any stories yet.</p>

            <a href="home.html" class="read-link">
                Explore Stories →
            </a>

        `;

    } else {

        savedStories.forEach(function(story) {

            savedStoriesContainer.innerHTML += `

                <div class="story-card">

                    <div class="story-category">
                        ${story.category}
                    </div>

                    <h2>${story.title}</h2>

                    <p class="story-preview">
                        ${story.content.substring(0, 150)}...
                    </p>

                    <a href="story.html"
                       class="read-link"
                       onclick="localStorage.setItem('selectedStory', ${stories.indexOf(story)})">

                        Continue Reading →

                    </a>

                </div>

            `;

        });

    }

}
