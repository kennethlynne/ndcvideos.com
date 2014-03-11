ng-symbiosis-model [![Build Status](https://travis-ci.org/ngSymbiosis/ngSymbiosis.model.png?branch=master)](https://travis-ci.org/ngSymbiosis/ngSymbiosis.model)
=============================

AngularJS model to handle interaction with a server. It is the perfect match for [generator-angular-xl](https://github.com/kennethlynne/generator-angular-xl)

`bower install ng-symbiosis-model`

# Usage

Include `ngSymbiosis.model` as a dependancy to your application.

Then create a factory that uses the BaseModel class.

```javascript
angular.module('yourApp')
    .factory('CategoryModel', function (BaseModel, APIBaseUrl) {

        var collectionUrl = 'categories';

        function CategoryModel(data) {
            data = data || {};
            data.url = APIBaseUrl + collectionUrl;
            BaseModel.call(this,data);
        }

        CategoryModel.$settings = {url: APIBaseUrl + collectionUrl};
        CategoryModel.prototype = Object.create(BaseModel.prototype);

        return CategoryModel;
    });
```

Then instantiate this in for example a controller

```javascript
angular.module('yourApp')
    .controller('demo', function($scope, CategoryModel) {
        
            var category = new CategoryModel();

            category.title = 'New title';
            category.id = 5;

            category
                .$save() 
                //Since it has an id it will now do a PUT to /categories/5, 
                //if it did not have an id it would do a POST to /categories/
                .then(function () {
                    alert('Saved!');
                })
                .catch(function (err) {
                    alert('Failed!');
                });
    });
```

or instantiate a [ngSymbiosis.repository](https://github.com/ngSymbiosis/ngSymbiosis.repository) to get a `Categoryrepository` that handles `getAll()`, `getById(id)` and caching to local storage.

```javascript

angular.module('yourApp')
    .factory('CategoryRepository', function ($injector, CategoryModel) {
        var BaseRepository = $injector.get('BaseRepository');
        return new BaseRepository({name: 'Category', model: CategoryModel});
    });

```
