'use strict';

import express from 'express';

import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import login from './controllers/login.js';
import collectionDetails from './controllers/collection-details.js';

const router = express.Router();

router.get('/', (request, response) => {
    return start.createView(request, response);
});

router.get('/start', (request, response) => {
    return start.createView(request, response);
});

router.get('/dashboard', (request, response) => {
    return dashboard.index(request, response);
});

router.get('/about', (request, response) => {
    return about.index(request, response);
});

router.get('/login', (request, response) => {
    return login.index(request, response);
});

router.get('/collection/:id', (request, response) => {
    return collectionDetails.index(request, response);
});

router.post('/collection/:id/addgame', (request, response) => {
    return collectionDetails.addGame(request, response);
});

export default router;