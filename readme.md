# Corpus of Place Representations (COPR) API

The COPR API privides easy-to-use libraries to access data from the [Corpus of Place Representations](https://purl.archive.org/copr).  These libraries are currently available for Javascript and Python.

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

To install and build the library, you will need [Node.js](https://nodejs.org) and [Yarn](https://yarnpkg.com).  Then, run
```bash
cd copr.js
yarn install
yarn build # build for production
yarn watch # build for development
```

## Installation: copr.py

To install the package, you will need [Python3](https://www.python.org) and [pip](https://pip.pypa.io).  Then, run
```bash
cd copr.py
pip3 install . # install for production
pip3 install -e . # install for development
pip3 install copr # install from PyPI
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

For further information, see [https://purl.archive.org/copr](https://purl.archive.org/copr)

For changes, read the [version history](version-history.md).

## Author

This software is written and maintained by Franz-Benjamin Mocnik, <mail@mocnik-science.net>.

Copyright by Franz-Benjamin Mocnik, 2023

## License

The code is licensed under the [CC BY-NC-ND 4.0](https://github.com/mocnik-science/copr-api/blob/master/LICENSE).
