var app = angular.module('taskApp', []);

app.controller('taskController', function($scope, $http) {
	getTask();
	function getTask() {
		$http.post("ajax/getTask.php").success(function(data) {
			$scope.tasks = data;
		});
	};

	$scope.addTask = function(task) {
		$http.post("ajax/addTask.php?task="+task).success(function(data) {
			getTask();
			$scope.taskInput = "";
		});
	};

	$scope.deleteTask = function(task) {
		if(confirm("Are you sure want to delete this task?")) {
			$http.post("ajax/deleteTask.php?taskID="+task).success(function(data) {
				getTask();
			});
		};
	};

	$scope.toggleStatus = function(item, status, task) {
		status = status == '1' ? '0' : '1';
		$http.post("ajax/updateTask.php?taskID="+item+"&status="+status).success(function(data) {
			getTask();
		});
	};
});