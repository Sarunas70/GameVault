'use strict';

import logger from '../utils/logger.js';
import appStore from '../models/app-store.js';

const start = {
    async createView(request, response) {
        logger.info('Start page loading!');

        const info = await appStore.getAppInfo();

        const viewData = {
            title: 'GameVault | Welcome',
            appTitle: info?.appTitle || 'GameVault',
            info
        };

        response.render('start', viewData);
    }
};

export default start;