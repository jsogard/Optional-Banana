
mainApp.controller('loginCtrl', function($scope,$http,$location) {

	$scope.login = function(uname,password){
		
		if(uname === ""){
			console.log("Invalid Username");
			return;
		}
		if(password === ""){
			console.log("Invalid Password");
			return;
		}

		var user = {
			username:uname,
			password:password
		};

		$.ajax({
			url: './php/login.php',
			method: 'POST',
			async: false,
			data: user,
			success: function(response){
				switch(response){
					case '_001':
						console.log('Login successful');
						username = uname;
						$location.url('/join');
						break;
					case '_002':
						console.log('User or password invalid');
						break;
				}
			}
		});
	};

	$scope.signup = function(uname,password,confirm){

		if(uname === ""){
			console.log("Invalid Username");
			return;
		}
		if(password === ""){
			console.log("Invalid Password");
			return;
		}
		if(password != confirm){
			console.log("Password does not match");
			return;
		}

		var newuser = {
			username:uname,
			password:password
		};

		$.ajax({
			url: './php/adduser.php',
			method: 'POST',
			async: false,
			data: newuser,
			success: function(response){
				switch(response){
					case '_001':
						console.log('User already exists');
						break;
					case '_002':
						console.log('User successfully added');
						username = uname;
						$location.url('/join');
						break;
				}
			}
		});

	};

});