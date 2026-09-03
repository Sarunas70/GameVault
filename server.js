'use strict';

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes.js';

const app = express();
const port = 3000;

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectoryPath = path.dirname(currentFilePath);

// Allows the browser to load CSS, JavaScript, images, and HTML files
app.use(express.static(currentDirectoryPath));

// Connects requests to routes.js
app.use('/', routes);

app.listen(port, () => {
    console.log(`Express app running on port ${port}!`);
});