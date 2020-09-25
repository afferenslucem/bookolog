import {ConsoleLoggerFactory, LogLevel} from 'waterlog';

const mode = 'dev';

const factory = mode == 'dev' ? new ConsoleLoggerFactory([
    {
        logger: LogLevel.Disable,
        name: 'default'
    },
    {
        name: {
            namespace: 'Storage',
        },
        logger: LogLevel.Disable
    },
    {
        name: {
            namespace: 'Http',
        },
        logger: LogLevel.Disable
    },
    {
        name: {
            namespace: 'ConnectionModule',
            loggerName: 'Mutations'
        },
        logger: LogLevel.Disable
    }
]) : new ConsoleLoggerFactory([{name: 'default', logger: LogLevel.Disable}]);

export function getLogger(name) {
    return factory.getLogger(name);
}