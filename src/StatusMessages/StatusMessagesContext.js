// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

import { createContext } from '@plesk/ui-library';
import StatusMessages from './StatusMessages';

const StatusMessagesContext = createContext(
    new StatusMessages()
);

export default StatusMessagesContext;
