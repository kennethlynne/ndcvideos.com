'use strict';

angular.module('ndc')
    .config(function ($stateProvider, stateFactory) {
        $stateProvider.state('admin', stateFactory('Admin', {
            url: '/admin',
            templateUrl: 'pages/admin/index/main-view.html'
        }));
    })
    .controller('AdminCtrl', function ($scope, UserRepository, VideoRepository) {

        $scope.users = [];
        UserRepository.getAll().then(function (users) {
            $scope.users = users;
        });

        $scope.videos = [];
        VideoRepository.getAll().then(function (videos) {
            $scope.videos = videos;
        });

        $scope.createUser = function () {
            $scope.isCreatingNewUser = true;
        };

        $scope.resetNewUser = function () {
            $scope.isCreatingNewUser = false;
            $scope.newUser = {};
        };

        $scope.deleteUser = function (user) {
            user.$delete().then(function () {
                $scope.users.splice($scope.users.indexOf(user), 1);
            });
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
