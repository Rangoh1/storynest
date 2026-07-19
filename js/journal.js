const stories =
    JSON.parse(localStorage.getItem("stories")) || [];

const currentUser =
    JSON.parse(localStorage.getItem("storynestUser"));

const journalContainer =
    document.getElementById("journalStories");

const journalStories = stories.filter(story =>
    story.author === currentUser.alias &&
    story.status === "journal"
);

if (journalStories.length === 0) {

    journalContainer.innerHTML =
        "<p>No journal stories yet.</p>";

}
else {

    journalContainer.innerHTML = "";

    journalStories.forEach(story => {

    journalContainer.innerHTML += `

    <div class="journal-story">

        <h3>${story.title}</h3>

        <p>${story.category}</p>

        <small>${story.time}</small>

        <div class="story-actions">

            <button
                class="publish-story-btn"
                onclick="publishStory(${stories.indexOf(story)})">

                🌍 Publish Again

            </button>

            <button
                class="delete-story-btn"
                onclick="deleteStory(${stories.indexOf(story)})">

                🗑 Delete

            </button>

        </div>

    </div>

`;
    });

}

function publishStory(index){

    const stories =
        JSON.parse(localStorage.getItem("stories")) || [];

    stories[index].status = "public";

    localStorage.setItem(
        "stories",
        JSON.stringify(stories)
    );

    location.reload();

}

function deleteStory(index){

    const confirmed = confirm(

        "Delete this story permanently?\n\nThis action cannot be undone."

    );

    if(!confirmed){

        return;

    }

    const stories =
        JSON.parse(localStorage.getItem("stories")) || [];

    stories.splice(index, 1);

    localStorage.setItem(
        "stories",
        JSON.stringify(stories)
    );

    location.reload();

}