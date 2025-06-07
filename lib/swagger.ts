import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API LAFEG PME',
      version: '1.0.0',
      description: "Documentation de l'API REST",
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://votre-domaine.com' 
          : 'http://localhost:3000',
        description: process.env.NODE_ENV === 'production' ? 'Serveur de production' : 'Serveur de développement',
      },
    ],
  },
  tags: [
  {
    name: 'Institutions',
    description: 'Opérations liées aux institutions financières'
  },
    {
    name: 'SEA',
    description: 'Opérations liées aux SEA'
  },
  {
    name: 'Publicités',
    description: 'Opérations liées aux publicités'
  }
],
  // Les chemins vers les fichiers contenant vos routes API
  apis: ['./app/api/**/*.ts', './app/api/**/*.js','./lib/swagger-schemas.ts'],
};

const specs = swaggerJsdoc(options);

export default specs;