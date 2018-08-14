// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

import { createElement, Component, Form, PropTypes, Alert } from '@plesk/ui-library';
import { withRouter } from 'react-router-dom';
import { withApi } from '../Api';
import { withConfig } from '../Config';

class ServerForm extends Component {
    static propTypes = {
        config: PropTypes.shape({
            baseUrl: PropTypes.string.isRequired,
        }).isRequired,
        action: PropTypes.string.isRequired,
        successUrl: PropTypes.string,
        cancelUrl: PropTypes.string,
        children: PropTypes.node,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired,
        }).isRequired,
        api: PropTypes.shape({
            post: PropTypes.func.isRequired,
        }).isRequired,
        onSubmit: PropTypes.func,
        onSuccess: PropTypes.func,
        applyButton: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.object,
        ]),
        cancelButton: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.object,
        ]),
        staticContext: PropTypes.any,
    };

    static defaultProps = {
        successUrl: null,
        cancelUrl: null,
        children: null,
        onSubmit: null,
        onSuccess: null,
        applyButton: false,
        cancelButton: false,
        staticContext: null,
    };

    state = {
        state: null,
        errors: {},
    };

    handleCancel = () => {
        const { cancelUrl, history, cancelButton } = this.props;

        if (cancelButton && typeof cancelButton.onClick === 'function' && cancelButton.onClick() === false) {
            return;
        }

        if (cancelUrl) {
            history.push(cancelUrl);
        }
    };

    handleSubmit = values => {
        const { config, action, onSubmit, api } = this.props;

        if (typeof onSubmit === 'function' && onSubmit(values) === false) {
            return;
        }

        this.setState({
            state: 'submit',
        });

        api.post(`${config.baseUrl}${action}`, values).then(({ status, errors, data }) => {
            if (status === 'success') {
                this.setState({
                    state: null,
                    errors,
                }, () => {
                    const { successUrl, history, onSuccess } = this.props;

                    if (typeof onSuccess === 'function' && onSuccess(data) === false) {
                        return;
                    }

                    if (successUrl) {
                        history.push(successUrl);
                    }
                });
            } else {
                this.setState({
                    state: null,
                    errors,
                });
            }
        });
    };

    prepareCancelButton() {
        const { cancelUrl, cancelButton } = this.props;

        if (cancelButton) {
            return {
                ...cancelButton,
                onClick: this.handleCancel,
            };
        }

        if (cancelUrl !== null) {
            return {
                onClick: this.handleCancel,
            };
        }

        return false;
    }

    render() {
        const { state, errors } = this.state;
        const { children, config, successUrl, cancelUrl, history, onSubmit, cancelButton, onSuccess, api, staticContext, ...props } = this.props;
        const formErrors = errors && !Array.isArray(errors) ? errors : null;

        return (
            <Form
                state={state}
                errors={formErrors}
                {...props}
                onSubmit={this.handleSubmit}
                cancelButton={this.prepareCancelButton()}
            >
                {Array.isArray(errors) && errors.map((error, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Alert key={index} intent="danger">
                        {error}
                    </Alert>
                ))}
                {children}
            </Form>
        );
    }
}

export default withRouter(withApi(withConfig(ServerForm)));
