import { version } from '../../package.json';

export const environment = {
  production: true,
  serverUrl: 'http://server:5000',
  restoreTimeSeconds: 12 * 60 * 60,
  version,
  filePath: '/file/',
  notificationCloseTime: 3000,
};
