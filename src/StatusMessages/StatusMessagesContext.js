// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

import { createContext } from '@plesk/ui-library';
import StatusMessagesProxy from './StatusMessagesProxy';

const StatusMessagesContext = createContext(
    new StatusMessagesProxy()
);

export default StatusMessagesContext;
