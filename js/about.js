const appCollections = [
    {
        title: "Competitive Games",
        totalGames: 3
    },
    {
        title: "Racing Games",
        totalGames: 2
    },
    {
        title: "Open-World Games",
        totalGames: 4
    }
];

const totalUsers = 1;

function updateAboutStatistics() {
    const totalCollections = appCollections.length;

    const totalGames = appCollections.reduce((total, collection) => {
        return total + collection.totalGames;
    }, 0);

    const averageGames = totalCollections === 0
        ? 0
        : (totalGames / totalCollections).toFixed(1);

    document.querySelector("#total-users").textContent = totalUsers;
    document.querySelector("#total-collections").textContent = totalCollections;
    document.querySelector("#total-games").textContent = totalGames;
    document.querySelector("#average-games").textContent = averageGames;

    if (totalCollections === 0) {
        document.querySelector("#largest-collection").textContent = "No collections";
        document.querySelector("#smallest-collection").textContent = "No collections";

        document.querySelector("#largest-collection-info").textContent =
            "Add a collection to view statistics.";

        document.querySelector("#smallest-collection-info").textContent =
            "Add a collection to view statistics.";

        return;
    }

    const largestCollection = [...appCollections].sort((firstCollection, secondCollection) => {
        return secondCollection.totalGames - firstCollection.totalGames;
    })[0];

    const smallestCollection = [...appCollections].sort((firstCollection, secondCollection) => {
        return firstCollection.totalGames - secondCollection.totalGames;
    })[0];

    document.querySelector("#largest-collection").textContent =
        largestCollection.title;

    document.querySelector("#largest-collection-info").textContent =
        `${largestCollection.totalGames} games in this collection`;

    document.querySelector("#smallest-collection").textContent =
        smallestCollection.title;

    document.querySelector("#smallest-collection-info").textContent =
        `${smallestCollection.totalGames} games in this collection`;
}

updateAboutStatistics();