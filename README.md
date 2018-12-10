# TV Dashboard

A small server to run a web based dashboard to broadcast on your team area's TV.

-   **Jira slides:** The app can fetch Jira filters and show the resulting records on the slides. Two options are available: showing one record per slide (`single` mode) or a list of records on one slide (`list` mode). This can be controlled in the configuration file.
-   **Gitlab slides:** The app can fetch merge requests on a given Gitlab project and server instance. It will show the open merge requests as a list on one or multiple slides.
-   **Time based slides:** The app can also show specific time based events such as team stand up and lunch time. A countdown will be displayed on the screen.

## Setup

The project uses `node.js` and `npm`.
Execute `npm install` to retrieve all dependencies.

## Configuration

The configuration is done by passing a configuration Javascript file (ES6) to the interactive prompt (or by argument).

The configuration file may override any value defined in `server/config.js`.

A sample configuration file is provided in the top level `config` directory.

## Development

To start the development server, you must separately start the UI single page app dev server and the node.js backend:

1. Execute `npm run start:dev` to start the React.JS dev server at `localhost:3000`.

2. Execute `npm run start` to start the node.js backend.

## Build & Start

To start the production version of the server, you must first build the single page app with `npm run build`.

Then, you can start the node.js server with `npm run start`. The website will be available at `localhost:8000`. This can be changed in the configuration file by overriding the default values.

---

By Matthieu Di Berardino
