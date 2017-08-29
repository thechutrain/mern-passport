# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


## [0.0.1] - 2017-07-27
### Added
- restructured models folder to be inside db, and made a user schema

## [0.0.2] - 2017-07-27
### Added
- a route for creating a new user & works properly with the hashing


## [0.0.8] - 2017-07-27
### Changed
- changed from signing up, signing in with email to using a username

## [0.0.12] - 2017-08-07
### Changed
- proxies google OAuth callbacks correctly on the local server now
- restructured `src/` folder around pages that react-router would route to
### Added
- isLoadingHOC to wrap main router page components to not display anything during the latency of waiting for user status to come back in the state.
- spinner displays from isLoadingHOC for waiting to redirect the user

# REDUX BRANCH
## [redux_01] - 2017-08-24
### Changed
- removed previous `React/` folder and placed in `_React/`

### Added
- redux, authentication.js file that has basic actions, action creators, and reducer for managaing authentication state
- created a `userOnlyHOC` component that wraps any component and will only display if a user is logged in 

## [redux_02 & redux_03] - 2017-08-27
### Added
- added in redux-form
- incorporated a registration form that has validation
- registration form will call authentication's action creators and successfully registers a new user

## [redux_05b] - 2017-08-28
### Added
- tried to add 'react-router-redux' but will be rerouting with store's state instead
- 