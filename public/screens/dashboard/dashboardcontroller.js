kanbanApp.controller('DashboardController', function($scope, $state, DataService) {
      $scope.myvar=false;
	  $scope.myvar1=false;
	  $scope.myvar2=false;
	  $scope.var4=false;
	  $scope.projects=[];
	  $scope.members=[];
	  $scope.upgrade={};
	  $scope.tags=[];
	  $scope.icon=false;
	  $scope.icon1=false;
	  $scope.var1=true;
     $scope.var2=false;
     $scope.var5=true;
	 $scope.var6=false;
     $scope.n="true";
     $scope.d="true";
     $scope.s="true";
	 $scope.e="true";
	 $scope.p="true";
     $scope.dd="";
	 $scope.var7=false;
	 $scope.dragitem="";
	 $scope.num=0;
	  $scope.projectclick=function(){
	    $scope.myvar=!$scope.myvar;

	    $scope.data4=$scope.obj.email;
	    DataService.getWebService($scope, '/project/fetch/' + $scope.data4, function(err,data){
	    	if(err){
	    		console.log(err);
	    	} else {
	    		$scope.projects=data;
	    		console.log(data);
	    	}
	    });
	 }
	  
	  
	  $scope.addproclick=function(){
	    $scope.myvar1=!$scope.myvar1; 
	 }
	  $scope.nameclick=function(){
	    $scope.myvar2=!$scope.myvar2; 
	  }
	  $scope.showteam=function(){
	    $scope.icon=!$scope.icon;
		console.log($scope.projecttoclick);
	  }
	  $scope.notmembers=function(){
	    $scope.icon1=!$scope.icon1;
	    DataService.getWebService($scope, '/user/signup', function(err,data){
	    	if(err){
	    		console.log(err);
	    		} else {
	    		$scope.members=data;
	    		console.log(data);
	    	}
	    });
	  }
	  $scope.select=function(person){
	     $scope.selectedmember=person.email;
	  }
	  $scope.invite=function(){
	    
	  }
	$scope.addproject=function(){
		var params = {params : {name : $scope.title, email : [$scope.obj.email]}};
		DataService.postWebService($scope, '/project/create', params, function(err,data){
				if(err){
					console.log(err);
				} else {
					if(data.length!=0){
             		window.localStorage.setItem("name", data.name);
		 	 		$scope.myvar3=$scope.title;
		 	 		$scope.order=0;
		 	 		$scope.projects.push({
		 	   		proname:$scope.form1.name
       	     		});
	     	 		$state.go('kanban.dashboard');
		 	 		$scope.myvar1=!$scope.myvar1;
					}
				}
			});
	  }
	  
	  
	   $scope.readtask=function(projct){
	      	$scope.upgrade=projct;
		  	DataService.getWebService($scope, '/task/fetch/' +projct.name+'/'+projct.email, function(err,data){
	    	if(err){
	    		console.log(err);
	    	} else {
	    		$scope.myvar3=projct.name;
		 	  $scope.taskss=data;
		 	  $state.go('kanban.dashboard');
		 	  $scope.order=$scope.taskss.length;
		 	  $scope.myvar=!$scope.myvar;
		 	  $scope.var6=!$scope.var6;
	    	}
	    });
	 }
	
     	
     $scope.showtask=function(){
	  $scope.var1=!$scope.var1;
      $scope.var2=!$scope.var2;	  
	} 
   $scope.addtask=function(){
   		var params = {params : {title:$scope.name1,email:$scope.obj.email,proname:$scope.myvar3,des:$scope.des,due_date:$scope.day,sequence:$scope.order}};
			DataService.postWebService($scope, '/task/create', params, function(err,data){
				if(err){
					console.log(err);
				} else {
					if(data.length!=0){
              			window.localStorage.setItem("title", data.title);
              			window.localStorage.setItem("des", data.des);
		 	 			$scope.order +=1;
               			$scope.taskss.push(data);
		 	 			$scope.des = " ";
		 	 			$scope.name1=" ";
		 	 			$scope.var1=!$scope.var1;
              			$scope.var2=!$scope.var2;
					}
				}
			});
  	  }
	  
	$scope.canceltask=function(){
	   $scope.var1=!$scope.var1;
	   $scope.var2=!$scope.var2; 
	}
	$scope.showdetail=function(detail){
	   console.log(detail);
	   $scope.n=detail.title;
	   $scope.d=detail.des;
	   $scope.s=detail.status;
	   $scope.dd=detail.due_date;
	   $scope.e=detail.email;
	   $scope.p=detail.proname;
	   $scope.var4=!$scope.var4;
	}
	$scope.edit=function(){
       $scope.var5=!$scope.var5; 
   	}
	
	$scope.save=function(){
		var params = {params : {des : $scope.d , due_date : $scope.dd,title : $scope.n}};
			DataService.putWebService($scope, '/task/update/' + $scope.n+'/'+$scope.e+'/'+$scope.p, params, function(err,data){
				if(err){
					console.log(err);
				} else {
					$scope.var4=!$scope.var4;
					console.log(data);
				}
			});
	}
	$scope.projecttoclick=function(pro){
		$scope.var6=!$scope.var6;
		$scope.projecttoclick=pro;
		}
	$scope.rename=function(pro2){
		$scope.var6=!$scope.var6;
		$scope.myvar=!$scope.myvar;
		$scope.var7=!$scope.var7;
		$scope.myvar3=pro2.name;
	}
	$scope.savechange=function(pro1){
		var params = {params : {"name" : $scope.newpro}};
			DataService.putWebService($scope, '/project/update/' + pro1.name, params, function(err,data){
				if(err){
					console.log(err);
				} else {
					DataService.getWebService($scope, '/task/fetch/' + $scope.newpro+'/'+$scope.obj.email, params, function(err,data){
						if(err){
							console.log(err);
						} else {
							$scope.myvar3=$scope.newpro;
		 	  				$scope.taskss=data1;
		 	  				$state.go('kanban.dashboard');
		 	  				$scope.order=$scope.taskss.length;
		 	  				$scope.var7=!$scope.var7;
						}
					});
					console.log(data);
				}
			});
	}
	
	$scope.handleDragStart = function(data,event){
		console.log("old seq of task to drop "+data.sequence);
    };

  $scope.handleDragOver = function (dropedTask, event, belowTask) {
    var oldSeq = dropedTask.sequence;
	var firstSeq = belowTask.sequence;
	var index = -1;
	var secondSeq = -1;
	for(var i = 0; i < $scope.taskss.length; i++)
	{
		var seq = $scope.taskss[i].sequence;
		if(oldSeq < firstSeq){
			if(seq > firstSeq){
				if(secondSeq == -1 || secondSeq > seq){
					index = i;
					secondSeq = seq
				}
			}
		} else {
			if(seq < firstSeq){
				if(secondSeq == -1 || secondSeq < seq){
					index = i;
					secondSeq = seq
				}
			}
		}
	}
	
	console.log("First seq:" + firstSeq + ", second seq:" + secondSeq);
	if(secondSeq == -1){
		secondSeq = oldSeq < firstSeq ? firstSeq + 1 : firstSeq - 1; 
	}
	
	dropedTask.sequence = (firstSeq + secondSeq) / 2;
	var params = {params : {sequence: dropedTask.sequence}};
		DataService.putWebService($scope, '/task/update/' + dropedTask.title + '/' +dropedTask.email + '/' + dropedTask.proname, params, function(err, data){
			if(err){
				console.log(err);
			} else {
				console.log(data);
			}

		});
};
$scope.handleprogressDragOver = function (dropedTask, event, belowTask) {
	var params = {params : {status: "inprogress"}};
	DataService.putWebService($scope, '/task/update/' +dropedTask.title + '/' + dropedTask.email + '/' + dropedTask.proname, params, function(err, data){
		if(err){
			console.log(err);
		} else {
			console.log(data);
		}
	});
	DataService.getWebService($scope, '/task/fetch/' + dropedTask.proname + '/' + dropedTask.email, params, function(err,data){
		if(err){
			console.log(err);
		} else {
			$scope.taskss = data;
			console.log(data);
		}
	});
};
$scope.handlecompleteDragOver = function (dropedTask, event, belowTask) {
	var params = {params : {status: "complete"}};
	DataService.putWebService($scope, '/task/update/' + dropedTask.title + '/' +dropedTask.email + '/' + dropedTask.proname, params, function(err, data){
		if(err){
			console.log(err);
		} else {
			console.log(data);
		}
	});
	DataService.getWebService($scope, '/task/fetch/' + dropedTask.proname + '/' + dropedTask.email, params, function(err,data){
		if(err){
			console.log(err);
		} else {
			$scope.taskss = data;
			console.log(data);
		}
	});
};
});