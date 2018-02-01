myApp.controller('UserController', ['UserService', 'ShelfService', function(UserService, ShelfService) {
  console.log('UserController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;

  self.shelf = ShelfService.shelf;
  self.getShelf = ShelfService.getShelf;
  self.getShelf();

  self.addItem = function(itemIn, userId){
    ShelfService.addItem(itemIn, userId);
  }
  

}]);
