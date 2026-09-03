'use strict';

import path from 'path';
import { fileURLToPath } from 'url';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectoryPath = path.dirname(currentFilePath);

const dashboard = {
    createView(request, response) {
        response.sendFile(
            path.join(currentDirectoryPath, '../dashboard.html')
        );
    }
};

export default dashboard;