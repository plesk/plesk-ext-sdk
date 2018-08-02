# Plesk Extension SDK

It's a toolkit for development extensions for Plesk with a zero-config setup.

## Install

```sh
yarn add @plesk/plesk-ext-sdk
```

## Builds the app for development

```sh
yarn plesk-ext-sdk dev
```

## Runs tests

```sh
yarn plesk-ext-sdk test
```

## Builds the app for production

```sh
yarn plesk-ext-sdk build
```

## License

Apache 2.0


# Using Plesk Extension SDK

## Getting Started

This document explains how to use Plesk Extension SDK and Plesk UI Library in your extensions. To learn more about Extension SDK, refer to [the following guide](https://docs.plesk.com/en-US/onyx/extensions-guide/plesk-extensions-in-a-nutshell.76331/).

We are constantly working on improving Plesk Extension SDK, so treat this document as a work in progress and check back often.

### Prerequisites

Make sure you have a fresh version of [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/en/docs/install) installed on your development environment.

```bash
node -v
v8.11.2

yarn -v
1.7.0
```

Plesk Extension SDK and UI Library are based on [React](https://reactjs.org/). If you're not familiar with React, read the following [documentation](https://reactjs.org/docs/hello-world.html). If your JavaScript is rusty, we [recommend refreshing your JavaScript knowledge](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript) and [learn new JavaScript features](http://exploringjs.com/es6/) – all this stuff is widely used by Plesk for writing extensions.

### First Steps

Let's create a simple one-page extension which renders server time.

`ext-example/`

```
└ src/
  ├ htdocs/
  │ └ index.php
  ├ plib/
  │ └ controllers
  │   └ IndexController.php
  │ └ views
  │   └ scripts
  │     └ index
  │       └ index.phtml
  └ meta.xml
```

`src/meta.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
  <module>
      <id>example</id>
      <name>Extensions SDK Example</name>
      <description>This extension is an example extension with UI samples.</description>
      <version>2.0.0</version>
      <plesk_min_version>17.8.11</plesk_min_version>
  </module>
```

`src/htdocs/index.php`

```php
<?php
(new pm_Application)->run();
```

`src/plib/controllers/IndexController.php`

```php
<?php
class IndexController extends pm_Controller_Action
{
    public function indexAction()
    {
        $this->view->pageTitle = 'Example';
        $this->view->date = date('Y-m-d H:i:s');
    }
}
```

`src/plib/views/scripts/index/index.phtml`

```php
<?= $this->date; ?>
```

Our sample extension is ready. Let's modify it so that we can render the server time on the client side using Plesk UI Library.

### Using Extension SDK And UI Library

Let's see how we can use Plesk UI Library in an extension. We'll show how to use the [Alert](https://plesk.github.io/ui-library/#!/Alert) component from UI Library as an example.

#### Initializing Yarn

Create `package.json` file in the root of your project or use yarn init command:

`package.json`
```json
{
  "name": "example",
  "version": "1.0.0"
}
```
#### Installing Dependencies

Since UI Library is based on React and browsers don't support jsx and ES6 syntax natively, first we need to transpile our code to native JS. We will use [Babel](http://babeljs.io/) for it. We will also use ES6 imports for importing functions and components from UI Library. We'll have to use [Webpack](https://webpack.js.org/) for handling ES6 imports because browsers don't support them natively. All these tools and some configs for integrating them are available in the package `@plesk/plesk-ext-sdk`. We will also need an HTTP client for retrieving data from the server, so let's install, for example, [axios](https://github.com/axios/axios) as a dependency.
```bash
yarn add @plesk/plesk-ext-sdk@0.2.3 axios
```
Once Yarn has added these packages to `package.json`, install it and generate `yarn.lock`. The lock file should be added to Git – you can read more about this in the Yarn [documentation](https://yarnpkg.com/lang/en/docs/yarn-lock/).

#### Preparing Yarn Scripts

Add scripts section to `package.json` file:
```json
{
  "scripts": {
    "prepare": "yarn build",
    "dev": "plesk-ext-sdk dev",
    "build": "plesk-ext-sdk build"
  }
}
```

#### Reworking Server Side

Remove `src/plib/views/scripts/index/index.phtml` and `src/htdocs/index.php`. Rename `src/plib/controllers/IndexController.php` to `src/plib/controllers/ApiController.php` and replace code:

`src/plib/controllers/ApiController.php`

```php
<?php
class ApiController extends pm_Controller_Action
{
    public function dateAction()
    {
        $this->_helper->json(date('Y-m-d H:i:s'));
    }
}
```
#### Rendering Server Time In JavaScript

Now we can write our first React component.

`src/frontend/index.js`

```js
import { createElement, Component, Alert, PropTypes } from '@plesk/plesk-ext-sdk';
import axios from 'axios';

export default class extends Component {
    static propTypes = {
        baseUrl: PropTypes.string.isRequired,
    };

    state = {
        data: null,
    };

    componentDidMount() {
        const { baseUrl } = this.props;
        axios.get(`${baseUrl}/api/date`).then(({ data }) => this.setState({ data }));
    }

    render() {
        const { data } = this.state;

        if (!data) {
            return null;
        }

        return (
            <Alert intent="info">
                {`Server time: ${data}`}
            </Alert>
        )
    }
}
```

Let's build the app to create the production code with `yarn build` command.

```bash
yarn build
```

#### Managing Source Code

You should add `node_modules`, `src/htdocs/index.php` and `src/htdocs/dist` to `.gitignore` file. All other files should be added to `git` and committed.

`.gitignore`

```
node_modules
src/htdocs/index.php
src/htdocs/dist
```

### Upload The Extension To Plesk

To install your extension in Plesk, you need to create a `.zip` archive with contents of the `src` directory (except `frontend` subdirectory). You can upload this archive via Extension Catalog in Plesk UI, or you can use [the command line utility](https://docs.plesk.com/en-US/onyx/extensions-guide/extensions-management-utility.73617/). When you develop your extension, it's OK to upload just the changed files (not the whole new archive) to the corresponding directories on the server. The structure of the extension on the server is explained in the user [documentation](https://docs.plesk.com/en-US/onyx/extensions-guide/extensions-management-utility.73617/), section "Creating a Template for a New Extension".

## Extension SDK Features

### Show A List With Data From The Server

Let's add a screen with the [List](https://plesk.github.io/ui-library/#!/List) component.

Update file `frontend/index.js`:

`src/frontend/index.js`
```js
import { createElement, Component, List, PropTypes } from '@plesk/plesk-ext-sdk';
import axios from 'axios';

export default class extends Component {
    static propTypes = {
        baseUrl: PropTypes.string.isRequired,
    };

    state = {
        data: [],
    };

    componentDidMount() {
        const { baseUrl } = this.props;
        axios.get(`${baseUrl}/api/list-data`).then(({ data }) => this.setState({ data }));
    }

    render() {
        const { data } = this.state;

        return (
            <List
                columns={[{
                    key: 'column1',
                    title: 'Link',
                    sortable: true,
                    render: ({ column1 }) => (
                        <a href="#">{`link #${column1}`}</a>
                    ),
                }, {
                    key: 'column2',
                    title: 'Description',
                    render: ({ column1, column2 }) => (
                        <span>
                            <img src={column2} />
                            {` image #${column1}`}
                        </span>
                    ),
                }]}
                data={data}
            />
        );
    }
}
```

Add a new action `listDataAction` in the controller:

`src/plib/controllers/IndexController.php`

```php
<?php
class ApiController extends pm_Controller_Action
{
    public function listDataAction()
    {
        $data = [];
        $iconPath = pm_Context::getBaseUrl() . 'images/icon_16.gif';
        for ($index = 1; $index <= 150; $index++) {
            $data[] = [
                'key' => "$index",
                'column1' => $index,
                'column2' => $iconPath,
            ];
        }

        $this->_helper->json($data);
    }
}
```

### Submit The Form To The Server

Add new action in IndexController, which will handle form submission:

`src/plib/controllers/IndexController.php`

```php
<?php
 
class ApiController extends pm_Controller_Action
{
    public function formAction()
    {
        $data = json_decode($this->getRequest()->getRawBody(), true);
 
        if (!$this->getRequest()->isPost()) {
            $this->_helper->json([
                'status' => 'error',
            ]);
            return;
        }
 
        if (empty($data['username'])) {
            $this->_helper->json([
                'status' => 'error',
                'errors' => [
                    'username' => [
                        'isEmpty' => 'This field is required.'
                    ],
                ],
            ]);
            return;
        }
 
        $this->_helper->json(['status' => 'success']);
    }
}
```

Create the component with your form and put it into `index.js`:

`src/frontend/index.js`

```js
import { createElement, Component, Form, FormFieldText, Alert, PropTypes } from '@plesk/plesk-ext-sdk';
import axios from 'axios';
 
export default class extends Component {
    static propTypes = {
        baseUrl: PropTypes.string.isRequired,
    };
 
    state = {
        status: null,
        state: null,
        errors: {},
    };
 
    handleCancel() {
        window.location = '/modules/catalog/index.php/installed';
    }
 
    handleSubmit = values => {
        const { baseUrl } = this.props;
 
        this.setState({
            state: 'submit',
        });
 
        axios.post(`${baseUrl}/api/form-submit`, values).then(({ data }) => {
            const { status, errors = {} } = data;
 
            this.setState({
                state: null,
                status,
                errors,
            });
        });
    };
 
    render() {
        const { status, state, errors } = this.state;
 
        if (status === 'success') {
            return <Alert intent="success">{'Data was successfully submitted.'}</Alert>;
        }
 
        return (
            <Form
                state={state}
                errors={errors}
                applyButton={false}
                onSubmit={this.handleSubmit}
                cancelButton={{
                    onClick: this.handleCancel,
                }}
            >
                <FormFieldText name="username" label="Username" required />
            </Form>
        );
    }
}
```

### Translations

This section is under construction.

### Routing

In the previous examples there are three different scenarios: static page, list with data and form. If you want to have all of these scenarios in your extension then you should create three different pages for it. To create pages, `plesk-ext-sdk` offers `routes`. It maps a URL the user opens in a browser to a corresponding component that must be rendered. Let's create three components using code from previous examples:

`src/frontend/Overview.js`

```js
import { createElement, Component, Alert, PropTypes } from '@plesk/plesk-ext-sdk';
import axios from 'axios';
 
export default class Overview extends Component {
    static propTypes = {
        baseUrl: PropTypes.string.isRequired,
    };
 
    state = {
        data: null,
    };
 
    componentDidMount() {
        const { baseUrl } = this.props;
        axios.get(`${baseUrl}/api/date`).then(({ data }) => this.setState({ data }));
    }
 
    render() {
        const { data } = this.state;
 
        if (!data) {
            return null;
        }
 
        return (
            <Alert intent="info">
                {`Server time: ${data}`}
            </Alert>
        )
    }
}
```

`src/frontend/ListExample.js`

```js
import { createElement, Component, List, PropTypes } from '@plesk/plesk-ext-sdk';
import axios from 'axios';
 
export default class ListExample extends Component {
    static propTypes = {
        baseUrl: PropTypes.string.isRequired,
    };
 
    state = {
        data: [],
    };
 
    componentDidMount() {
        const { baseUrl } = this.props;
        axios.get(`${baseUrl}/api/list-data`).then(({ data }) => this.setState({ data }));
    }
 
    render() {
        const { data } = this.state;
 
        return (
            <List
                columns={[{
                    key: 'column1',
                    title: 'Link',
                    sortable: true,
                    render: ({ column1 }) => (
                        <a href="#">{`link #${column1}`}</a>
                    ),
                }, {
                    key: 'column2',
                    title: 'Description',
                    render: ({ column1, column2 }) => (
                        <span>
                            <img src={column2} />
                            {` image #${column1}`}
                        </span>
                    ),
                }]}
                data={data}
            />
        );
    }
}
```

`src/frontend/FormExample.js`

```js
import { createElement, Component, Form, FormFieldText, Alert, PropTypes } from '@plesk/plesk-ext-sdk';
import axios from 'axios';
 
export default class FormExample extends Component {
    static propTypes = {
        baseUrl: PropTypes.string.isRequired,
    };
 
    state = {
        status: null,
        state: null,
        errors: {},
    };
 
    handleCancel() {
        window.location = '/modules/catalog/index.php/installed';
    }
 
    handleSubmit = values => {
        const { baseUrl } = this.props;
 
        this.setState({
            state: 'submit',
        });
 
        axios.post(`${baseUrl}/api/form-submit`, values).then(({ data }) => {
            const { status, errors = {} } = data;
 
            this.setState({
                state: null,
                status,
                errors,
            });
        });
    };
 
    render() {
        const { status, state, errors } = this.state;
 
        if (status === 'success') {
            return <Alert intent="success">{'Data was successfully submitted.'}</Alert>;
        }
 
        return (
            <Form
                state={state}
                errors={errors}
                applyButton={false}
                onSubmit={this.handleSubmit}
                cancelButton={{
                    onClick: this.handleCancel,
                }}
            >
                <FormFieldText name="username" label="Username" required />
            </Form>
        );
    }
}
```

Now we can add `extension.config.js` to the `root` directory of the extension and set `routes`:

`extension.config.js`

```js
module.exports = {
    routes: [
        {
            path: '/overview',
            component: 'Overview',
            title: 'Overview',
        },
        {
            path: '/list',
            component: 'ListExample',
            title: 'List Example',
        },
        {
            path: '/form',
            component: 'FormExample',
            title: 'Form Example',
        },
    ],
};
```

All items in routes should have three properties:

* `path` - a valid URL (relative to the extension's base URL)
* `component` - a path to the file with the component without extension and relative to the `src/frontend` directory
* `title` - a title of the page

After building and uploading changes to the server, you can view the results by opening a URL like this: `https://my-plesk-server.com:8443/modules/example/index.php/overview`. 

### State Management

This section is under construction.

### Configuration

If you need to tweak the default setup to suit your project needs, or you want to use one of the specific features that the Webpack ecosystem has to offer, you can use your own configuration file. Plesk Extension SDK will look for the `extension.config.js` file in the current working directory for your custom configuration. This file should export a configuration object. This configuration object can include the `webpack` property, which must be a function. This function accepts the default webpack config as an argument and returns the new config.

`extension.config.js`

```js
module.exports = {
    webpack: (config, { isDev }) => {
        return {
            ...config,
            // modified options
        };
    },
};
```

## Code Quality Tools

We recommended to use quality tools for monitoring extension code quality.

### ESLint

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

### StyleLint

This section is under construction.

### Unit Testing

All your code should be covered by unit tests. We recommend using [Jest](https://facebook.github.io/jest/) and [Enzyme](http://airbnb.io/enzyme/) for testing your JavaScript code.

#### Installing Dependencies

```bash
yarn add enzyme enzyme-adapter-react-16 --dev
```

#### Adding Helper Scripts

`package.json`

```json
{
  "scripts": {
    "pretest": "yarn lint",
    "test": "plesk-ext-sdk test"
  }
}
```

#### Configuring

`src/frontend/setupTests.js`

```js
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });
Enzyme.configure({ disableLifecycleMethods: true });
```

#### Writing Tests

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

#### Running Tests

Now you can check your code via `yarn test` command.

```
yarn test
```

Do not forget to add the directory `frontend/__tests__/__snapshots__` to Git. It's recommended to read more about [snapshot testing here](https://facebook.github.io/jest/docs/en/snapshot-testing.html).

#### Collecting Code Coverage

Code coverage by tests can be collected via `yarn test --coverage` command.

Code coverage is generated to `coverage` folder. Do not forget to add this folder as ignored in the `.gitignore` file.

`.gitignore`

```
node_modules
src/htdocs/index.php
src/htdocs/dist
coverage
```
