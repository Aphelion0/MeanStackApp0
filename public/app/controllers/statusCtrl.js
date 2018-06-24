angular.module('statusControllers',[])

.controller('statusCtrl',function($http){
	var st=this;
	this.viewStatus=function(){
		$http.get('/statusv').then(function(response){
				st.statusData=response.data;
		},function(response){
			st.statusData=response.data||'Requestfailed';
		});
		};
		});
	