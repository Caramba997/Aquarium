# Aquarium

This project was created to keep track of the animals in an aquarium. It allows to save info about the existing animals including images.

## Architecture

- create-react-app
- Express.js API

## Environment variables

### Main directory

To run this project, a .env file with the following env variables needs to be created in the top level directory:

- MONGODB_URL="mongodb+srv://<db_name>.jx9ti.mongodb.net/?retryWrites=true&w=majority&appName=<cluster_name>"
- AWS_PUBLIC_KEY
- AWS_PRIVATE_KEY
- S3_REGION
- S3_BUCKET
- API_PORT=5000

### Main directory

In the frontend directory, a .env file with the following variable is needed:

- REACT_APP_CLOUDFRONT_URL=<cloudfront_cdn_url>

For development, a dev.env file with the following variables is needed:

- REACT_APP_CLOUDFRONT_URL=<cloudfront_cdn_url>
- REACT_APP_API_URL=http://localhost:5000

## Development

While in production the express server also serves the react app build, for development you might want to use a standalone server for react to enable live reloads etc. For this, startup the API from the main directory and the frontend from the frontend directory.

## Deploy to Heroku

This project is hosted as an Heroku app. To update the version there, make sure to push the latest changes to the Git repository and then run `git push heroku master`. This will push the files to the remote branch on Heroku, build the app and start it.

## Available Scripts

In the project directory, you can run:

### `npm start`

Starts the production version of the app using the built version of the react frontend. [http://localhost:3000](http://localhost:3000)

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Create-react-app documentation

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
