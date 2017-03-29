[ ![Codeship Status for LaunchPadLab/lp-utils](https://app.codeship.com/projects/54a4f610-ec93-0134-81d5-1ac2cf405306/status?branch=master)](https://app.codeship.com/projects/208365)[![Code Climate](https://codeclimate.com/repos/58cc18b439f0e80291000106/badges/3b5fda5d0356fd73a175/gpa.svg)](https://codeclimate.com/repos/58cc18b439f0e80291000106/feed)[![Issue Count](https://codeclimate.com/repos/58cc18b439f0e80291000106/badges/3b5fda5d0356fd73a175/issue_count.svg)](https://codeclimate.com/repos/58cc18b439f0e80291000106/feed)

# LP Utils
A set of utility functions and higher order components (HOC) for use in React and Redux apps.

## Usage
Documenation and usage information can be found in [docs.md](docs.md). These docs are auto-generated from inline [JSDoc-style](http://usejsdoc.org/) comments using [documentation.js](https://github.com/documentationjs/documentation). Any changes or additions to this library should be accompanied by corresponding changes to the docs, which can be compiled using `yarn run docs`.

The original documentation may be found in [legacy-docs.md](legacy-docs.md).

## Feature Requests
For new requests, please submit an issue or PR with the label of `idea`, and include a description of the change and why it is necessary.

## Pull Requests and Deployments
Pull requests MUST be approved by someone on the team before merging into master. Once the PR is approved, but before it is merged, the implementor should bump the version according to semantic versioning with `yarn version`. Once merged, the master branch will automatically be published the newest version to NPM.

## Development
* `git clone git@github.com:LaunchPadLab/lp-utils.git`
* `yarn install`

If you are developing and want to see the results in a local client application:
* Link the local library:
  * `yarn link` in the lp-utils directory
  * `yarn link @launchpadlab/lp-utils` in the client directory
* Run the watchful build: `yarn start`

Changes will be immediately compiled and available to the client application.

## Testing
This library uses [Jest](https://facebook.github.io/jest/) for unit testing, run with `yarn run test`.

## Linting
This library uses [ESLint](http://eslint.org/) for linting, run with `yarn run lint`.
