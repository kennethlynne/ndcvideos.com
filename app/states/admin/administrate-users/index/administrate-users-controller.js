'use strict';

angular.module('ndc')
  .config(function ($stateProvider, stateFactory) {
    $stateProvider.state('administrateUsers', stateFactory('Administrateusers', {
      url: '/users',
      templateUrl: 'states/admin/administrate-users/index/main-view.html',
      parent: 'admin'
    }));
  })
  .controller('AdministrateusersCtrl', function ($scope, UserRepository, array, $log, _) {

    $scope.confirm = function (message) {
      return confirm(message) == true;
    };

    $scope.userlist = [];
    $scope.filteredUsers = [];
    $scope.paginatedUsers = [];

    //Whenever the original list of users changes, the filtered "view" projected from that should also be updated.
    $scope.$watch('userlist', $scope.updateResults, true);

    $scope.gettingUsersPromise = UserRepository.getAll().then(function (users) {
      array($scope.userlist).set(users);
      $scope.updateResults();
    });

    $scope.updateResults = function () {
      var query = ($scope.query = $scope.query || '');
      //Copy to avoid changing original array
      var users = angular.copy($scope.userlist),
        hits = _.filter(users, function (user) {
          return !query || user.username.indexOf(query) >= 0;
        });

      array($scope.filteredUsers).set(hits);

      $scope.numberOfVerifiedUsers = _.chain($scope.filteredUsers)
        .filter(function (user) {
          return user.verified;
        })
        .size()
        .value();
    };

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
          .then(function () {
            //TODO: Give some notification of great success
            $scope.status = 'Password reset verification mail sent.';
          })
          .catch(function (err) {
            $log.log(err);
            alert('Could not reset password for user ' + user.username + '.');
          });
      }

    };

    $scope.deleteUser = function (user) {
      var index = $scope.userlist.indexOf(user);
      var userBackup = $scope.userlist.splice(index, 1);

      if ($scope.confirm('Are you sure you want to delete the user ' + user.username + '?')) {
        user.$delete()
          .then(function () {
            //TODO: Give some notification of great success
            //alert('Brukeren ble slettet');
          })
          .catch(function () {
            //If deletaion fails, insert the user again
            //TODO: Expose a reference from the repository and let the repository handle the removal
            $scope.userlist.splice(index, 0, userBackup);
          })
      }
    };

    $scope.saveUser = function (user) {
      $scope.isCreatingNewUser = false;

      var User = UserRepository.create(user);
      $scope.userlist.push(user);

      User.$save()
        .then(function (user) {
          $scope.newUser = {};
          //Replace placeholder with received instance
          $scope.userlist.splice($scope.userlist.indexOf(User), 1, user);
        })
        .catch(function () {
          $scope.isCreatingNewUser = true;
          $scope.userlist.splice($scope.userlist.indexOf(User), 1);
          //TODO: More user friendly feedback
          alert('User already exists');
        });

    };
  });
