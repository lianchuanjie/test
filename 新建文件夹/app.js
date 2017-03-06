'use strict';


angular.module('app', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'ui.router',
    'ui.bootstrap',
    'ui.utils',
    'ui.load',
    'ui.jq',
    'ui.select',
    'lr.upload',
    'oc.lazyLoad',
    'pascalprecht.translate',
    'smart-table',
    'app.const'
]);

angular.module('app.const', [])
  .constant('APP_CONST', {
    TOKEN_PARA : 'token',
    TOKEN_STORAGE : 'fusion-token'
  })
;

 //先加载服务器端配置和定义，再手动bootstrap angular，html里需要去掉ng-app
 //因为要用到APP_CONST,所以APP_CONST不能定义在app里，单独定义为一个module
(function() {
    var initInjector = angular.injector(['ng']);
    var $http = initInjector.get('$http');
    var $cookieStore = angular.injector(['ngCookies']).get('$cookieStore');
    var APP_CONST = angular.injector(['app.const']).get('APP_CONST');
    $http.get('/api/app/config', {
        headers: {'token': $cookieStore.get(APP_CONST.TOKEN_STORAGE)}
    }).then(function (response) {
      angular.module('app').constant('$bootConfig', Object.freeze(response.data));
      angular.element(document).ready(function() {
          angular.bootstrap(document, ['app']);
        });
    });
})();