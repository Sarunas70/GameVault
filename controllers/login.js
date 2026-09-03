'use strict';

const login = {
    index(request, response) {
        response.render('login', {
            title: 'Login | GameVault'
        });
    }
};

export default login;