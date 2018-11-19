# Getting Started

This document explains how to use Plesk Extension SDK and Plesk UI Library in your extensions. To learn more about Extension SDK, refer to [the following guide](https://docs.plesk.com/en-US/onyx/extensions-guide/plesk-extensions-in-a-nutshell.76331/).

We are constantly working on improving Plesk Extension SDK, so treat this document as a work in progress and check back often.

## Prerequisites

Make sure you have a fresh version of [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/en/docs/install) installed on your development environment.

```bash
node -v
v8.11.2

yarn -v
1.7.0
```

Plesk Extension SDK and UI Library are based on [React](https://reactjs.org/). If you're not familiar with React, read the following [documentation](https://reactjs.org/docs/hello-world.html). If your JavaScript is rusty, we [recommend refreshing your JavaScript knowledge](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript) and [learn new JavaScript features](http://exploringjs.com/es6/) – all this stuff is widely used by Plesk for writing extensions.

## First Steps

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

## Using Extension SDK And UI Library

Let's see how we can use Plesk UI Library in an extension. We'll show how to use the [Alert](https://plesk.github.io/ui-library/#!/Alert) component from UI Library as an example.

### Initializing Yarn

Create `package.json` file in the root of your project or use yarn init command:

`package.json`
```json
{
  "name": "example",
  "version": "1.0.0"
}
```
### Installing Dependencies

Since UI Library is based on React and browsers don't support jsx and ES6 syntax natively, first we need to transpile our code to native JS. We will use [Babel](http://babeljs.io/) for it. We will also use ES6 imports for importing functions and components from UI Library. We'll have to use [Webpack](https://webpack.js.org/) for handling ES6 imports because browsers don't support them natively. All these tools and some configs for integrating them are available in the package `@plesk/plesk-ext-sdk`. We will also need an HTTP client for retrieving data from the server, so let's install, for example, [axios](https://github.com/axios/axios) as a dependency.
```bash
yarn add @plesk/plesk-ext-sdk@0.5.3 axios
```
Once Yarn has added these packages to `package.json`, install it and generate `yarn.lock`. The lock file should be added to Git – you can read more about this in the Yarn [documentation](https://yarnpkg.com/lang/en/docs/yarn-lock/).

### Preparing Yarn Scripts

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

### Reworking Server Side

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
### Rendering Server Time In JavaScript

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
        date: null,
    };

    componentDidMount() {
        const { baseUrl } = this.props;
        axios.get(`${baseUrl}/api/date`).then(({ data }) => this.setState({ date: data }));
    }

    render() {
        const { date } = this.state;

        if (!date) {
            return null;
        }

        return (
            <Alert intent="info">
                {`Server time: ${date}`}
            </Alert>
        )
    }
}
```

Let's build the app to create the production code with `yarn build` command.

```bash
yarn build
```

### Managing Source Code

You should add `node_modules`, `src/htdocs/index.php` and `src/htdocs/dist` to `.gitignore` file. All other files should be added to `git` and committed.

`.gitignore`

```
node_modules
src/htdocs/index.php
src/htdocs/dist
```

## Upload The Extension To Plesk

To install your extension in Plesk, you need to create a `.zip` archive with contents of the `src` directory (except `frontend` subdirectory). You can upload this archive via Extension Catalog in Plesk UI, or you can use [the command line utility](https://docs.plesk.com/en-US/onyx/extensions-guide/extensions-management-utility.73617/). When you develop your extension, it's OK to upload just the changed files (not the whole new archive) to the corresponding directories on the server. The structure of the extension on the server is explained in the user [documentation](https://docs.plesk.com/en-US/onyx/extensions-guide/extensions-management-utility.73617/), section "Creating a Template for a New Extension".
