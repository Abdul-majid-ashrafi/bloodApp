angular.module('starter')
.controller('Login',function($scope,ser , $state){

  var ref = new Firebase("https://myduaapp.firebaseio.com/");

 $scope.send = function(go){
   ref.authWithPassword({
     email    : go.email,
     password : go.password
   }, function(error, authData) {
     if (error) {
       console.log("Login Failed!", error);
     } else {
          $state.go('app.home');
       ser.catchData(authData.uid).then(function(data){
         localStorage.setItem('saveToken',authData.uid);
         //alert("Login Successfully Mr: "+ data.firstName)

       //console.log(data.firstName)
       });

       //console.log("Authenticated successfully with payload:" , ser.catchData(authData.uid));

     }
   });
 }
})



  /*=============Sign Up================*/


.controller('SignUpController',function(ser){
  var vm = this;
  vm.signUp = function(obj){
    ser.saveData(obj);
  }})
/*=============Home pages================*/

.controller('HomeController',function(ser,$firebaseArray){
  var ref = new Firebase("https://myduaapp.firebaseio.com");
  var vm = this;
    // get signUp/login data for home

    vm.getToken = localStorage.getItem("saveToken");
  ser.catchData(vm.getToken).then(function(getData){
    //console.log("Arsalan:",getData.firstName);
    vm.showData = getData;



/*add bloood post with login UserName*/
    vm.d = {firstName : vm.showData.firstName +' '+vm.showData.lastName };
  vm.saved = function(){
   ser.dataForm.$add(vm.d);
    console.log("GEt DaTA:",vm.d);
  };


    /*add comment  with  UserName*/
    vm.obj = {commenterName : vm.showData.firstName +' '+vm.showData.lastName};
    vm.addComment = function(PostId) {
      ser.add_Comment(PostId, vm.obj)}


  });



  /*get bloood post*/
  vm.bloodPost = $firebaseArray(ref.child('blood_Store'));
  vm.bloodPost.$loaded().then(function(){
    //console.log("GEt DaTA:",vm.bloodPost[0].$id);
  });


//vm.getComment = ser.comment;
//  vm.getComment.$loaded(function(){
//    vm.comments = vm.getComment;
//    //console.log(JSON.stringify(vm.comments))
//  })
  //console.log(vm.getComment)
  //get each  item details on click
//  vm.check = function(index){
//vm.bc = vm.bloodPost[index];
//    console.log(vm.bc);
//    //alert(JSON.stringify(vm.bc))
//     }
});
