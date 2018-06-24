angular.module('mainController',['authServices'])

.controller('mainCtrl',function(Auth,$timeout,$location){
		var app=this;


		this.doLogin=function(loginData){
			app.loading=true;
			app.errorMsg=false;
			app.islogged=false;

			Auth.login(app.loginData).then(function(data){
				if(data.data.success){
					app.loading=false;
					app.islogged=true;
					app.successMsg=data.data.message+ "...Redirecting";

					$timeout(function(){
						$location.path('/about');
					},2000);
						}
					else
					{
						app.islogged=false;
						app.loading=false;
							app.errorMsg=data.data.message;
					}
					});
				};


			});
	

