// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: { apiUrl: string; production: boolean; websocketUrl: string } = {
  apiUrl: 'http://34.120.17.251/api/', //http://localhost:5102/', //'http://34.120.17.251/api/',
  production: false,
  websocketUrl: 'http://34.120.17.251/api/websocket/', //'http://34.120.17.251/api/websocket/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
