# Code Quality Tools

We recommended to use quality tools for monitoring extension code quality.

## ESLint

How to enable ESLint:

1. Add helper script to `package.json` file
    `package.json`
    ```json
    {
      "scripts": {
        "lint": "eslint src/rontend"
      }
    }
    ```

2. Add `eslint.config.mjs` file
```js
const pleskConfig = require('@plesk/eslint-config');

module.exports = [
    pleskConfig,
];
```

3. Due to dependency bug in enzyme, add version override in your `package.json`
```  
"resolutions": {
    "cheerio": "1.0.0-rc.12"
  }
```

Now you can check your code with the following command:

```
yarn lint
```

Alternatively, you can run `yarn lint --fix` command to automatically fix all errors that ESLint can fix.

You can also enable ESLint in your PhpStorm: Settings > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint > Enable

To know more about ESLint and it's configuration please check [ESLint documentation](https://eslint.org/docs/latest/use/getting-started)


## Unit Testing

All your code should be covered by unit tests. We recommend using [Jest](https://facebook.github.io/jest/) and [Enzyme](http://airbnb.io/enzyme/) for testing your JavaScript code.

### Installing Dependencies

```bash
yarn add @cfaester/enzyme-adapter-react-18 --dev
```

### Adding Helper Scripts

`package.json`

```json
{
  "scripts": {
    "pretest": "yarn lint",
    "test": "plesk-ext-sdk test"
  }
}
```

### Configuring

`src/frontend/setupTests.js`

```js
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { TextEncoder } from 'util';
global.TextEncoder = TextEncoder;


Enzyme.configure({ adapter: new Adapter() });
```

### Writing Tests

We recommended to place your tests next to the tested code in the `__tests__` directory.

`ext-example/`

```
└ frontend/
  ├ __tests__
  │ └ Overview.test.js
  └ Overview.js
```

`frontend/_tests_/Overview.test.js`

```js
import { createElement } from '@plesk/plesk-ext-sdk';
import { shallow } from 'enzyme';
import Overview from '../Overview';

describe('Overview', () => {
    it('renders correctly', () => {
        const wrapper = shallow(
            <Overview baseUrl="/" />
        );
        expect(wrapper).toMatchSnapshot();
    });
});
```

### Running Tests

Now you can check your code via `yarn test` command.

```
yarn test
```

Do not forget to add the directory `frontend/__tests__/__snapshots__` to Git. It's recommended to read more about [snapshot testing here](https://facebook.github.io/jest/docs/en/snapshot-testing.html).

### Collecting Code Coverage

Code coverage by tests can be collected via `yarn test --coverage` command.

Code coverage is generated to `coverage` folder. Do not forget to add this folder as ignored in the `.gitignore` file.

`.gitignore`

```
node_modules
src/htdocs/index.php
src/htdocs/dist
coverage
```
