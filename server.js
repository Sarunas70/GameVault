'use strict';

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs';

import routes from './routes.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`GameVault is running at http://localhost:${port}`);
});