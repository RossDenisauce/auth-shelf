myApp.controller('LoginController', ['$http', '$location', 'UserService', function($http, $location, UserService) {
    console.log('LoginController created');
    var self = this;
    self.user = {
      username: '',
      password: ''
    };
    self.message = '';
    self.userObject = UserService.userObject;
    self.newItem = {};

    self.login = function() {
      if(self.user.username === '' || self.user.password === '') {
        self.message = "Enter your username and password!";
      } else { //If login is filled in properly, there is a http post request with the user data to /login on the user.router from the server
        console.log('sending to server...', self.user);
        $http.post('/api/user/login', self.user).then(
        function(response) {
          if(response.status == 200) {
            console.log('success: ', response.data);
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

    // self.addItem = function(itemIn){
    //   $http.post('/api/user/login')
    // }
}]);
