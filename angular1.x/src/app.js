angular.module('myApp', [])

	.controller('demoCtrl', demoCtrl)

function demoCtrl($scope, $http) {

	// 1.获取任务并显示到页面中
	$scope.taskList = [];

	$http({
		url: '../static/data.json',
		method: 'get'
	}).then(function (res) {

		for (var i = 0; i < res.data.length; i++) {
			res.data[i].isEdit = false;
		}

		$scope.taskList = res.data;
		console.log(res.data)

	})

	// 2.添加任务
	$scope.submitTask = function () {

		$scope.taskList.push({
			id: Math.random(),
			name: $scope.task,
			isCompleted: false
		});
		$scope.task = '';
	}
	// 3.删除单个任务
	$scope.deleteTask = function (id) {
		for (var i = 0; i < $scope.taskList.length; i++) {
			if ($scope.taskList[i].id == id) {
				$scope.taskList.splice(i, 1);
			}
		}
	}

	// 4.更改任务状态
	//(1).将复选框和数据做关联
	//(2).将数据和类名做关联(就是利用数据的值[true|false] 来决定是否添加类名)

	// 5.增加筛选功能
	$scope.condition = '';

	$scope.filterTask = function (type) {
		switch (type) {
			case 'All':
				$scope.condition = '';
				break;

			case 'Active':
				$scope.condition = false;
				console.log('筛选结果' + $scope.condition)
				break;

			case 'Completed':
				$scope.condition = true;
				break;

		}

	}

	// 6.计算未完成的数量
	$scope.calcNumber = function () {
		var result = 0;
		for (var i = 0; i < $scope.taskList.length; i++) {
			if (!$scope.taskList[i].isCompleted) {
				result++;
			}
		}
		return result;
	}
	// 7.清空已完成的任务
	$scope.clearData = function () {
		for (var i = 0; i < $scope.taskList.length; i++) {
			if ($scope.taskList[i].isCompleted) {
				$scope.taskList.splice(i, 1)
				i--;
			}
		}
	}


	// 8.批量修改任务状态
	// 给全选按钮绑定一个变量，使用变量的值判断
	$scope.changeStatus = function () {
		for (var i = 0; i < $scope.taskList.length; i++) {

			$scope.taskList[i].isCompleted = $scope.status;

		}
	}
	// 9.修改任务名称
	$scope.modifyData = function (id) {
		for (var i = 0; i < $scope.taskList.length; i++) {

			if ($scope.taskList[i].id == id) {
				$scope.taskList[i].isEdit = true;

			} else {
				$scope.taskList[i].isEdit = false;
			}
		}
	}
	$scope.blurFn = function () {
		for (var i = 0; i < $scope.taskList.length; i++) {
			$scope.taskList[i].isEdit = false;

		}

	}


}
