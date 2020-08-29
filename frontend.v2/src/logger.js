import {ConsoleLoggerFactory, LogLevel} from 'waterlog';

const mode = 'dev';

const factory = mode == 'dev' ? new ConsoleLoggerFactory([
    {
        logger: LogLevel.Debug,
        name: 'default'
    },
    {
        name: {
            namespace: 'Storage',
        },
        logger: LogLevel.Warning
    },
    {
        name: {
            namespace: 'Http',
        },
        logger: LogLevel.Warning
    },
    {
        name: {
            namespace: 'Store',
        },
        logger: LogLevel.All
    }
]) : new ConsoleLoggerFactory([{name: 'default', logger: LogLevel.Disable}]);

export function getLogger(name) {
    return factory.getLogger(name);
}