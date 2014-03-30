'use strict';

angular.module('dubidubaApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'angularFileUpload',
  'bootstrap-tagsinput',
  'ui.tinymce',
  'ui.bootstrap',
  'ui.nestedSortable'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'partials/login',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'partials/signup',
        controller: 'SignupCtrl'
      })
      .when('/settings', {
        templateUrl: 'partials/settings',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .when('/admin', {
        templateUrl: 'partials/admin',
        controller: 'AdminCtrl'
      })
      .when('/admin/article', {
        templateUrl: 'partials/admin/article',
        controller: 'AdminArticleCtrl'
      })
      .when('/admin/article/view/:id', {
        templateUrl: 'partials/admin/article/view',
        controller: 'AdminArticleViewCtrl'
      })
      .when('/admin/article/new', {
        templateUrl: 'partials/admin/article/edit',
        controller: 'AdminArticleEditCtrl'
      })
      .when('/admin/article/edit/', {
        templateUrl: 'partials/admin/article/edit',
        controller: 'AdminArticleEditCtrl'
      })
      .when('/admin/article/edit/:id', {
        templateUrl: 'partials/admin/article/edit',
        controller: 'AdminArticleEditCtrl'
      })
      .when('/admin/maininfo/edit/', {
        templateUrl: 'partials/admin/maininfo/edit',
        controller: 'AdminMaininfoEditCtrl'
      })
      .when('/admin/maininfo/edit/:id', {
        templateUrl: 'partials/admin/maininfo/edit',
        controller: 'AdminMaininfoEditCtrl'
      })
      .when('/admin/categories', {
        templateUrl: 'partials/admin/categories',
        controller: 'AdminCategoriesCtrl'
      })
      .when('/catalog', {
        templateUrl: 'partials/catalog',
        controller: 'CatalogCtrl'
      })
      .when('/catalog', {
        templateUrl: 'partials/catalog',
        controller: 'CatalogCtrl'
      })
      .when('/catalog/:id', {
        templateUrl: 'partials/catalog',
        controller: 'CatalogCtrl'
      })
      .when('/article/:id', {
        templateUrl: 'partials/article',
        controller: 'ArticleCtrl'
      })
      .when('/admin/stock', {
        templateUrl: 'partials/admin/stock',
        controller: 'AdminStockCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
      
    // Intercept 401s and 403s and redirect you to login
    $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
      return {
        'responseError': function(response) {
          if(response.status === 401 || response.status === 403) {
            $location.path('/login');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    }]);
  })
  .run(function ($rootScope, $location, Auth, User) {
    //OAuth.initialize('sNAY50SnLAU-gN9SCFtWDpRzJDs', {'cache':true});
    //OAuth.initialize('L7zZ1sfWml2vf8NRNCZskvc1t8g');

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      if (next.authenticate && !Auth.isLoggedIn()) {
        $location.path('/login');
      }
    });

    
  });