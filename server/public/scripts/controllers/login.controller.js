
myApp.controller('LoginController', ['$http', '$location', 'UserService', 'ShelfService', '$mdDialog', function($http, $location, UserService, ShelfService, $mdDialog) {
    console.log('LoginController created');
    var self = this;
    self.user = {
      username: '',
      password: ''
    };
    self.message = '';
    self.userObject = UserService.userObject;
    self.newItem = {};

    self.shelf = ShelfService.shelf;
    self.getShelf = ShelfService.getShelf;
    self.getShelf();

    self.login = function() {
      if(self.user.username === '' || self.user.password === '') {
        self.message = "Enter your username and password!";
      } else { //If login is filled in properly, there is a http post request with the user data to /login on the user.router from the server
        console.log('sending to server...', self.user);
        $http.post('/api/user/login', self.user).then(
        function(response) {
          if(response.status == 200) {
            console.log('success: ', response.data);
            $mdDialog.hide();
            // location works with SPA (ng-route)
            $location.path('/user');     // If the post was successful you will be redirected to /user
          } else {
            console.log('failure error: ', response);
            self.message = "Incorrect credentials. Please try again.";
          }
        },
        function(response) {
          console.log('failure error: ', response);
          self.message = "Incorrect credentials. Please try again.";
        });
      }
    };

    self.registerUser = function() { // Start of register path
      if(self.user.username === '' || self.user.password === '') {
        self.message = "Choose a username and password!";
      } else { //If register is filled in properly, there is a http post request with the user data to /register on the user.router from the server
        console.log('sending to server...', self.user);
        $http.post('/api/user/register', self.user).then(function(response) {  //Status 201 is sent here
          console.log('success');
          $location.path('/home');     // Goes back to /home after register complete
        },
        function(response) {
          console.log('error');
          self.message = "Something went wrong. Please try again."
        });
      }
    }
    self.loginModal = function() {
      console.log('hi')
      $mdDialog.show({
        targetEvent: event,
        templateUrl: '/views/templates/login.html',
        controller: () => this,
        controllerAs: 'vm'
      })
    }

    self.hideModal = function() {
      $mdDialog.hide();
    }
}]);
