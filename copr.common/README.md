# Corpus of Place Representations (COPR) / copr-api

COPR /ˈkɒp.ər/ is the Corpus of Place Representations, a collection of semantically annotated place representations that are made available for research. It is run by the Space &amp; Place LAB, currently located at the University of Salzburg.

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

## Authorship and License

This application is written and maintained by Franz-Benjamin Mocnik, <mail@space-and-place.net>.

The code is licensed under the [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
