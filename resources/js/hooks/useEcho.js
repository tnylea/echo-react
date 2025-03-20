import { useEffect, useRef } from 'react';

const channels = {};

export default function useEcho(channel, event, callback, dependencies = [], visibility = 'private') {
    const eventRef = useRef(callback);

    useEffect(() => {
        eventRef.current = callback;

        const channelName = visibility === 'public' ? channel : `${visibility}-${channel}`;

        if (!channels[channelName]) {
            channels[channelName] = {
                count: 1,
                channel: visibility === 'public' ? window.Echo.channel(channel) : window.Echo[visibility](channel),
            };
        } else {
            channels[channelName].count += 1;
        }

        const subscription = channels[channelName].channel;

        const listener = (payload) => {
            eventRef.current(payload);
        };

        const events = Array.isArray(event) ? event : [event];

        events.forEach((e) => {
            subscription.listen(e, listener);
        });

        return () => {
            events.forEach((e) => {
                subscription.stopListening(e, listener);
            });
            channels[channelName].count -= 1;
            if (channels[channelName].count === 0) {
                window.Echo.leaveChannel(channelName);
                delete channels[channelName];
            }
        };
    }, [...dependencies]); // eslint-disable-line
}