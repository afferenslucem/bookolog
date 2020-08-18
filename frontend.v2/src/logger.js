import {ConsoleLoggerFactory, LogLevel} from 'ursus-utilus-logger';

const mode = 'dev';

const factory = mode == 'dev' ? new ConsoleLoggerFactory([
    {
        logger: LogLevel.Debug,
        name: 'default'
    }
]) : new ConsoleLoggerFactory([{name: 'default', logger: LogLevel.Disable}]);

export function getLogger(name) {
    return factory.getLogger(name);
}