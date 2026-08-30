const defaultCollectionImage = "images/default-collection.jpg";

const collections = [
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

let selectedCollectionImage = defaultCollectionImage;

function displayCollections() {
    const collectionList = document.querySelector("#collection-list");
    const collectionTotal = document.querySelector("#collection-total");

    collectionTotal.textContent =
        `${collections.length} collection${collections.length === 1 ? "" : "s"}`;

    if (collections.length === 0) {
        collectionList.innerHTML = `
            <p class="empty-message">
                You have not created any collections yet.
            </p>
        `;

        return;
    }

    collectionList.innerHTML = collections
        .map((collection) => {
            return `
                <article class="collection-card">
                    <img
                        src="${collection.image}"
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

    addDeleteListeners();
}

function addDeleteListeners() {
    const deleteButtons = document.querySelectorAll(".delete-button");

    deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const collectionId = Number(button.dataset.collectionId);

            const collectionIndex = collections.findIndex((collection) => {
                return collection.id === collectionId;
            });

            if (collectionIndex !== -1) {
                collections.splice(collectionIndex, 1);
                displayCollections();
            }
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

    event.target.reset();

    selectedCollectionImage = defaultCollectionImage;
    imagePreview.src = defaultCollectionImage;

    displayCollections();
}

const collectionForm = document.querySelector("#collection-form");
const collectionImageInput = document.querySelector("#collection-image");

collectionForm.addEventListener("submit", addCollection);
collectionImageInput.addEventListener("change", previewCollectionImage);

displayCollections();