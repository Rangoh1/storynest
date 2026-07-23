// ===============================
// Stories Page
// ===============================

const stories = getStories();

const searchBox = document.getElementById("searchBox");

const storiesGrid = document.getElementById("storiesGrid");

const categoryFilter = document.getElementById("categoryFilter");

const sortFilter = document.getElementById("sortFilter");

const publicStories = stories.filter(story =>
    story.status === "public"
);


// ===============================
// Load Categories
// ===============================

function loadCategoryOptions() {

    categoryFilter.innerHTML = `
        <option value="All">All</option>
    `;

    categories.forEach(category => {

        categoryFilter.innerHTML += `
            <option value="${category.id}">
                ${category.name}
            </option>
        `;

    });

}


// ===============================
// Filter Stories
// ===============================

function filterStories() {

    const searchText =
        searchBox.value.toLowerCase().trim();

    const selectedCategory =
        categoryFilter.value;

    let filteredStories = [...publicStories];

    // Category Filter

    if (selectedCategory !== "All") {

        filteredStories = filteredStories.filter(story =>

            story.category === selectedCategory

        );

    }

    // Search Filter

    filteredStories = filteredStories.filter(story =>

        story.title.toLowerCase().includes(searchText) ||

        story.content.toLowerCase().includes(searchText) ||

        story.author.toLowerCase().includes(searchText)

    );

    // ===============================
    // Sorting
    // ===============================

    switch (sortFilter.value) {

        case "oldest":

            filteredStories.reverse();

            break;

        case "likes":

            filteredStories.sort((a, b) => b.likes - a.likes);

            break;

        case "views":

            filteredStories.sort((a, b) => b.views - a.views);

            break;

        default:

            // Newest (default order)

            break;

    }

    displayStories(filteredStories);

}


// ===============================
// Display Stories
// ===============================

function displayStories(storiesToDisplay) {

    storiesGrid.innerHTML = "";

    if (storiesToDisplay.length === 0) {

        storiesGrid.innerHTML = `

            <div class="no-results">

                <h2>🔍</h2>

                <h3>No stories found</h3>

                <p>Try another search or category.</p>

            </div>

        `;

        return;

    }

    storiesToDisplay.forEach(story => {

        const preview =
            story.content.length > 120
                ? story.content.substring(0, 120) + "..."
                : story.content;

        const commentCount =
            Array.isArray(story.comments)
                ? story.comments.length
                : (story.comments || 0);

        storiesGrid.innerHTML += `

            <article class="story-card">

                <h2>${story.title}</h2>

                <p class="author">

                    👤 @${story.author}

                </p>

                <p class="story-category">

                    🏷 ${getCategoryName(story.category)}

                </p>

                <p class="excerpt">

                    ${preview}

                </p>

                <div class="story-footer">

                    <span>❤️ ${story.likes}</span>

                    <span>💬 ${commentCount}</span>

                    <span>👁️ ${story.views}</span>

                </div>

                <a
                    href="story.html"
                    class="read-more"
                    onclick="openStory(${stories.indexOf(story)})">

                    Read More →

                </a>

            </article>

        `;

    });

}


// ===============================
// Open Story
// ===============================

function openStory(index) {

    setSelectedStoryIndex(index);

}


// ===============================
// Events
// ===============================

loadCategoryOptions();

filterStories();

searchBox.addEventListener("input", filterStories);

categoryFilter.addEventListener("change", filterStories);

sortFilter.addEventListener("change", filterStories);