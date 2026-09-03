'use strict';

import path from 'path';
import { fileURLToPath } from 'url';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectoryPath = path.dirname(currentFilePath);

const login = {
    createView(request, response) {
        response.sendFile(
            path.join(currentDirectoryPath, '../login.html')
        );
    }
};

export default login;