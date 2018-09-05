// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

export default class StatusMessagesProxy {
    toaster = null;

    setToaster = toaster => {
        this.toaster = toaster;
    };

    add(...args) {
        if (!this.toaster) {
            return false;
        }

        return this.toaster.add(...args);
    }

    update(...args) {
        if (!this.toaster) {
            return false;
        }

        return this.toaster.update(...args);
    }

    remove(...args) {
        if (!this.toaster) {
            return;
        }

        this.toaster.remove(...args);
    }

    clear() {
        if (!this.toaster) {
            return;
        }

        this.toaster.clear();
    }
}
