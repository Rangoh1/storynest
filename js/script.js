const stories = JSON.parse(localStorage.getItem("stories")) || [];

const trendingContainer = document.getElementById("landingTrending");

if (trendingContainer) {

    const trendingStories = [...stories]
        .sort((a, b) => b.likes - a.likes)
        .slice(0, 3);

    if (trendingStories.length === 0) {

        trendingContainer.innerHTML = `
            <p>No trending stories yet.</p>
        `;

    } else {

        trendingStories.forEach((story) => {

            trendingContainer.innerHTML += `

               <div class="story-card"
     onclick="openTrendingStory(${stories.indexOf(story)})"
     style="cursor:pointer;">

    <div class="trending-badge">
        🔥 Trending
    </div>

    <div class="story-category">
        ${story.category}
    </div>

    <h3>${story.title}</h3>

    <p>
        ${story.content.substring(0,120)}...
    </p>


</div>

            `;

        });

    }

}

function openTrendingStory(index) {

    localStorage.setItem("selectedStory", index);

    window.location.href = "pages/story.html";

}