const categories = [

    {
        id: "Relationships",
        name: "Relationships"
    },

    {
        id: "Family",
        name: "Family"
    },

    {
        id: "Career",
        name: "Career"
    },

    {
        id: "Business",
        name: "Business"
    },

    {
        id: "Education",
        name: "Education"
    },

    {
        id: "Health",
        name: "Health"
    },

    {
        id: "Travel",
        name: "Travel"
    },

    {
        id: "Life Lessons",
        name: "Life Lessons"
    },

    {
        id: "Dreams & Visions",
        name: "Dreams & Visions"
    },

    {
        id: "Fiction",
        name: "Fiction"
    }

];

function getCategoryById(id) {

    return categories.find(category => category.id === id);

}

function getCategoryName(id) {

    const category = getCategoryById(id);

    return category ? category.name : id;

}