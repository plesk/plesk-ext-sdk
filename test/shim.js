// Copyright 1999-2025. WebPros International GmbH. All rights reserved.
import { TextEncoder, TextDecoder } from 'node:util';

if (!global.TextEncoder) {
    global.TextEncoder = TextEncoder;
}

if (!global.TextDecoder) {
    global.TextDecoder = TextDecoder;
}

global.requestAnimationFrame = callback => setTimeout(callback, 0);
