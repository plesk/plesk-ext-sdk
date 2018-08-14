# Code Quality Tools

We recommended to use quality tools for monitoring extension code quality.

## ESLint

How to enable ESLint:

1. Install our ESLint rules config
    ```
    yarn add @plesk/eslint-config --dev
    ```
2. Add helper script to `package.json` file
    `package.json`
    ```json
    {
      "scripts": {
        "lint": "eslint frontend"
      }
    }
    ```
3. Add `.eslintrc` file
    `.eslintrc`
    ```
    {
      "extends": "@plesk/eslint-config",
      "settings": {
        "react": {
          "pragma": "createElement"
        }
      }
    }
    ```

Now you can check your code with the following command:

```
yarn lint
```

Alternatively, you can run `yarn lint --fix` command to automatically fix all errors that ESLint can fix.

You can also enable ESLint in your PhpStorm: Settings > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint > Enable

## StyleLint

This section is under construction.

## Unit Testing

All your code should be covered by unit tests. We recommend using [Jest](https://facebook.github.io/jest/) and [Enzyme](http://airbnb.io/enzyme/) for testing your JavaScript code.

### Installing Dependencies

```bash
yarn add enzyme enzyme-adapter-react-16 --dev
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
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
Enzyme.configure({ disableLifecycleMethods: true });
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

Add to `.eslintrc` section `env`:


```
{
  "env": {
    "jest": true
  }
}
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
