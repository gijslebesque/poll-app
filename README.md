## General description

This application was made for a technical assessment. The core fucntionality of the applicatiion allows users to make and take polls with a minumum of 2 and maximum of 10 questions per poll. Users are able to edit the polls and the votes can be set back to 0.

Since the assignment stated that the application should function without backend, there is a very rudimental (front-end) login system. If a user creates a poll without logging in, the poll will be created under an 'anonymous' account. Polls created by Anonymous users can be editted by anyone. Polls created by 'logged in' users can be edited only by their creators.

## Technology

The assignment states that the application should be a single page application (SPA). Therefore the decision was made to use React.js - an open source JavaScript library - which is modular by design, fast, scalable, and simple. Updating and manipulating the DOM is one of the biggest bottlenecks in terms of performance. To circumvent this, React uses a virtual DOM - an in memory copy of the DOM - in order to find the best way to apply changes in the DOM. Because React is modular it will make future support and scaling up the application quick and cost efficient.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

"The purpose of this assignment is to assess the level of maturity of the candidate and how the candidate manages the internal state of an application and the interactions between components". Therefore, the decision was made not to use a state management container like redux. The reasons for this are: Firstly, redux will add abstraction to the project, which makes sense if the scale of the application would be larger, but for a small application this added abstraction doesn't benefit the development process. Secondly, since the assessment will be evaluated on how components interact with one another, using regular methods for updating the application's state (e.g. lifting up state), and the built in React Hooks API allows me to display my code proficiency better than a state management library.

In terms of styling the application, SASS was selected, which reduces the amount of unescessary code duplication and allows for additional functionality on top of CSS. Additionally, the third party CSS framework Bulma is used in order to make an appealing and modern user interface. Since most webtrafick is on mobile devices, Bulma adopts a mobile first design. Because of Bulma the need for custom css is minimalised and the application still is responsive.

In order to properly assess whether the application is stable, Jest and Enzyme were intergrated into the build which allowed me to conduct unit tests. The test are developed from a user centrin point of view. So every representational component (components that only care for visual UI elements), is tested with a snapshot. A snapshot allows to quickly see changes in the output of a component. Moreover, routing is tested and the most important user interaction.

The assessment stated that a chart needs to be implemented for users to see the amount of votes a poll has. The third party library recharts was chosen for the functionality. The reason using this specific library is that it is very popular (by the time of writting it has 211,634 downloads per week), which implies trust from the community. Moreover, since it's easy to use and leightweighted.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
