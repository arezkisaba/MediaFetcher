import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with Swagger',
      version: '1.0.0',
      description: 'A simple Express API application with Swagger documentation',
    },
    servers: [
      {
        url: 'http://localhost:4445',
      },
    ],
    components: {
      schemas: {
        GetTorrentSearchResultResponse: {
          type: 'object',
          properties: {
            Title: {
              type: 'string',
              description: 'The title of the torrent',
            },
            Size: {
              type: 'string',
              description: 'The size of the torrent',
            },
            Seeders: {
              type: 'number',
              description: 'The seeders count of the torrent',
            },
            Leechers: {
              type: 'number',
              description: 'The leechers count of the torrent',
            },
            PageLink: {
              type: 'string',
              description: 'The link to the page where the torrent was found',
            },
          },
        },
        GetTorrentDownloadResponse: {
          type: 'object',
          properties: {
            Name: {
              type: 'string',
              description: 'The name of the torrent',
            },
            PageLink: {
              type: 'string',
              description: 'The link to the page where the torrent was downloaded from',
            },
            Progress: {
              type: 'number',
              description: 'The progress of the download in percent',
            },
          },
        },
        AddTorrentDownloadRequest: {
          type: 'object',
          properties: {
            PageLink: {
              type: 'string',
              description: 'The link to the page where the torrent was downloaded from',
            }
          },
          required: ['PageLink'],
        }
      },
    },
  },
  apis: ['./src/**/routes/*.ts'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
