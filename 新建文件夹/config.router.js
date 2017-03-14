'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .config(
    [          '$stateProvider', '$urlRouterProvider', 'JQ_CONFIG', 
      function ($stateProvider,   $urlRouterProvider,   JQ_CONFIG) {
          
          $urlRouterProvider
              .otherwise('/app/dashboard');
          $stateProvider
              .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: 'tpl/app.html',
                  authenticate: true
              })
              .state('app.dashboard', {
                  url: '/dashboard',
                  templateUrl: 'tpl/dashboard.html',
                  authenticate: true,
              })
              .state('app.model-list', {
                  url: '/model/{model}/list',
                  templateUrl: 'tpl/model-list.html',
                  authenticate: true,
              })
              .state('app.model-create', {
                  url: '/model/{model}/create',
                  templateUrl: 'tpl/model-create.html',
                  authenticate: true,
              })
              .state('app.model-edit', {
                  url: '/model/{model}/edit/{entityId}',
                  templateUrl: 'tpl/model-edit.html',
                  authenticate: true,
              })

              // others
              .state('lockme', {
                  url: '/lockme',
                  templateUrl: 'tpl/page_lockme.html'
              })
              .state('access', {
                  url: '/access',
                  template: '<div ui-view class="fade-in-right-big smooth"></div>'
              })
              .state('access.signin', {
                  url: '/signin',
                  templateUrl: 'tpl/page_signin.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/controllers/signin.js'] );
                      }]
                  }
              })
              .state('access.signup', {
                  url: '/signup',
                  templateUrl: 'tpl/page_signup.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/controllers/signup.js'] );
                      }]
                  }
              })
              .state('access.forgotpwd', {
                  url: '/forgotpwd',
                  templateUrl: 'tpl/page_forgotpwd.html'
              })
              .state('access.404', {
                  url: '/404',
                  templateUrl: 'tpl/page_404.html'
              })
      }
    ]
  );
