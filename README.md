# Hacker News Reader

Doist Front-End Developer Test Project - a news reader leveraging the [Hacker News API](https://github.com/HackerNews/API) to show users the latest news stories.

This is a fully responsive mobile-first web app with offline capabilities!

## Setup 
- Run `npm install`

## Development Mode
- Run `npm start`

## Testing 
- Run `npm test`

## Production Mode
To test the app's offline mode, it must run on a production build. To kick off a production build and run in production mode:
- Run `npm run build`
- Run `serve -s build`

The app will run on [localhost:5000](http://localhost:5000/)

## Boilerplate
- [create-react-app](https://create-react-app.dev/docs/making-a-progressive-web-app/) (using its progressive web app template)

## Additional Dependencies (not inluded with Create-React-App)

- [styled-components](https://styled-components.com/docs): CSS-in-JS
- [react-infinite-scroll-component](https://react-infinite-scroll-component.netlify.app/?path=/story/*): inifite scrolling
- [moment](https://momentjs.com/): for date and time manipulation

### Dev Dependencies 
- [enzyme & enzyme-adapter-react-16](https://enzymejs.github.io/enzyme/): for testing with Jest
- [Husky](https://typicode.github.io/husky/#/): pre-commit hooks
- [Prettier](https://prettier.io/): code formatting