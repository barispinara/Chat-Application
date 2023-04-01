import React from 'react'

export default function StringAvatar(name) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < name.length; i += 1) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
    return {
        sx: {
            bgcolor: color,
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}
