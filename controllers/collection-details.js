'use strict';

import collectionStore from '../models/collection-store.js';

const collectionDetails = {
    async index(request, response) {
        const collectionId = request.params.id;

        const collection = await collectionStore.getCollection(collectionId);

        response.render('collection-details', {
            title: collection
                ? `${collection.title} | GameVault`
                : 'Collection not found | GameVault',
            collection
        });
    },

    async addGame(request, response) {
        const collectionId = request.params.id;

        const game = {
            title: request.body.title.trim(),
            genre: request.body.genre.trim(),
            platform: request.body.platform.trim(),
            rating: Number(request.body.rating)
        };

        const added = await collectionStore.addGame(collectionId, game);

        if (!added) {
            return response.status(404).render('collection-details', {
                title: 'Collection not found | GameVault',
                collection: null
            });
        }

        response.redirect(`/collection/${collectionId}`);
    }
};

export default collectionDetails;