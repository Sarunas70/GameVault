'use strict';

const about = {
    index(request, response) {
        response.render('about', {
            title: 'About | GameVault'
        });
    }
};

export default about;