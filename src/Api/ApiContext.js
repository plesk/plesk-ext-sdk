// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

import { createContext } from '@plesk/ui-library';
import api from './api';

const ApiContext = createContext(
    api
);

export default ApiContext;
