'use strict';

angular.module('ndc')
    .factory('UserModel', function ($q, $http, $rootScope, BaseModel, APIBaseUrl, $injector) {

        var collectionUrl = 'users';

        function UserModel(data) {
            data = data || {};
            data.url = APIBaseUrl + collectionUrl;
            BaseModel.call(this,data);
        }

        UserModel.$settings = {url: APIBaseUrl + collectionUrl};
        UserModel.prototype = Object.create(BaseModel.prototype);

        //Decorate save to attach this item to the Repository on successful save
        var _$save = UserModel.prototype.$save;
        UserModel.prototype.$save = function () {
            var User = this;
            return _$save.apply(this, arguments).then(function (response) {
                var Repository = $injector.get('UserRepository');
                Repository.attach(User);
                return response;
            });
        };


        return UserModel;
    });
