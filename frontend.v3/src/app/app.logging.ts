import { LoggerFactory, LogLevel, ConsoleAppender, ILogger, ILoggerName } from 'waterlog';

const factory = new LoggerFactory([
  {
    name: 'default',
    logger: {
      logLevel: LogLevel.Debug,
      appenders: [new ConsoleAppender()],
    },
  },
]);

export function getLogger(name: string | ILoggerName): ILogger {
  return factory.getLogger(name);
}
