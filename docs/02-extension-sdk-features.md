# Extension SDK Features

## Show A List With Data From The Server

Let's add a screen with the `ServerList` component.

Update file `frontend/index.js`:

`src/frontend/index.js`
```js
import { createElement, ServerList } from '@plesk/plesk-ext-sdk';

export default function ListExample() {
    return (
        <ServerList
            action="/api/list"
            columns={[{
                key: 'column1',
                title: 'Link',
                sortable: true,
                // eslint-disable-next-line
                render: ({ column1 }) => (
                    <a href="#">{`link #${column1}`}</a>
                ),
            }, {
                key: 'column2',
                title: 'Description',
                // eslint-disable-next-line
                render: ({ column1, column2 }) => (
                    <span>
                        <img src={column2} />
                        {` image #${column1}`}
                    </span>
                ),
            }]}
        />
    );
}
```

Add a new action `listAction` in the controller:

`src/plib/controllers/ApiController.php`

```php
<?php
class ApiController extends pm_Controller_Action
{
    public function listAction()
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

        $this->_helper->serverList($data);
}
```

If you need to customize sort or pagination logic you can pass a function into `serverList` helper:

```php
<?php
$this->_helper->serverList(function ($params) {
    $pageSize = $params['pageSize'];
    $pageNumber = $params['pageNumber'];
    $sortColumn = $params['sortColumn'];
    $sortDirection = $params['sortDirection'];

    // fetching data from somewhere

    return [
        'data' => $data,
        'totalItems' => $totalItems,
    ];
});
```

## Submit The Form To The Server

Add a new action in `ApiController`, which will handle form submission:

`src/plib/controllers/ApiController.php`

```php
<?php

class ApiController extends pm_Controller_Action
{
    public function saveAction()
    {
        $this->_helper->serverForm(
            [
                'exampleText' => [
                    'required' => true,
                    'filters' => [
                        ['StringTrim'],
                    ],
                    'validators' => [
                        ['StringLength', true, 3],
                    ],
                ],
            ],
            function ($args) {
                pm_Settings::set('exampleText', $args['exampleText']);
            }
        );
    }
}
```

Here, we use the action helper `serverForm` to describe input. The second parameter is the callback, which will be called when a request passes validation.

Now we can implement our form. We will use the component `ServerForm` for it. Create the component with your form and put it into `index.js`:

`src/frontend/index.js`

```js
import { createElement, ServerForm, FormFieldText } from '@plesk/plesk-ext-sdk';

export default function FormExample() {
    return (
        <ServerForm action="/api/save" successUrl="/overview" cancelUrl="/overview">
            <FormFieldText name="exampleText" label="Example Text" required />
        </ServerForm>
    );
}
```

## Translations

Use the SDK component `Translate` to translate the text in the UI. Let's update the example from the Getting Started Guide:

```js
import { createElement, Component, Alert, Translate, PropTypes } from '@plesk/plesk-ext-sdk';
import axios from 'axios';

export default class Overview extends Component {
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
                <Translate content="Overview.message" params={{ date }} />
            </Alert>
        );
    }
}
```

Next, create the file `src/plib/resources/locales/en-US.php` with your texts:

```php
<?php
$messages = [
    'app' => [
        'Overview' => [
            'title' => 'Overview',
            'message' => 'Server time: %%date%%',
        ],
    ],
];
```

Pay attention on the key `title`. If component `Overview` used as a component for a route then this key will be used as the page title.

## Routing

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

All items in routes must have two required properties:

* `path` - a valid URL (relative to the extension's base URL)
* `component` - a path to the file with the component without extension and relative to the `src/frontend` directory

Optional properties:
* `title` - a title of the page. If you need to localize the page titles, see [Translations Guide](#translations).
* `exact` - when true, will only match if the path matches the location.pathname exactly.

After building and uploading changes to the server, you can view the results by opening a URL like this: `https://my-plesk-server.com:8443/modules/example/index.php/overview`.

## State Management

This section is under construction.

## Configuration

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
