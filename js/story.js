// ===============================
// Story Page
// ===============================

if (document.getElementById("storyTitle")) {

const stories = getStories();

const selected = getSelectedStoryIndex();

    if (selected !== null && stories[selected]) {

        const story = stories[selected];

        // Populate story information
        document.getElementById("storyCategory").textContent =
            getCategoryName(story.category);

        document.getElementById("storyTitle").textContent =
            story.title;

        document.getElementById("storyAuthor").textContent =
            story.author;

        document.getElementById("storyTime").textContent =
            story.time;

        document.getElementById("storyViews").textContent =
            "👁️ " + story.views;

        document.getElementById("storyComments").textContent =
            "💬 " +
            (Array.isArray(story.comments)
                ? story.comments.length
                : story.comments);

        document.getElementById("storyContent").textContent =
            story.content;

        // Like button
        const likeButton = document.getElementById("storyLikes");

        if (likeButton) {

            likeButton.textContent =
                (story.liked ? "❤️ " : "🤍 ") + story.likes;

            likeButton.addEventListener("click", function () {

                story.liked = !story.liked;

                story.likes += story.liked ? 1 : -1;

                likeButton.textContent =
                    (story.liked ? "❤️ " : "🤍 ") + story.likes;

             saveStories(stories);

            });

        }

        // Save button
        const saveButton = document.getElementById("saveStory");

        if (saveButton) {

            saveButton.textContent =
                story.saved ? "✅ Saved" : "🔖 Save";

            saveButton.addEventListener("click", function () {

                story.saved = !story.saved;

                saveButton.textContent =
                    story.saved ? "✅ Saved" : "🔖 Save";

                saveStories(stories);    

            });

        }

    }

}