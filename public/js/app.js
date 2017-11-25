const app=angular.module('myapp',['ngRoute','ngMessages']);
app.config(function($routeProvider,$locationProvider){
    $routeProvider.when('/',{
        templateUrl:'views/search.html',
        controller:'Acontroller'
    });
    
    $locationProvider.html5Mode(true);	
})

app.run(function(){
    console.log("app.run running");
});


app.controller("Acontroller",function($scope,$http,$location){
    $scope.submitForm=function(){
console.log($scope.body); // both are returning undefined
//  $http({
//      url:'/registration',
//      method:'POST',
//      data:$scope.body
//  }).then(function(res){
//     $location.path('/createTodo')
//     console.log(res)
//  },function(response){
//      console.log(res)
//     })
    }
})
 
