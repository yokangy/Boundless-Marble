angular.module('boundless.groups', [])

.controller('GroupsController', function($scope, $window, $location, Groups) {
	//hold data here after quering db
	$scope.data = {
		groups: Groups.data,
		users: [],
		usergroups : []
	};

	$scope.joinGroup = function(group) {
		var phone = $window.localStorage.getItem('phone');
		var data = {
			phone: phone, 
			name: group.name
		};
		console.log(data.phone +' joined the group: ' + data.name);

		Groups.joinGroup(data)
			.then(function() {
				$location.path('/groups');
			})
			.catch(function(error) {
				console.log(error);
			});
	};
	 
	$scope.getGroups = function() {
		console.log('GETTING GROUPS');
		Groups.getGroups()
			//server sends back groups which should be an array containing objects
			.then(function (data) {
				$scope.data.groups = data;
		});
	};

	$scope.createGroup = function() {
		console.log($scope.data.newGroup);
		//pass groupName & username to create a new group
		var name = $scope.data.newGroup;
		var phone = $window.localStorage.getItem('phone');
		var data = {
			phone: phone, 
			name: name
		};

		Groups.createGroup(data)
			.then(function() {
				$location.path('/groups');
			})
			.catch(function(error) {
				console.log(error);
			});
	};

	$scope.pingGroup = function(group) {
		//only the username is need to ping the group
		var name = group.name;
		var phone = $window.localStorage.getItem('phone');
		console.log('pingGroup: ' + phone);
		var data = {
			phone: phone,
			name: name
		};

		Groups.pingGroup(data)
			.then(function() {
				$location.path('/groups');
			})
			.catch(function(error) {
				console.log(error);
			});
	};

	//fetches all the members in the group
	$scope.getUsers = function(group) {
		console.log('first step: ' + group.name);
		Groups.getUsers(group)
			.then(function(data) {
				console.log('getUsers data: ' + data);
				$scope.data.users = data;
			});
	};

	//fetches all the groups a user is a member of
	$scope.userGroups = function() {
		console.log('groups.js');
		var phone = $window.localStorage.getItem('phone');

		Groups.userGroups(phone)
			.then(function(data) {
				console.log(data);
				$scope.data.usergroups = data;
			})
			.catch(function(error) {
				console.log(error);
			});
	};

	$scope.getGroups();
	$scope.userGroups();
});	
