const games = [
    {
        id: 1,
        title: "Counter-Strike 2",
        genre: "First-person shooter",
        platform: "PC",
        rating: 9
    },
    {
        id: 2,
        title: "Dota 2",
        genre: "Multiplayer online battle arena",
        platform: "PC",
        rating: 8
    },
    {
        id: 3,
        title: "Apex Legends",
        genre: "Battle royale shooter",
        platform: "PC, Xbox, PlayStation",
        rating: 8
    }
];

function displayGames() {
    const gameList = document.querySelector("#game-list");
    const gameTotal = document.querySelector("#game-total");

    gameTotal.textContent =
        `${games.length} game${games.length === 1 ? "" : "s"}`;

    if (games.length === 0) {
        gameList.innerHTML = `
            <p class="empty-message">
                This collection does not contain any games yet.
            </p>
        `;

        return;
    }

    gameList.innerHTML = games
        .map((game) => {
            return `
                <article class="game-item-card">
                    <div class="game-item-content">
                        <p class="collection-type">Video game</p>

                        <h3>${game.title}</h3>

                        <dl class="game-properties">
                            <div>
                                <dt>Genre</dt>
                                <dd>${game.genre}</dd>
                            </div>

                            <div>
                                <dt>Platform</dt>
                                <dd>${game.platform}</dd>
                            </div>

                            <div>
                                <dt>Rating</dt>
                                <dd>${game.rating}/10</dd>
                            </div>
                        </dl>
                    </div>

                    <div class="game-item-actions">
                        <button
                            class="edit-button"
                            type="button"
                            data-game-id="${game.id}"
                        >
                            Edit
                        </button>

                        <button
                            class="delete-button"
                            type="button"
                            data-game-id="${game.id}"
                        >
                            Delete
                        </button>
                    </div>
                </article>
            `;
        })
        .join("");

    addGameActionListeners();
}

function addGameActionListeners() {
    const deleteButtons = document.querySelectorAll(".delete-button");
    const editButtons = document.querySelectorAll(".edit-button");

    deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const gameId = Number(button.dataset.gameId);

            const gameIndex = games.findIndex((game) => {
                return game.id === gameId;
            });

            if (gameIndex !== -1) {
                games.splice(gameIndex, 1);
                displayGames();
            }
        });
    });

    editButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const gameId = Number(button.dataset.gameId);

            const gameToEdit = games.find((game) => {
                return game.id === gameId;
            });

            if (!gameToEdit) {
                return;
            }

            const newTitle = prompt("Edit game title:", gameToEdit.title);
            const newGenre = prompt("Edit genre:", gameToEdit.genre);
            const newPlatform = prompt("Edit platform:", gameToEdit.platform);
            const newRating = prompt("Edit rating out of 10:", gameToEdit.rating);

            if (
                newTitle !== null &&
                newGenre !== null &&
                newPlatform !== null &&
                newRating !== null
            ) {
                gameToEdit.title = newTitle.trim() || gameToEdit.title;
                gameToEdit.genre = newGenre.trim() || gameToEdit.genre;
                gameToEdit.platform = newPlatform.trim() || gameToEdit.platform;
                gameToEdit.rating = Number(newRating) || gameToEdit.rating;

                displayGames();
            }
        });
    });
}

function addGame(event) {
    event.preventDefault();

    const title = document.querySelector("#game-title").value.trim();
    const genre = document.querySelector("#game-genre").value.trim();
    const platform = document.querySelector("#game-platform").value.trim();
    const rating = Number(document.querySelector("#game-rating").value);

    if (title === "" || genre === "" || platform === "" || rating < 1 || rating > 10) {
        return;
    }

    games.push({
        id: Date.now(),
        title: title,
        genre: genre,
        platform: platform,
        rating: rating
    });

    event.target.reset();
    displayGames();
}

document.querySelector("#game-form").addEventListener("submit", addGame);

displayGames();