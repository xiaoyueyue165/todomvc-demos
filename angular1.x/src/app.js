angular.module('myApp',[])

  .controller('demoCtrl',demoCtrl)
  
  function demoCtrl($scope,$http){
    $scope.taskList = [];
		
		$http({
			url:'../../static/data.json',
			method:'get'
		}).then(function(res){

			for(var i=0;i<res.data.length;i++){
				res.data[i].isEdit = false;
			}

			$scope.taskList = res.data;
			console.log(res.data)

		})
  }