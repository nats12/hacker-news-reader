# Hacker News Reader

Doist Front-End Developer Test Project - a news reader leveraging the [Hacker News API](https://github.com/HackerNews/API) to show users the latest news stories.

This is a fully responsive mobile-first React web app with offline capabilities!

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

The app will run on [localhost:5000](http://localhost:5000/). 

On first load, please duplicate the tab and close the existing one before setting the network to offline as the "default behaviour is to conservatively keep the updated service worker in the "waiting" state. This means that users will end up seeing older content until they close their existing, open tabs" - [CRA docs](https://create-react-app.dev/docs/making-a-progressive-web-app/#offline-first-considerations)

After setting to offline on the new tab and reloading the page, stories will be served from the cache. 

## Tools used
- [create-react-app](https://create-react-app.dev/docs/making-a-progressive-web-app/) (using its progressive web app template)

## Additional Dependencies (not inluded with Create-React-App)

- [styled-components](https://styled-components.com/docs): CSS-in-JS
- [react-infinite-scroll-component](https://react-infinite-scroll-component.netlify.app/?path=/story/*): inifite scrolling
- [moment](https://momentjs.com/): for date and time manipulation

### Dev Dependencies 
- [enzyme & enzyme-adapter-react-16](https://enzymejs.github.io/enzyme/): for testing with Jest
- [Husky](https://typicode.github.io/husky/#/): pre-commit hooks
- [Prettier](https://prettier.io/): code formatting

# Note :
**Some extensions will have an impact on Lighthouse ratings. For accurate readings, try generating reports in incognito mode.**