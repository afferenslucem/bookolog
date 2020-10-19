import {LoggerFactory, LogLevel, ConsoleAppender, AccumulatorAppender} from 'waterlog';

export const accumulator = new AccumulatorAppender();

const factory = new LoggerFactory([
    {
        name: 'default',
        logger: {
            logLevel: LogLevel.Warn,
            appenders: [new ConsoleAppender()],
        },
    },
    {
        name: {
            namespace: 'UserModule'
        },
        logger: {
            logLevel: LogLevel.Info,
            appenders: [new ConsoleAppender(), accumulator],
        },
    },
    {
        name: {
            namespace: 'Http',
        },
        logger: {
            logLevel: LogLevel.Info,
            appenders: [new ConsoleAppender(), accumulator],
        },
    }
])

export function getLogger(name) {
    return factory.getLogger(name);
}