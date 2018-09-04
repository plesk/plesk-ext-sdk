// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

import { createElement, Component, Form, PropTypes } from '@plesk/ui-library';
import { withRouter } from 'react-router-dom';
import { withApi } from '../Api';
import { withConfig } from '../Config';
import { withStatusMessages } from '../StatusMessages';

export class ServerForm extends Component {
    static propTypes = {
        config: PropTypes.shape({
            baseUrl: PropTypes.string.isRequired,
        }).isRequired,
        action: PropTypes.string.isRequired,
        successUrl: PropTypes.string,
        successMessage: PropTypes.string,
        cancelUrl: PropTypes.string,
        children: PropTypes.node,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired,
        }).isRequired,
        api: PropTypes.shape({
            post: PropTypes.func.isRequired,
        }).isRequired,
        statusMessages: PropTypes.shape({
            add: PropTypes.func.isRequired,
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
        successMessage: null,
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
        const { config, action, onSubmit, api, statusMessages } = this.props;

        if (typeof onSubmit === 'function' && onSubmit(values) === false) {
            return;
        }

        this.setState({
            state: 'submit',
        });

        api.post(`${config.baseUrl}${action}`, values).then(({ status, errors, data }) => {
            const newState = {
                state: null,
            };

            if (Array.isArray(errors)) {
                errors.map(message => statusMessages.add({ intent: 'danger', message }));
            } else {
                newState.errors = errors;
            }

            this.setState(newState, () => {
                if (status === 'success') {
                    const { successUrl, successMessage, history, onSuccess } = this.props;

                    if (typeof onSuccess === 'function' && onSuccess(data) === false) {
                        return;
                    }

                    if (successMessage) {
                        statusMessages.add({ intent: 'success', message: successMessage });
                    }

                    if (successUrl) {
                        history.push(successUrl);
                    }
                }
            });
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
        const { children, config, successUrl, successMessage, cancelUrl, history, onSubmit, cancelButton, onSuccess, api, statusMessages, staticContext, ...props } = this.props;

        return (
            <Form
                state={state}
                errors={errors}
                {...props}
                onSubmit={this.handleSubmit}
                cancelButton={this.prepareCancelButton()}
            >
                {children}
            </Form>
        );
    }
}

export default withStatusMessages(withRouter(withApi(withConfig(ServerForm))));
