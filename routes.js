'use strict';

import express from 'express';

import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import login from './controllers/login.js';

const router = express.Router();

router.get('/', start.createView);
router.get('/dashboard', dashboard.createView);
router.get('/about', about.createView);
router.get('/login', login.createView);

router.get('/error', (request, response) => {
    response.status(404).end('Page not found.');
});

export default router;