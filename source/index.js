var angular = require('angular');
var model = angular.module('todoApp', ['as.sortable']);
model.controller('todoController', function($scope, $http) {
    $scope.taskItem = [];
    $scope.updateSelected = function () {
        $scope.doneTodo = $scope.taskItem.filter(function(x) {return x.done}).length;
        $scope.allTodo = $scope.taskItem.length - $scope.doneTodo;
    };
    $http({
        method: 'GET',
        url: '/api/v1/todo',
    }).then(function successCallback(response) {
        for(let i = 0; i < response.data.length; i++) {
            $scope.taskItem.push({
                name: response.data[i].item,
                done: response.data[i].done
            });
        }
    }, function errorCallback(response) {
        console.log("error",response);
    });

    $scope.add = function() {
        $http({
            method: 'POST',
            url: '/api/v1/todo',
            data:JSON.stringify({ "todo": {
                item: $scope.title,
                done: false
            }}),
        }).then(function successCallback(response) {
            if ($scope.title != '' && $scope.title)
                $scope.taskItem.push({
                    name: $scope.title,
                    done: false
                });
            $scope.title = '';
            $scope.updateSelected();
            console.log("then POST", response);
            console.log(response.data._id);
        }, function errorCallback(response) {
            console.log("error",response);
        });
    };


    $scope.delete = function() {
        $scope.taskItem.splice(this.$index, 1);
        $scope.updateSelected();
    };

    // $scope.delete = function() {
    //     $http({
    //         method: "DELETE",
    //         url: '/api/v1/todo/' + ''
    //     }).then(function successCallback(response) {
    //         console.log(response);
    //     }, function errorCallback(response) {
    //         console.log("error",response);
    //     });
    // };
    $scope.edit = function () {
        $scope.popup = true;
        let taskIndex = this.$index;
        $scope.editInput = $scope.taskItem[taskIndex].name;
        $scope.save = function () {
            $scope.taskItem[taskIndex].name = $scope.editInput;
            $scope.popup = false;
        };
        $scope.cancel = function () {
            $scope.popup = false;
        };
    };
    $scope.sortableOpt = {
        dragEnd: function () {
            //$scope.saveToLocal();
        }
    };
    $scope.updateSelected();
});