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

    document.getElementById("profileJoined").textContent =
    "Member of StoryNest";

    const myStories = stories.filter(story =>
    story.author === currentUser.alias
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