// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  SERVER_ORIGIN: '',
  production: false,
  useHash: false,
  hmr: false,

  app: {
    apiHostName: 'http://localhost',
    apiBase: 'api',
    port: 8291,
    token_auth_username: "b1Bli0t33kaidtociddd",
    token_auth_password: "b1Bli0t33kaidtocs3cret"
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
