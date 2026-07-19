const stories =
    JSON.parse(localStorage.getItem("stories")) || [];

const storyIndex =
    localStorage.getItem("editingStory");

const story = stories[storyIndex];

document.getElementById("editTitle").value =
    story.title;

document.getElementById("editCategory").value =
    story.category;

document.getElementById("editContent").value =
    story.content;

    const editStoryForm =
    document.getElementById("editStoryForm");

editStoryForm.addEventListener("submit", function(event){

    event.preventDefault();

    stories[storyIndex].title =
        document.getElementById("editTitle").value;

    stories[storyIndex].category =
        document.getElementById("editCategory").value;

    stories[storyIndex].content =
        document.getElementById("editContent").value;

    localStorage.setItem(
        "stories",
        JSON.stringify(stories)
    );

    alert("Story updated successfully!");

    window.location.href =
        "../pages/profile.html";

});