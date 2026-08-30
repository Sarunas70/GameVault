const defaultCollectionImage = "images/default-collection.jpg";
const storageKey = "gameVaultCollections";

const defaultCollections = [
    {
        id: 1,
        title: "Competitive Games",
        description: "Games focused on online competitive play.",
        totalGames: 3,
        image: defaultCollectionImage
    },
    {
        id: 2,
        title: "Racing Games",
        description: "Driving and racing games.",
        totalGames: 2,
        image: defaultCollectionImage
    },
    {
        id: 3,
        title: "Open-World Games",
        description: "Games with large worlds to explore.",
        totalGames: 4,
        image: defaultCollectionImage
    }
];

let collections = loadCollections();
let selectedCollectionImage = defaultCollectionImage;
let collectionBeingEdited = null;
let searchTerm = "";
let sortOption = "default";

function loadCollections() {
    const savedCollections = localStorage.getItem(storageKey);

    if (!savedCollections) {
        return defaultCollections;
    }

    return JSON.parse(savedCollections);
}

function saveCollections() {
    localStorage.setItem(storageKey, JSON.stringify(collections));
}

function getVisibleCollections() {
    const filteredCollections = collections.filter((collection) => {
        const searchableText = `
            ${collection.title}
            ${collection.description}
        `.toLowerCase();

        return searchableText.includes(searchTerm.toLowerCase());
    });

    return [...filteredCollections].sort((firstCollection, secondCollection) => {
        if (sortOption === "title-ascending") {
            return firstCollection.title.localeCompare(secondCollection.title);
        }

        if (sortOption === "title-descending") {
            return secondCollection.title.localeCompare(firstCollection.title);
        }

        if (sortOption === "most-games") {
            return secondCollection.totalGames - firstCollection.totalGames;
        }

        if (sortOption === "least-games") {
            return firstCollection.totalGames - secondCollection.totalGames;
        }

        return 0;
    });
}

function displayCollections() {
    const collectionList = document.querySelector("#collection-list");
    const collectionTotal = document.querySelector("#collection-total");

    collectionTotal.textContent =
        `${collections.length} collection${collections.length === 1 ? "" : "s"}`;

    const visibleCollections = getVisibleCollections();

    if (visibleCollections.length === 0) {
        const emptyMessage = collections.length === 0
            ? "You have not created any collections yet."
            : "No collections match your search.";

        collectionList.innerHTML = `
            <p class="empty-message">
                ${emptyMessage}
            </p>
        `;

        return;
    }

    collectionList.innerHTML = visibleCollections
        .map((collection) => {
            return `
                <article class="collection-card">
                    <img
                        src="${collection.image || defaultCollectionImage}"
                        alt="${collection.title} collection image"
                        class="collection-card-image"
                    >

                    <div class="collection-card-content">
                        <p class="collection-type">Game collection</p>

                        <h3>${collection.title}</h3>

                        <p>${collection.description}</p>

                        <p class="game-total">
                            ${collection.totalGames} games
                        </p>
                    </div>

                    <div class="collection-card-actions">
                        <a
                            class="button small-button"
                            href="collection-details.html?id=${collection.id}"
                        >
                            Open collection
                        </a>

                        <button
                            class="edit-image-button"
                            type="button"
                            data-collection-id="${collection.id}"
                        >
                            Change image
                        </button>

                        <button
                            class="delete-button"
                            type="button"
                            data-collection-id="${collection.id}"
                        >
                            Delete
                        </button>
                    </div>
                </article>
            `;
        })
        .join("");

    addCollectionActionListeners();
}

function addCollectionActionListeners() {
    const deleteButtons = document.querySelectorAll(".delete-button");
    const editImageButtons = document.querySelectorAll(".edit-image-button");

    deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const collectionId = Number(button.dataset.collectionId);

            const collectionIndex = collections.findIndex((collection) => {
                return collection.id === collectionId;
            });

            if (collectionIndex !== -1) {
                collections.splice(collectionIndex, 1);

                saveCollections();
                displayCollections();
            }
        });
    });

    editImageButtons.forEach((button) => {
        button.addEventListener("click", () => {
            collectionBeingEdited = Number(button.dataset.collectionId);

            const imageInput = document.querySelector("#change-image-input");
            imageInput.click();
        });
    });
}

function previewCollectionImage(event) {
    const imageFile = event.target.files[0];
    const imagePreview = document.querySelector("#collection-image-preview");

    if (!imageFile) {
        selectedCollectionImage = defaultCollectionImage;
        imagePreview.src = defaultCollectionImage;
        return;
    }

    const fileReader = new FileReader();

    fileReader.addEventListener("load", () => {
        selectedCollectionImage = fileReader.result;
        imagePreview.src = selectedCollectionImage;
    });

    fileReader.readAsDataURL(imageFile);
}

function changeCollectionImage(event) {
    const imageFile = event.target.files[0];

    if (!imageFile || collectionBeingEdited === null) {
        return;
    }

    const fileReader = new FileReader();

    fileReader.addEventListener("load", () => {
        const collection = collections.find((currentCollection) => {
            return currentCollection.id === collectionBeingEdited;
        });

        if (!collection) {
            return;
        }

        collection.image = fileReader.result;

        saveCollections();
        displayCollections();

        collectionBeingEdited = null;
        event.target.value = "";
    });

    fileReader.readAsDataURL(imageFile);
}

function addCollection(event) {
    event.preventDefault();

    const titleInput = document.querySelector("#collection-title");
    const descriptionInput = document.querySelector("#collection-description");
    const imagePreview = document.querySelector("#collection-image-preview");

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    if (title === "") {
        return;
    }

    collections.push({
        id: Date.now(),
        title: title,
        description: description || "No description provided.",
        totalGames: 0,
        image: selectedCollectionImage
    });

    saveCollections();

    event.target.reset();

    selectedCollectionImage = defaultCollectionImage;
    imagePreview.src = defaultCollectionImage;

    displayCollections();
}

const collectionForm = document.querySelector("#collection-form");
const collectionImageInput = document.querySelector("#collection-image");
const changeImageInput = document.querySelector("#change-image-input");
const searchInput = document.querySelector("#collection-search");
const sortSelect = document.querySelector("#collection-sort");

collectionForm.addEventListener("submit", addCollection);
collectionImageInput.addEventListener("change", previewCollectionImage);
changeImageInput.addEventListener("change", changeCollectionImage);

searchInput.addEventListener("input", (event) => {
    searchTerm = event.target.value.trim();
    displayCollections();
});

sortSelect.addEventListener("change", (event) => {
    sortOption = event.target.value;
    displayCollections();
});

displayCollections();