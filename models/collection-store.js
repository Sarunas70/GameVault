'use strict';

import JsonStore from './json-store.js';

const collectionStore = {
    store: new JsonStore('./models/collection-store.json', {
        collections: []
    }),

    async getAllCollections() {
        await this.store.read();

        const collections = this.store.findAll('collections');

        return collections.map((collection) => {
            if (!Array.isArray(collection.games)) {
                collection.games = [];
            }

            collection.totalGames = collection.games.length;

            return collection;
        });
    },

    async getCollection(id) {
        await this.store.read();

        const collections = this.store.findAll('collections');

        const collection = collections.find((currentCollection) => {
            return currentCollection.id === id;
        });

        if (!collection) {
            return null;
        }

        if (!Array.isArray(collection.games)) {
            collection.games = [];
        }

        collection.totalGames = collection.games.length;

        return collection;
    },

    async addGame(collectionId, game) {
        await this.store.read();

        const collections = this.store.findAll('collections');

        const collection = collections.find((currentCollection) => {
            return currentCollection.id === collectionId;
        });

        if (!collection) {
            return false;
        }

        if (!Array.isArray(collection.games)) {
            collection.games = [];
        }

        collection.games.push(game);

        collection.totalGames = collection.games.length;

        await this.store.write();

        return true;
    }
};

export default collectionStore;