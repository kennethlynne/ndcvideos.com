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
      return confirm(message) == true;
    };

    $scope.users = [];
    $scope.promise = UserRepository.getAll().then(function (users) {
      $scope.users = users;
    });

    $scope.createUser = function () {
      $scope.isCreatingNewUser = true;
    };

    $scope.resetNewUser = function () {
      $scope.isCreatingNewUser = false;
      $scope.newUser = {};
    };

    $scope.resetPassword = function (user) {
      if ($scope.confirm('Are you sure you want to reset password for user ' + user.username + '?')) {

        user.$resetPassword(user.username)
          .then(function(){
            //TODO: Give some notification of great success
            alert('Reset password for user ' + user.username + '.');
          })
          .catch(function(err){
            $log.log(err);
            alert('Could not reset password for user ' + user.username + '.');
          });
      }

    };

    $scope.deleteUser = function (user) {
      var index = $scope.users.indexOf(user);
      var userBackup = $scope.users.splice(index, 1);

      if ($scope.confirm('Are you sure you want to delete the user ' + user.username + '?')) {
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
          alert('User already exists');
        });

    };
  });
