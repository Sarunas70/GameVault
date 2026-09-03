const storageKey = "gameVaultCollections";

const gameStorageKey = "gameVaultGames";

const urlParameters = new URLSearchParams(window.location.search);
const collectionId = Number(urlParameters.get("id"));

const collections = JSON.parse(
    localStorage.getItem(storageKey) || "[]"
);

const gamesByCollection = JSON.parse(
    localStorage.getItem(gameStorageKey) || "{}"
);

const collection = collections.find((currentCollection) => {
    return currentCollection.id === collectionId;
});

const collectionTitle = document.querySelector("#collection-title");
const collectionDescription = document.querySelector("#collection-description");
const gameTotal = document.querySelector("#game-total");
const gameList = document.querySelector("#game-list");
const gameForm = document.querySelector("#game-form");

if (!collection) {
    collectionTitle.textContent = "Collection not found";
    collectionDescription.textContent =
        "The requested game collection could not be found.";
    gameTotal.textContent = "0 games";
    gameList.innerHTML = `
        <p class="empty-message">
            This collection does not exist.
        </p>
    `;
} else {
    collectionTitle.textContent = collection.title;
    collectionDescription.textContent = collection.description;

    displayGames();
}

function getGames() {
    return gamesByCollection[collectionId] || [];
}

function saveGames(games) {
    gamesByCollection[collectionId] = games;
    localStorage.setItem(gameStorageKey, JSON.stringify(gamesByCollection));
}

function displayGames() {
    const games = getGames();

    gameTotal.textContent =
        `${games.length} game${games.length === 1 ? "" : "s"}`;

    if (games.length === 0) {
        gameList.innerHTML = `
            <p class="empty-message">
                No games have been added to this collection yet.
            </p>
        `;

        return;
    }

    gameList.innerHTML = games
        .map((game) => {
            return `
                <article class="game-card">
                    <div class="game-card-content">
                        <p class="collection-type">${game.genre}</p>

                        <h3>${game.title}</h3>

                        <p>Platform: ${game.platform}</p>

                        <p>Rating: ${game.rating}/10</p>
                    </div>

                    <button
                        class="delete-game-button"
                        type="button"
                        data-game-id="${game.id}"
                    >
                        Delete
                    </button>
                </article>
            `;
        })
        .join("");

    addDeleteListeners();
}

function addDeleteListeners() {
    const deleteButtons = document.querySelectorAll(".delete-game-button");

    deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const gameId = Number(button.dataset.gameId);
            const games = getGames();

            const updatedGames = games.filter((game) => {
                return game.id !== gameId;
            });

            saveGames(updatedGames);
            displayGames();
        });
    });
}

function addGame(event) {
    event.preventDefault();

    if (!collection) {
        return;
    }

    const gameTitleInput = document.querySelector("#game-title");
    const gameGenreInput = document.querySelector("#game-genre");
    const gamePlatformInput = document.querySelector("#game-platform");
    const gameRatingInput = document.querySelector("#game-rating");

    const gameTitle = gameTitleInput.value.trim();
    const gameGenre = gameGenreInput.value.trim();
    const gamePlatform = gamePlatformInput.value.trim();
    const gameRating = Number(gameRatingInput.value);

    if (
        gameTitle === "" ||
        gameGenre === "" ||
        gamePlatform === "" ||
        Number.isNaN(gameRating)
    ) {
        return;
    }

    const games = getGames();

    games.push({
        id: Date.now(),
        title: gameTitle,
        genre: gameGenre,
        platform: gamePlatform,
        rating: gameRating
    });

    saveGames(games);

    gameForm.reset();

    displayGames();
}

if (gameForm) {
    gameForm.addEventListener("submit", addGame);
}