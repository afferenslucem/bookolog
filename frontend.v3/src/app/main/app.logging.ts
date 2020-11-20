import { ConsoleAppender, ILogger, ILoggerName, LoggerFactory, LogLevel } from 'waterlog';

const factory = new LoggerFactory([
  {
    name: 'default',
    logger: {
      logLevel: LogLevel.Debug,
      appenders: [new ConsoleAppender()],
    },
  },
  {
    name: 'SyncService',
    logger: LogLevel.Disable
  },
  {
    name: {
      namespace: 'Storage',
      loggerName: 'IndexedDb'
    },
    logger: LogLevel.All
  },
  {
    name: {
      namespace: 'Resolver'
    },
    logger: LogLevel.Debug
  }
]);

export function getLogger(name: string | ILoggerName): ILogger {
  return factory.getLogger(name);
}
