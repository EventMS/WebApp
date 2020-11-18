// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const url = 'http://f7f78996d4ce.ngrok.io';
//const url = 'http://34.120.116.6/api/';
//const url = 'http://localhost:5102/';

const websocket = 'http://localhost:5113/';
//const websocket = 'http://34.120.116.6//api/websocket/';

export const environment: { apiUrl: string; production: boolean; websocketUrl: string } = {
  apiUrl: url,
  production: false,
  websocketUrl: websocket,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
