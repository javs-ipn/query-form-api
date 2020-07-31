import * as path from 'path';

import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';

import { env } from '../env';

export const spectacleLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {
        const expressApp = settings.getData('express_app');
        const sendFile = (request, response, next, fileName, filePath) => {
            response.sendFile(fileName, {
                root: path.join(__dirname, filePath),
            });
        };

        expressApp.use(env.spectacle.route, (request, response, next) => {
            sendFile(request, response, next, 'index.html', './../../public');
        });

        expressApp.use('/stylesheets/foundation.min.css', (request, response, next) => {
            sendFile(request, response, next, 'foundation.min.css', './../../public/stylesheets');
        });

        expressApp.use('/stylesheets/spectacle.min.css', (request, response, next) => {
            sendFile(request, response, next, 'spectacle.min.css', './../../public/stylesheets');
        });

        expressApp.use('/images/ccalogo.png', (request, response, next) => {
            sendFile(request, response, next, 'ccalogo.png', './../../public/images');
        });

        expressApp.use('/javascripts/spectacle.min.js', (request, response, next) => {
            sendFile(request, response, next, 'spectacle.min.js', './../../public/javascripts');
        });
    }
};
