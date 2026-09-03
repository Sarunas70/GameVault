'use strict';

import path from 'path';
import { fileURLToPath } from 'url';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectoryPath = path.dirname(currentFilePath);

const about = {
    createView(request, response) {
        response.sendFile(
            path.join(currentDirectoryPath, '../about.html')
        );
    }
};

export default about;