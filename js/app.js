const gameCollection = [
    {
        title: "Counter-Strike 2",
        genre: "First-person shooter",
        platform: "PC",
        currentPlayers: 1050000,
        image: "images/counter-strike-2.jpg"
    },
    {
        title: "Dota 2",
        genre: "Multiplayer online battle arena",
        platform: "PC",
        currentPlayers: 620000,
        image: "images/dota-2.jpg"
    },
    {
        title: "Apex Legends",
        genre: "Battle royale shooter",
        platform: "PC, Xbox, PlayStation",
        currentPlayers: 275000,
        image: "images/apex-legends.jpg"
    },
    {
        title: "Forza Horizon 5",
        genre: "Racing",
        platform: "PC, Xbox",
        currentPlayers: 45000,
        image: "images/forza-horizon-5.jpg"
    }
];

function formatPlayerCount(playerCount) {
    return new Intl.NumberFormat("en-IE").format(playerCount);
}

function getTopGames(games, numberOfGames) {
    return [...games]
        .sort((firstGame, secondGame) => {
            return secondGame.currentPlayers - firstGame.currentPlayers;
        })
        .slice(0, numberOfGames);
}

function displayTopGames() {
    const topGamesContainer = document.querySelector("#top-games");

    if (!topGamesContainer) {
        return;
    }

    const topGames = getTopGames(gameCollection, 3);

    topGamesContainer.innerHTML = topGames
        .map((game, index) => {
            return `
                <article class="game-stat-card">
                    <div class="game-rank">#${index + 1}</div>

                    <img
                        src="${game.image}"
                        alt="${game.title} cover image"
                        class="game-card-image"
                    >

                    <div class="game-card-content">
                        <h3>${game.title}</h3>

                        <p class="game-details">
                            ${game.genre} · ${game.platform}
                        </p>

                        <p class="player-count">
                            <span class="status-dot"></span>
                            ${formatPlayerCount(game.currentPlayers)}
                            players online
                        </p>
                    </div>
                </article>
            `;
        })
        .join("");
}

displayTopGames();