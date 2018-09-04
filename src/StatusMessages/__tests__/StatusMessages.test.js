// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

import StatusMessages from '../StatusMessages';

describe('StatusMessages', () => {
    const addParams = [{ intent: 'success', message: 'Message' }];
    const updateParams = ['toast-1', { message: 'New message' }];
    const removeParams = ['toast-1'];

    it('call toaster methods', () => {
        const toaster = {
            add: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            clear: jest.fn(),
        };
        const statusMessages = new StatusMessages();

        statusMessages.setToaster(toaster);

        statusMessages.add(...addParams);
        expect(toaster.add).toHaveBeenCalledWith(...addParams);

        statusMessages.update(...updateParams);
        expect(toaster.update).toHaveBeenCalledWith(...updateParams);

        statusMessages.remove(...removeParams);
        expect(toaster.remove).toHaveBeenCalledWith(...removeParams);

        statusMessages.clear();
        expect(toaster.clear).toHaveBeenCalled();
    });

    it('prevent calls if the toaster is not setted', () => {
        const statusMessages = new StatusMessages();

        statusMessages.add(...addParams);
        statusMessages.update(...updateParams);
        statusMessages.remove(...removeParams);
        statusMessages.clear();
    });
});
