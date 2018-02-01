myApp.service('ShelfService', ['$http', '$location', function ($http, $location) {
    console.log('ShelfService Loaded');
    
    var self = this;
    
    self.shelf = { list: [] };
    self.getShelf = function() {
      $http.get('/api/shelf')
        .then(function(response) {
          console.log('response', response);
          self.shelf = response.data;
        })
        .catch(function(error) {
          console.log('error getting shelf', error);
        });
    }

    self.addItem = function(itemIn){
      $http.post('/api/shelf')
    }
  }]);
  