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

        comments.forEach(comment => {

            commentsContainer.innerHTML += `
                <div class="comment-card">
                    <strong>${comment.author}</strong>
                    <p>${comment.text}</p>
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

        stories[selectedStory].comments.push({
            author: "You",
            text: text
        });

        localStorage.setItem("stories", JSON.stringify(stories));

        commentInput.value = "";

        loadComments();

    });

}