# Monorail TV

Monorail's team exclusive TV broadcast.

## Setup

The project uses node.js and npm. Execute `npm install` to retrieve all dependencies.

## Development

To start the development server, you must separately start the UI single page app dev server and the node.js backend:

1. Execute `npm run start:dev` to start the React.JS dev server at `localhost:3000`.

2. Execute `npm run start` to start the node.js backend.

## Build & start

To start the production version of the server, you must first build the single page app with `npm run build`.

Then, you can start the node.js server with `npm run start`. The website will be available at `localhost:8000`.