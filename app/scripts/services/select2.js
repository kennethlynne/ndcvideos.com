'use strict';

angular.module('ndc')
  .service('Select2', function (TagRepository) {

    var searchTags = _.throttle(function (query) {

      TagRepository.search(query.term).then(function (data) {
        query.callback({results: data});
      });

    }, 500, {'leading': false, 'trailing': true});


    return {
      tagSearch: {
        multiple: true,
        createSearchChoice: function (term, data) {
          if (_.filter(data, function (item) {
            return item.text.localeCompare(term) === 0;
          }).length === 0) {
            return {id: '$' + term, text: term};
          }
        },
        query: searchTags
      }
    }


  });
