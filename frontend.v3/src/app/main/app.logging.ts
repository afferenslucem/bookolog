import { AccumulatorAppender, ConsoleAppender, ILogger, ILoggerName, LoggerFactory, LogLevel } from 'waterlog';

const consoleFactory = new LoggerFactory([
  {
    name: 'default',
    logger: {
      logLevel: LogLevel.Debug,
      appenders: [new ConsoleAppender()],
    },
  },
  {
    name: 'SyncService',
    logger: LogLevel.Debug,
  },
]);

const accumulator = new AccumulatorAppender();

const requestFactory = new LoggerFactory([
  {
    name: 'default',
    logger: {
      logLevel: LogLevel.Debug,
      appenders: [accumulator],
    },
  },
]);

export function getConsoleLogger(name: string | ILoggerName): ILogger {
  return consoleFactory.getLogger(name);
}

export function getRequestLogger(name: string | ILoggerName): ILogger {
  return requestFactory.getLogger(name);
}

export function getAccumulated(): AccumulatorAppender {
  return accumulator;
}
