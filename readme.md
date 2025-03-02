# Corpus of Place Representations (COPR) / copr-api

COPR /ˈkɒp.ər/ is the Corpus of Place Representations, a collection of semantically annotated place representations that are made available for research. It is run by the Space &amp; Place LAB, currently located at the University of Salzburg.

The COPR API privides easy-to-use libraries to access data from the [Corpus of Place Representations (COPR)](https://copr.space-and-place.net).  These libraries are currently available for Javascript and Python.

Website: [https://copr.space-and-place.net](https://copr.space-and-place.net)

## Project structure

| Package               | Type                                                                     | Purpose                                                                     |
| --------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| `copr-additional`     | local                                                                    | all data occuring during the development and maintanance of COPR            |
| `copr-admin`          | (repo)[https://gitea.franz-benjamin.net/franz-benjamin/copr-admin]       | administration of the COPR project                                          |
| `copr-api`            | (repo)[https://gitea.franz-benjamin.net/franz-benjamin/copr-api]         | API to COPR data                                                            |
| `copr-orchestrate`    | (repo)[https://gitea.franz-benjamin.net/franz-benjamin/copr-orchestrate] | automized coordination and synchronization of metadata between the packages |
| `copr-data`           | (repo)[https://gitea.franz-benjamin.net/franz-benjamin/copr-data]        | COPR data (production)                                                      |
| `copr-data-dev`       | (repo)[https://gitea.franz-benjamin.net/franz-benjamin/copr-data-dev]    | COPR data (development)                                                     |
| `copr-data-documents` | (repo)[https://gitea.franz-benjamin.net/franz-benjamin/copr-documents]   | documents for the various place representations, published on Zenodo        |
| `copr-documentation`  | local                                                                    | documentation related to COPR, such as the manual                           |
| `copr-www`            | (repo)[https://gitea.franz-benjamin.net/franz-benjamin/copr-www]         | website including the editor                                                |

## Installation

To install and build the libraries, you will need [Node.js](https://nodejs.org) and [Yarn](https://yarnpkg.com) as well as [Python3](https://www.python.org) and [pip](https://pip.pypa.io).  Then, run
```bash
yarn install
yarn build
```

You can test the libraries by running
```bash
yarn test
```

The commands `install`, `build`, `watch`, `test`, and possibly some further ones are provided individually for each library.

## Installation: copr.js

To install and build the library, you will need [Node.js](https://nodejs.org) and [Yarn](https://yarnpkg.com).  To install the production version, run
```bash
yarn add copr.js # add package from npm to a your project
```

Alternatively, you can install the local version included in this repository by running
```bash
cd copr.js
yarn install
yarn build # build for production
yarn watch # build for development
```

## Installation: copr.py

To install the package, you will need [Python3](https://www.python.org) and [pip](https://pip.pypa.io).  To install the production version, run
```bash
pip3 install copr.py # install package from PyPI
```

Alternatively, you can install the local version included in this repository by running
```bash
cd copr.py
yarn run install # install for production
yarn run install:dev # install for development (with tests)
```
or alternatively
```bash
cd copr.py
pip3 install . # install for production
pip3 install -e . # install for development
```

You can test the package by installing the corresponding dependencies
```bash
pip3 install .[test] # local
pip3 install copr[test] # from PyPI
```
and then running
```bash
pytest --verbose
```

## Usage

For further information, see [https://copr.space-and-place.net](https://copr.space-and-place.net).

## Authorship and License

This application is written and maintained by Franz-Benjamin Mocnik, <mail@space-and-place.net>.

The code is licensed under the [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
