
// ===============================
// Home Page
// ===============================

    const container = document.getElementById("storiesContainer");

const stories = getStories();

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
    ${getCategoryName(story.category)}
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

                    <span>💬 ${
    Array.isArray(story.comments)
        ? story.comments.length
        : story.comments
}</span>

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

