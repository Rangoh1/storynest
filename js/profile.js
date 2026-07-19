const currentUser =
    JSON.parse(localStorage.getItem("storynestUser"));

const stories =
    JSON.parse(localStorage.getItem("stories")) || [];

if (currentUser) {

    document.getElementById("profileAlias").textContent =
        currentUser.alias;

}

document.getElementById("profileJoined").textContent =
    "Member of StoryNest";

const myStories = stories.filter(story =>
    story.author === currentUser.alias &&
    story.status === "public"
);

document.getElementById("storyCount").textContent =
    myStories.length;

    const userStories =
    document.getElementById("userStories");

myStories.forEach(story => {

  userStories.innerHTML += `

    <div class="user-story">

        <h3>${story.title}</h3>

        <p>${story.category}</p>

        <small>

            ❤️ ${story.likes}
            &nbsp;&nbsp;
            👁️ ${story.views}

        </small>

        <div class="story-actions">

        <button
    class="edit-story-btn"
    onclick="editStory(${stories.indexOf(story)})">

    ✏️ Edit

</button>

    <button
        class="journal-story-btn"
        onclick="moveToJournal(${stories.indexOf(story)})">

        📔 Journal

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

let totalLikes = 0;

myStories.forEach(story => {

    totalLikes += story.likes;

});

document.getElementById("likesCount").textContent =
    totalLikes;

    let totalComments = 0;

myStories.forEach(story => {

    if (story.comments && Array.isArray(story.comments)) {

        totalComments += story.comments.length;

    }

});

document.getElementById("commentsCount").textContent =
    totalComments;

 function moveToJournal(index){

    const stories =
        JSON.parse(localStorage.getItem("stories")) || [];

    stories[index].status = "journal";

    localStorage.setItem(
        "stories",
        JSON.stringify(stories)
    );

    location.reload();

}

function editStory(index){

    localStorage.setItem(
        "editingStory",
        index
    );

    window.location.href =
        "../pages/edit-story.html";

}