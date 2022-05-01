import { version } from '../../package.json';

export const environment = {
  production: false,
  serverUrl: 'http://localhost:5000',
  restoreTimeSeconds: 60,
  version,
  filePath: '/assets/',
  notificationCloseTime: 3000,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
