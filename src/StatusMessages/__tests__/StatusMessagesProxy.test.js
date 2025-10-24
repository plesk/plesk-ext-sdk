// Copyright 1999-2025. WebPros International GmbH. All rights reserved.

import StatusMessagesProxy from '../StatusMessagesProxy';

describe('StatusMessagesProxy', () => {
    const addParams = [{ intent: 'success', message: 'Message' }];
    const updateParams = ['toast-1', { message: 'New message' }];
    const removeParams = ['toast-1'];

    test('call toaster methods', () => {
        const toaster = {
            add: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            clear: jest.fn(),
        };
        const statusMessages = new StatusMessagesProxy();

        statusMessages.setToaster(toaster);

        statusMessages.add(...addParams);

        expect(toaster.add).toHaveBeenCalledWith(...addParams);

        statusMessages.update(...updateParams);

        expect(toaster.update).toHaveBeenCalledWith(...updateParams);

        statusMessages.remove(...removeParams);

        expect(toaster.remove).toHaveBeenCalledWith(...removeParams);

        statusMessages.clear();

        expect(toaster.clear).toHaveBeenCalledWith();
    });
});
