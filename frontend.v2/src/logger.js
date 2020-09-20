import {ConsoleLoggerFactory, LogLevel} from 'waterlog';

const mode = 'dev';

const factory = mode == 'dev' ? new ConsoleLoggerFactory([
    {
        logger: LogLevel.Warning,
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
        logger: LogLevel.Debug
    },
    {
        name: {
            namespace: 'ConnectionModule',
            loggerName: 'Mutations'
        },
        logger: LogLevel.All
    }
]) : new ConsoleLoggerFactory([{name: 'default', logger: LogLevel.Disable}]);

export function getLogger(name) {
    return factory.getLogger(name);
}