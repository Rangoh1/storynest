
// ===============================
// Create Story
// ===============================

function loadStoryCategories() {

    const categorySelect = document.getElementById("storyCategory");

    // Stop if the dropdown doesn't exist on this page
    if (!categorySelect) return;

    // Keep only the first option ("Choose Category")
    categorySelect.innerHTML = `
        <option value="">Choose Category</option>
    `;

    categories.forEach(category => {

        const option = document.createElement("option");

        option.value = category.id;

        option.textContent = category.name;

        categorySelect.appendChild(option);

    });

}


loadStoryCategories();

const storyForm = document.getElementById("storyForm");

if (storyForm) {

    storyForm.addEventListener("submit", function(event){

        event.preventDefault();

        const title = document.getElementById("storyTitle").value.trim();

        const category = document.getElementById("storyCategory").value;

        const content = document.getElementById("storyContent").value.trim();

        const currentUser = JSON.parse(localStorage.getItem("storynestUser"));

const story = {

    title,
    category,
    content,

    author: currentUser.alias,

    status: "public",

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
