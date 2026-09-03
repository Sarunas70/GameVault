'use strict';

import collectionStore from '../models/collection-store.js';

const dashboard = {
    async index(request, response) {
        const collections = await collectionStore.getAllCollections();

        response.render('dashboard', {
            title: 'Dashboard | GameVault',
            collections
        });
    }
};

export default dashboard;