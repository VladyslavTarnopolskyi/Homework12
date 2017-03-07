var angular = require('angular');
var model = angular.module('todoApp', ['as.sortable']);
model.controller('todoController', function($scope) {
    $scope.taskItem = localStorage.getItem('taskItems')? JSON.parse(localStorage.getItem('taskItems')) : [];
    $scope.saveToLocal = function () {
        localStorage.setItem('taskItems', JSON.stringify($scope.taskItem));
    };
    $scope.updateSelected = function () {
        $scope.doneTodo = $scope.taskItem.filter(function(x) {return x.done}).length;
        $scope.allTodo = $scope.taskItem.length - $scope.doneTodo;
    };

    $scope.add = function() {
        if ($scope.title != '' && $scope.title)
            $scope.taskItem.push({
                name: $scope.title,
                done: false
            });
        $scope.title = '';
        $scope.updateSelected();
        $scope.saveToLocal();
    };

    $scope.delete = function() {
        $scope.taskItem.splice(this.$index, 1);
        $scope.updateSelected();
        $scope.saveToLocal();
    };

    $scope.edit = function () {
        $scope.popup = true;
        let taskIndex = this.$index;
        $scope.editInput = $scope.taskItem[taskIndex].name;
        $scope.save = function () {
            $scope.taskItem[taskIndex].name = $scope.editInput;
            $scope.saveToLocal();
            $scope.popup = false;
        };
        $scope.cancel = function () {
            $scope.popup = false;
        };
    };
    $scope.sortableOpt = {
        dragEnd: function () {
            $scope.saveToLocal();
        }
    };
    $scope.updateSelected();
});