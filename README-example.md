<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: CC0-1.0
-->

# Open Data Hub Lifecycle Badge

[![REUSE Compliance](https://github.com/noi-techpark/webcomp-opendatahub-lifecycle-badge/actions/workflows/reuse.yml/badge.svg)](https://github.com/noi-techpark/odh-docs/wiki/REUSE#badges)
[![REUSE status](https://api.reuse.software/badge/github.com/noi-techpark/webcomp-opendatahub-lifecycle-badge)](https://api.reuse.software/info/github.com/noi-techpark/webcomp-opendatahub-lifecycle-badge)
[![CI/CD](https://github.com/noi-techpark/webcomp-opendatahub-lifecycle-badge/actions/workflows/main.yml/badge.svg)](https://github.com/noi-techpark/webcomp-opendatahub-lifecycle-badge/actions/workflows/main.yml)

A web component that displays a badge showing the lifecycle status of an Open Data Hub service. It covers two lifecycle modes, **R&D** and **deprecated**.

The mode is set through a single HTML attribute, and clicking the badge opens the lifecycle documentation, so users can quickly understand what the status means.

- [Open Data Hub Lifecycle Badge](#open-data-hub-lifecycle-badge)
  - [Usage](#usage)
    - [Attributes](#attributes)
      - [lifecycle](#lifecycle)
  - [Getting started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Source code](#source-code)
    - [Dependencies](#dependencies)
    - [Build](#build)
  - [Tests and linting](#tests-and-linting)
  - [Deployment](#deployment)
  - [Run with docker](#run-with-docker)
    - [Installation](#installation)
    - [Start the docker containers](#start-the-docker-containers)
    - [Publish a new version of your webcomponent](#publish-a-new-version-of-your-webcomponent)
    - [Stop the docker containers](#stop-the-docker-containers)
    - [Delete your webcomponents from the store](#delete-your-webcomponents-from-the-store)
  - [Information](#information)
    - [Support](#support)
    - [Contributing](#contributing)
    - [Documentation](#documentation)
    - [Boilerplate](#boilerplate)
    - [License](#license)
    - [REUSE](#reuse)

## Usage

Include the web component script `dist/webcomp-boilerplate.min.js` in your HTML and add the badge like this:

```html
<script src="webcomp-boilerplate.min.js"></script>

<opendatahub-lifecycle-badge lifecycle="RnD"></opendatahub-lifecycle-badge>
```

For a deprecated service:

```html
<opendatahub-lifecycle-badge lifecycle="deprecated"></opendatahub-lifecycle-badge>
```

### Attributes

#### lifecycle

The non-core lifecycle mode of the service. It determines the label shown in the badge and the section of the lifecycle documentation that is opened on click.

Type: string
Options: "RnD", "deprecated", "randd", "research", "beta", "deprecate", "deprecation"

## Getting started

These instructions will get you a copy of the project up and running
on your local machine for development and testing purposes.

### Prerequisites

To build the project, the following prerequisites must be met:

- Node 12 / NPM 6

For a ready to use Docker environment with all prerequisites already installed and prepared, you can check out the [Run with docker](#run-with-docker) section.

### Source code

Get a copy of the repository:

```bash
git clone https://github.com/noi-techpark/webcomp-opendatahub-lifecycle-badge.git
```

Change directory:

```bash
cd webcomp-opendatahub-lifecycle-badge/
```

### Dependencies

Download all dependencies:

```bash
npm install
```

### Build

Build and start the project:

```bash
npm run start
```

The application will be served and can be accessed at [http://localhost:8080](http://localhost:8080).

## Tests and linting

The tests and the linting can be executed with the following commands:

```bash
npm run test
npm run lint
```

## Deployment

To create the distributable files, execute the following command:

```bash
npm run build
```

The bundle is written to the `dist` folder as `webcomp-boilerplate.min.js`, which is the file referenced in `wcs-manifest.json`.

## Run with docker

If you want to test the webcomponent on a local instance of the [webcomponent store](https://webcomponents.opendatahub.com/) to make sure that it will run correctly also on the real store.
You can also access the webcomponent running in a simple separated docker container outside of the store.

If you have already developed your webcomponent and now want to test it on a local instance of the store, just copy `.env.example`, `docker-compose.yml`, `wcs-manifest.json` and `infrastructure/docker` into your root folder. Adjust your `package.json` and `wcs-manifest.json` files to match your webcomponent. Then follow the instructions below.

For accessing the webcomponent in a separated docker in the browser you will need a server (e.g. webpack dev-server) that is hosting a page which includes the webcomponent tag, as well as the script defining it. This page needs to be hosted on port 8080 as specified in your docker-compose file.

### Installation

Install [Docker](https://docs.docker.com/install/) (with Docker Compose) locally on your machine.

### Start the docker containers

- Create a .env file: <br>
  `cp .env.example .env`
- [Optional] Adjust port numbers in .env if they have conflicts with services already running on your machine
- Start the store with: <br>
  `docker-compose up -d`
- Wait until the containers are running. You can check the current state with: <br>
  `docker-compose logs --tail 500 -f`
- Access the store in your browser on: <br>
  `localhost:8999`
- Access webcomponent running in separated docker in your browser on: <br>
  `localhost:8998`

### Publish a new version of your webcomponent

- Increase version number WC_VERSION in your .env file
- Then run: `docker-compose up wcstore-cli`

### Stop the docker containers

- `docker-compose stop`

### Delete your webcomponents from the store

- `[sudo] rm -f workspace`
- `docker-compose rm -f -v postgres`

## Information

### Support

For support, please contact [help@opendatahub.com](mailto:help@opendatahub.com).

### Contributing

If you'd like to contribute, please follow the following instructions:

- Fork the repository.
- Checkout a topic branch from the `main` branch.
- Make sure the tests are passing.
- Create a pull request against the `main` branch.

For a more detailed description, have a look at our [Getting Started
Guide](https://github.com/noi-techpark/odh-docs/wiki/Contributor-Guidelines:-Getting-started).

### Documentation

More documentation can be found at [https://docs.opendatahub.com](https://docs.opendatahub.com).

### Boilerplate

The project uses this boilerplate: [https://github.com/noi-techpark/webcomp-boilerplate](https://github.com/noi-techpark/webcomp-boilerplate).

### License

The code in this project is licensed under the GNU AFFERO GENERAL PUBLIC LICENSE Version 3 license. See the [LICENSE.md](LICENSE.md) file for more information.

### REUSE

This project is [REUSE](https://reuse.software) compliant, more information about the usage of REUSE in NOI Techpark repositories can be found [here](https://github.com/noi-techpark/odh-docs/wiki/Guidelines-for-developers-and-licenses#guidelines-for-contributors-and-new-developers).

Since the CI for this project checks for REUSE compliance you might find it useful to use a pre-commit hook checking for REUSE compliance locally. The [pre-commit-config](.pre-commit-config.yaml) file in the repository root is already configured to check for REUSE compliance with help of the [pre-commit](https://pre-commit.com) tool.

Install the tool by running:

```bash
pip install pre-commit
```

Then install the pre-commit hook via the config file by running:

```bash
pre-commit install
```