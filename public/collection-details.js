'use strict';

import JsonStore from './json-store.js';

const collectionStore = {
    store: new JsonStore('./models/collection-store.json', {
        collections: []
    }),

    async getAllCollections() {
        await this.store.read();
        const collections = this.store.findAll('collections');

        // Normalise: ensure games array exists
        return collections.map(c => ({
            ...c,
            games: Array.isArray(c.games) ? c.games : [],
            totalGames: Array.isArray(c.games) ? c.games.length : (c.totalGames || 0)
        }));
    },

    async getCollection(id) {
        await this.store.read();
        const collections = this.store.findAll('collections');

        const collection = collections.find(c => c.id === id);
        if (!collection) return null;

        collection.games = Array.isArray(collection.games) ? collection.games : [];
        collection.totalGames = collection.games.length;

        return collection;
    },

    async addGame(collectionId, game) {
        await this.store.read();
        const collections = this.store.findAll('collections');

        const collection = collections.find(c => c.id === collectionId);
        if (!collection) return false;

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