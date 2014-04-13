'use strict';

angular.module('ndc')
  .config(function ($stateProvider, stateFactory) {
    $stateProvider.state('administrateUsers', stateFactory('Administrateusers', {
      url: '/users',
      templateUrl: 'states/admin/administrate-users/index/main-view.html',
      parent: 'admin'
    }));
  })
  .controller('AdministrateusersCtrl', function ($scope, UserRepository) {

    $scope.confirm = function (message) {
      return confirm(message) == true
    };

    $scope.users = [];
    UserRepository.getAll().then(function (users) {
      $scope.users = users;
    });

    $scope.createUser = function () {
      $scope.isCreatingNewUser = true;
    };

    $scope.resetNewUser = function () {
      $scope.isCreatingNewUser = false;
      $scope.newUser = {};
    };

    $scope.deleteUser = function (user) {
      var index = $scope.users.indexOf(user);
      var userBackup = $scope.users.splice(index, 1);

      if ($scope.confirm('Er du helt sikker på at du vil slette brukeren ' + user.userName + '?')) {
        user.$delete()
          .then(function () {
            //TODO: Give some notification of great success
            //alert('Brukeren ble slettet');
          })
          .catch(function () {
            //If deletaion fails, insert the user again
            //TODO: Expose a reference from the repository and let the repository handle the removal
            $scope.users.splice(index, 0, userBackup);
          })
      }
    };

    $scope.saveUser = function (user) {
      $scope.isCreatingNewUser = false;

      var User = UserRepository.create(user);
      $scope.users.push(user);

      User.$save()
        .then(function (user) {
          $scope.newUser = {};
        })
        .catch(function () {
          $scope.isCreatingNewUser = true;
          $scope.users.splice($scope.users.indexOf(User), 1);
          //TODO: More user friendly feedback
          alert('Klarte ikke lagre brukeren');
        });

    };
  });
