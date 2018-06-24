angular.module('updateControllers',['updateServices'])

.controller('updateCtrl',function($http,Upd){
	var app=this;
	this.updateUser=function(updateData){
				Upd.update(app.updateData).then(function(data){
						if(data.data.success){
							console.log("It works");
						}
						else{
							console.log("At least no injection err duh!");
						}
				});
		};
	});