'use strict';

import JsonStore from './json-store.js';

const appStore = {
    store: new JsonStore('./models/app-store.json', { info: {} }),

    async getAppInfo() {
        await this.store.read();

        return this.store.findAll('info');
    }
};

export default appStore;