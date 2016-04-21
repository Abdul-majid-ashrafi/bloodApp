/**
 * Created by Taimoor tariq on 4/4/2016.
 */
angular.module('starter')


  .service('ser', function ($firebaseObject, $firebaseArray, $state, $q) {
    var ref = new Firebase("https://myduaapp.firebaseio.com");
    this.saveData = function (obj) {
      ref.createUser({
        email: obj.email,
        password: obj.password
      }, function (error, userData) {
        if (error) {
          console.log("Error creating user:", error);
        } else {
          console.log("Successfully created user account with uid:", userData.uid);

          this.profile = $firebaseObject(ref.child('signs').child(userData.uid));
          this.profile.firstName = obj.firstName;
          this.profile.lastName = obj.lastName;
          this.profile.blood = obj.blood;
          this.profile.$save();
          $state.go('login')
        }
      })
    };

    /*==============================================LOGIN===================================================*/
    var vm = this;
    vm.catchData = function (userId) {
      var defferd = $q.defer();
      var dataStore = $firebaseObject(ref.child('signs/' + userId));
      dataStore.$loaded(function (response) {
        defferd.resolve(response)
      });
      console.log(5 + 6545454);
      //localStorage.setItem('bc', userId);
      return defferd.promise
    };

    /*=======================================add for blood post===============================================*/

    vm.dataForm = $firebaseArray(ref.child('blood_Store'));
    vm.dataForm.$loaded().then(function () {
      //console.log(vm.dataForm)
    });


    //vm.add_Volunteer = function(){
    //  vm.vol = $firebaseArray(ref)
    //}



                /*========comment=======*/
    vm.add_Comment = function (getPostId, obj) {
      vm.comment = $firebaseArray(ref.child('blood_Store').child(getPostId).child('commnets'));
      vm.comment.$add(obj)
    };




                /*========Volunteer=======*/

    vm.add_Volunteer = function (getPostId) {
      vm.volunteer = $firebaseObject(ref.child('blood_Store').child(getPostId).child('volunteers'));
      vm.volunteer.a = 5

      //vm.volunteer1 = $firebaseArray(ref.child('blood_Store').child(getPostId).child('volunteers'));
      //vm.volunteer1.$loaded(function () {
      //vm.one =    vm.volunteer[userId] = vm.volunteer1.length+1 ;
      //  console.log( vm.one)
        vm.volunteer.$save()
      //})

    };



   vm.show =  $firebaseArray(ref.child('blood_Store'));
  vm.show.$loaded().then(function(){
  //console.log(vm.show)
})

  });


















