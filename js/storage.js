// ===============================
// Story Storage
// ===============================

function getStories() {

    return JSON.parse(
        localStorage.getItem("stories")
    ) || [];

}

function saveStories(stories) {

    localStorage.setItem(
        "stories",
        JSON.stringify(stories)
    );

}


// ===============================
// Current User
// ===============================

function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem("storynestUser")
    );

}

function saveCurrentUser(user) {

    localStorage.setItem(
        "storynestUser",
        JSON.stringify(user)
    );

}


// ===============================
// Selected Story
// ===============================

function getSelectedStoryIndex() {

    return Number(
        localStorage.getItem("selectedStory")
    );

}

function setSelectedStoryIndex(index) {

    localStorage.setItem(
        "selectedStory",
        index
    );

}


// ===============================
// Verification
// ===============================

function getVerificationCode() {

    return localStorage.getItem(
        "verificationCode"
    );

}

function saveVerificationCode(code) {

    localStorage.setItem(
        "verificationCode",
        code
    );

}