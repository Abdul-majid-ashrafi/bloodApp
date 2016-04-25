angular.module('starter')
  .controller('Login', function ($scope, ser, $state, $window) {

    var ref = new Firebase("https://myduaapp.firebaseio.com/");

    $scope.send = function (go) {
      ref.authWithPassword({
        email: go.email,
        password: go.password
      }, function (error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          $state.go('app.home');
          ser.catchData(authData.uid).then(function (data) {
            localStorage.setItem('saveToken', authData.uid);
            //alert("Login Successfully Mr: "+ data.firstName)

            //console.log(data.firstName)
            $window.location.reload();
          });

          //console.log("Authenticated successfully with payload:" , ser.catchData(authData.uid));

        }
      });
    }
  })



  /*=============Sign Up================*/


  .controller('SignUpController', function (ser) {
    var vm = this;
    vm.signUp = function (obj) {
      ser.saveData(obj);
    }
  })


  /*=============Home pages================*/

  .controller('HomeController', function (ser, $firebaseArray, $firebaseObject, $window) {

    var ref = new Firebase("https://myduaapp.firebaseio.com/");
    var vm = this;

    // get signUp/login data for home
    vm.getToken = localStorage.getItem("saveToken");

    ser.catchData(vm.getToken).then(function (getData) {
      vm.showData = getData;



      /*add bloood post with login UserName*/
      vm.d = { firstName: vm.showData.firstName + ' ' + vm.showData.lastName , count : 0 };
      vm.saved = function () {
        ser.dataForm.$add(vm.d);
        console.log("GEt DaTA:", vm.d);
      };


      /*add comment  with  UserName*/
      vm.obj = { commenterName: vm.showData.firstName + ' ' + vm.showData.lastName };
      vm.addComment = function (PostId) {
        ser.add_Comment(PostId, vm.obj)
      };
    });


    /*================add volunteers with user and post id and get ===============*/
    vm.addVolunteer = function (PostId) {
      ser.catchData(vm.getToken).then(function (getUserData) {
        // delete getUserData.$$conf

        vm.LoginUserInfo = {
          firstName: getUserData.firstName, lastName: getUserData.lastName, blood: getUserData.blood , bloodStatus: ''
        }
        ref.child('volunteered').child(vm.getToken).child(PostId).set(true, function (response) {
        })
        
        
        vm.postData = $firebaseObject(ref.child('blood_Store').child(PostId));
        vm.postData.$loaded().then(function (res) {
          
          res.count += 1; 
          ref.child('blood_Store').child(PostId).update({count: res.count})
              // console.log("M: ",res.count)         

          if (getUserData.blood === vm.postData.bloodGroup) {
            vm.LoginUserInfo.bloodStatus = "Donate"
          }
          else {
            vm.LoginUserInfo.bloodStatus = "Exchange Donation"
          }
          vm.add_Vol = $firebaseArray(ref.child('blood_Store').child(PostId).child('volunteers'));
          vm.add_Vol.$add(vm.LoginUserInfo)
        })
      })

      // setTimeout(function(){
      $window.location.reload();
      // },1000)

    };
    


    vm.postObj = {};  // this work for make disable button after click volunteer
    var userPosts = $firebaseObject(ref.child('volunteered/' + vm.getToken)).$loaded(function (response) {
      response.forEach(function (value, name) {
        // console.log(value+":"+name);
        vm.postObj[name] = value;
      });
      // console.log(vm.postObj);
    });




    /*=====================================================================================*/

    /*get bloood post*/
    vm.bloodPost = $firebaseArray(ref.child('blood_Store'));
    vm.bloodPost.$loaded().then(function () {
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

