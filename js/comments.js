// ================================
// Comments System
// ================================

const postCommentBtn = document.getElementById("postCommentBtn");

if (postCommentBtn) {

    const commentInput = document.getElementById("commentInput");
    const commentsContainer = document.getElementById("commentsContainer");

    const stories = JSON.parse(localStorage.getItem("stories")) || [];
    const selectedStory = localStorage.getItem("selectedStory");

    // Make sure the story has a comments array
    if (stories[selectedStory] && !stories[selectedStory].comments) {
        stories[selectedStory].comments = [];
    }

    // Display existing comments
    function loadComments() {

        commentsContainer.innerHTML = "";

        const comments = stories[selectedStory].comments || [];

        const storyComments = document.getElementById("storyComments");

if (storyComments) {
    storyComments.textContent = `💬 ${comments.length}`;
}

      comments.forEach((comment, index) => {

        let repliesHTML = "";

if (comment.replies) {

    comment.replies.forEach(reply => {

        repliesHTML += `

            <div class="reply-card">

                <strong>${reply.author}</strong>

                <p>${reply.text}</p>

            </div>

        `;

    });

}

            commentsContainer.innerHTML += `
            <div class="comment-card">

    <strong>${comment.author}</strong>

    <p>${comment.text}</p>

    <button class="reply-btn" onclick="showReplyBox(${index})">
     ↩ Reply
    </button>

    ${repliesHTML}

<div id="replyBox${index}"></div>

</div>    
            `;

        });

    }

    // Load comments when the page opens
    loadComments();

    // Save a new comment
    postCommentBtn.addEventListener("click", function () {

        const text = commentInput.value.trim();

        if (text === "") {
            alert("Please write a comment.");
            return;
        }

      const currentUser = JSON.parse(localStorage.getItem("storynestUser"));

stories[selectedStory].comments.push({
    author: currentUser.alias,
    text: text
});

        localStorage.setItem("stories", JSON.stringify(stories));

        commentInput.value = "";

        loadComments();

    });

}

function showReplyBox(index) {

    const replyBox = document.getElementById(`replyBox${index}`);

    replyBox.innerHTML = `

        <textarea
            id="replyInput${index}"
            placeholder="Write your reply...">
        </textarea>

        <button
            class="send-reply-btn"
            onclick="saveReply(${index})">

            Send Reply

        </button>

    `;

}

function saveReply(index) {

    const stories = JSON.parse(localStorage.getItem("stories")) || [];

    const selectedStory = localStorage.getItem("selectedStory");

    const currentUser = JSON.parse(localStorage.getItem("storynestUser"));

    const replyInput = document.getElementById(`replyInput${index}`);

    const replyText = replyInput.value.trim();

    if (replyText === "") {

        alert("Please write a reply.");

        return;

    }

    const comment = stories[selectedStory].comments[index];

    if (!comment.replies) {

        comment.replies = [];

    }

    comment.replies.push({

        author: currentUser.alias,

        text: replyText

    });

    localStorage.setItem("stories", JSON.stringify(stories));

    location.reload();

}