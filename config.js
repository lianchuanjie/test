// config

var app =  angular.module('app')

  .config(
    [        '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ($controllerProvider,   $compileProvider,   $filterProvider,   $provide) {
        
        // lazy controller, directive and service 这几句话必须有, why???
        app.controller = $controllerProvider.register;
        app.directive  = $compileProvider.directive;
        app.filter     = $filterProvider.register;
        app.factory    = $provide.factory;
        app.service    = $provide.service;
        app.constant   = $provide.constant;
    }
  ])

  .config(['$translateProvider', function($translateProvider){
    $translateProvider.useStaticFilesLoader({
      prefix: 'l10n/',
      suffix: '.js'
    });
    // Tell the module what language to use by default
    $translateProvider.preferredLanguage('zh_CN');
    // Tell the module to store the language in the local storage
    $translateProvider.useLocalStorage();
    $translateProvider.useLocalStorage();
  }])
  
  .config([  '$httpProvider', 
    function ($httpProvider) {
      $httpProvider.useApplyAsync(true); //performance boost
      $httpProvider.interceptors.push('AuthInterceptor');
    }
  ])
  
  .factory('AuthInterceptor', 
    [        "$q", "$rootScope", "$cookieStore", "APP_CONST",
    function ($q,   $rootScope,   $cookieStore,   APP_CONST) {
      return {
          request:function(config){
              config.headers[APP_CONST.TOKEN_PARA] = $cookieStore.get(APP_CONST.TOKEN_STORAGE);
              $rootScope.httpCount++;
              return config;
          },
          response: function(response) {
            $rootScope.httpCount--;
            return response;
          },
          responseError: function (response) {
              $rootScope.httpCount--;
              var data = response.data;
              if(data["errorCode"] == "500999" || data["errorCode"] == "500998") {
                  $cookieStore.remove(APP_CONST.TOKEN_STORAGE);
              }
              return $q.reject(response);
          }
      };
  }])

  .service('authService',
    [        "$state", "$cookieStore", "$bootConfig", "APP_CONST",
    function( $state,   $cookieStore,   $bootConfig,   APP_CONST){
      var loginUser = $bootConfig.loginUser || {};

      this.login = function(token, user) {
        $cookieStore.put(APP_CONST.TOKEN_STORAGE, token);
        loginUser = user;
      };

      this.logout = function(){
        $cookieStore.put(APP_CONST.TOKEN_STORAGE, '');
        loginUser = {};
        $state.transitionTo("access.signin");
      };

      this.getLoginUser = function() {
        return loginUser;
      };

    }])

    .run(
    [          '$rootScope', '$state', '$stateParams', '$cookieStore', 'APP_CONST', 'authService',
      function ($rootScope,   $state,   $stateParams,   $cookieStore,   APP_CONST,   authService) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;    
        $rootScope.authService = authService;

        //在state迁移时校验登录
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
          if (toState.authenticate && !$cookieStore.get(APP_CONST.TOKEN_STORAGE)){
            $state.transitionTo("access.signin");
            event.preventDefault(); 
          }
        });    
    }]);