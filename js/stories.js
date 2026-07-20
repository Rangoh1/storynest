const stories =
    JSON.parse(localStorage.getItem("stories")) || [];

const searchBox =
    document.getElementById("searchBox");

const storiesGrid =
    document.getElementById("storiesGrid");

const publicStories = stories.filter(story =>
    story.status === "public"
);

function displayStories(storiesToDisplay){

    if(storiesToDisplay.length === 0){

        storiesGrid.innerHTML = `
            <p>No stories found.</p>
        `;

        return;

    }

    storiesGrid.innerHTML = "";

    storiesToDisplay.forEach(story => {

        const preview =
            story.content.length > 120
                ? story.content.substring(0,120) + "..."
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
                    🏷 ${story.category}
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

displayStories(publicStories);

function openStory(index){

    localStorage.setItem(
        "selectedStory",
        index
    );

}

searchBox.addEventListener("input", function(){


    const searchText =
        searchBox.value.toLowerCase().trim();

    const filteredStories =
        publicStories.filter(story =>

            story.title.toLowerCase().includes(searchText) ||

            story.content.toLowerCase().includes(searchText) ||

            story.category.toLowerCase().includes(searchText) ||

            story.author.toLowerCase().includes(searchText)

        );

    displayStories(filteredStories);

});