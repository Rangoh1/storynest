// ===============================
// Saved Stories Page
// ===============================

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

        savedStories.forEach(function (story) {

            savedStoriesContainer.innerHTML += `

                <div class="story-card">

                    <div class="story-category">

                        ${getCategoryName(story.category)}

                    </div>

                    <h2>

                        ${story.title}

                    </h2>

                    <p class="story-preview">

                        ${story.content.substring(0,150)}...

                    </p>

                    <a href="#"
                       class="read-link"
                       onclick="openStory(${stories.indexOf(story)})">

                        Continue Reading →

                    </a>

                </div>

            `;

        });

    }

}