'use strict';

angular.module('ndc')
    .factory('UserModel', function ($q, $http, $rootScope, ModelFactory, APIBaseUrl, UserRepository) {

        var collectionUrl = 'user';

        function UserModel(data) {
            data = data || {};
            data.$urlBase = APIBaseUrl + collectionUrl;
            ModelFactory.call(this,data);
        };

        UserModel.$urlBase = APIBaseUrl + collectionUrl;
        UserModel.prototype = Object.create(ModelFactory.prototype);

        //Decorate save to attach this item to the Repository on successful save
        var _$save = UserModel.prototype.$save;
        UserModel.prototype.$save = function () {
            var User = this;
            return _$save.apply(this, arguments).then(function (response) {
                UserRepository.attach(User);
                return response;
            });
        };


        return UserModel;
    });
