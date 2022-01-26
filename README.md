# React Google Login

* Tech: React + Typescript + NodeJS + Express + Google Auth

## Summary

Create a simple React App to Login with Google Account.

- Save login data in `localStorage` to remember user login
- Create backend API using `node` and `express` to authenticate user
- Publish on heroku and test it on Production

### Getting Started

- create an App on Google Cloud Platform
- using React & Bootstrap to build Frontend
- using NodeJS & Express to build Backend
- create an Account on Heroku and Publish

#### Google Cloud Platform

- Login to Google
- Go to https://console.cloud.google.com
- Create a project & Configure consent screen
  - User Type: Extenal
  - Add `Project Name` and `Developer Contact`
- Create an `API Credential` with `Oauth Client ID`, selecting `Web Application`
  - add Authorized JavaScript origins for `Web Application`
      - http://localhost:3000
      - https://react-google-login.herokuapp.com/
- Craete `.env` file and save it as `REACT_APP_CLIENT_ID`

#### Frontend: React & Bootstrap

- crate a React project with typescript tample
  ```node
    npx create-react-app react-google-login --template typescript
  ```
- import packages (bootstrap)
  ```node
    npm install react-bootstrap bootstrap --save
  ```
- edit App.js
  - use React Bootstrap to build layout
- define loginData state hook, read data from localStorage
- check loginData and render content
  - if loginData is null render `GoogleLogin` component
  - if loginData isn't null render you are logged in message
- implement function `handleSuccess`, `handleLogout`, `handleFailure`

#### Backend: NodeJS & Express

- install packages
  ```node
    npm install -save express dotenv google-auth-library
  ```
- create `server/index.js` file
- define `dotenv` and `client` in `server/index.js`
  ```node
    const dotenv = require('dotenv');
    const path = require('path');
    const { OAuth2Client } = require('google-auth-library');
  ```
- config `express` server
  ```node
    const express = require('express');
    ...
    use express.json()
    define app.post('/api/google-auth', ...
    define app.listen
  ```
- *need to add `proxy` in `package.json`, it allows FE request to push data into backend
  ```node
    "proxy": "http://127.0.0.1:5000/"
  ```

#### ENV: .env

```node
REACT_APP_CLIENT_ID=googleid-uuid.apps.googleusercontent.com
```

#### Heroku: config and publish

- Create Procfile and add `web: node server/index.js`
- Add config in backend server
  ```node
    app.use(express.static(path.join(__dirname, '..', 'build')));
    app.get('*', (req, res) =>
      res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
    );
  ```
- Publish to Github
- Create an account on `heroku` and connect it with Github repo
- Config Vars https://dashboard.heroku.com/apps/{app-name}/settings
  - key: REACT_APP_CLIENT_ID
  - value: Google app #{client_id}
- Manual deploy: Deploy a GitHub branch

#### License

Copyright © 2022-01 Encore Shao. See LICENSE for details.