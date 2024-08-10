const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'E-commerce api',
            version: '1.0.0',
            description: 'A E-commerce  API project',
        },
        servers: [
            {
                url: 'http://localhost:4000', 
            },
        ],
    },
    apis: ['./routs/*.js'], // المسار إلى ملفات المسارات في مشروعك
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
