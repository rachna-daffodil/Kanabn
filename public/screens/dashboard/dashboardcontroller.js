kanbanApp.controller('DashboardController', function($scope, $state, ngDialog, DataService) {
      $scope.username = window.localStorage.getItem("name");
      $scope.useremail = window.localStorage.getItem("email");
	  $scope.projects=[];	  $scope.members=[];    	  $scope.tags=[];
	  $scope.var1=true;    $scope.selectedmember = [];
     $scope.var2=false;
     $scope.var5=true;
	 $scope.n="true";    $scope.d="true";  $scope.s="true";	 $scope.e="true";
	 $scope.p="true";     $scope.dd="";
	 $scope.var7=false;
	 $scope.dragitem="";
	 $scope.num=0;
	  $scope.projectclick=function(){
	    $scope.myvar = !$scope.myvar;
	    DataService.getWebService($scope, '/project/fetch/' + $scope.useremail, function(err,data){
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

	 $scope.addproject=function(){
		var params = {projectName : $scope.title, email : [$scope.useremail]};
		DataService.postWebService($scope, '/project/create', params, function(err,data){
				if(err){
					console.log(err);
				} else {
					if(data.length!=0){
             		window.localStorage.setItem("projectName", data);
		 	 		$scope.myvar3=window.localStorage.getItem("projectName");
		 	 		$scope.order=0;
		 	 		$scope.projects.push({
		 	   			projectName : data
       	     		});
	     	 		$state.go('dashboard.project');
		 	 		$scope.myvar1=!$scope.myvar1;
					}
				}
			});
	  }
	  
	  $scope.nameclick=function(){
	    $scope.myvar2=!$scope.myvar2; 
	  }
	  $scope.showteam=function(){
	    $scope.icon=!$scope.icon;
		console.log($scope.myvar3);
	  }
	  $scope.notmembers=function(){
	    $scope.icon1=!$scope.icon1;
	    DataService.getWebService($scope, '/user/signup/' +$scope.myvar3.email, function(err,data){
	    	if(err){
	    		console.log(err);
	    		} else {

	    		$scope.members=data;
	    		console.log(data);
	    	}
	    });
	  }
	  $scope.select=function(person){
	     $scope.selectedmember.push(person.email);
	     console.log("array is "+$scope.selectedmember);
	  }
	  $scope.invite=function(){
	  	var params = {"email" : $scope.selectedmember };
	   	DataService.putWebService($scope, '/project/updateemail/' +$scope.myvar3.projectName +'/'+$scope.selectedmember, params, function(err,data){
	    	if(err){
	    		console.log(err);
	    	} else { console.log($scope.myvar3+'/'+$scope.myvar3.email);
	    		console.log("result of array update "+data);
	    		$scope.icon1 = !$scope.icon1;
	    		$scope.selectedmember = [];
	    	}
	    }); 
	  }
	
	  
	   $scope.readtask=function(projct){
	      	$scope.myvar3 = projct;
		  	DataService.getWebService($scope, '/task/fetch/' +projct._id, function(err,data){
	    	if(err){
	    		console.log(err);
	    	} else { console.log($scope.myvar3+'/'+$scope.myvar3.email);
	    		$scope.taskss=data;
		 	  	$state.go('dashboard.project');
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
   		var params = {taskname:$scope.name1,project_id:$scope.myvar3._id,description:$scope.des,due_date:$scope.day,sequence:$scope.order};
			DataService.postWebService($scope, '/task/create', params, function(err,data){
				if(err){
					console.log(err);
				} else {
					if(data.length!=0){
              			window.localStorage.setItem("title", data.taskname);
              			window.localStorage.setItem("des", data.description);
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
	   $scope.n=detail.taskname;
	   $scope.d=detail.description;
	   $scope.s=detail.status1;
	   $scope.dd=detail.due_date;
	   $scope.c=detail.created_by;
	   $scope.p=detail.project_id;
	   $scope.cd=detail.completion_date;
	   $scope.md=detail.modified_date;
	   $scope.com=detail.comments;
	   $scope.var4=!$scope.var4;
	}
	$scope.edit=function(){
       $scope.var5=!$scope.var5; 
   	}
	
	$scope.save=function(){
		var params = {description : $scope.d , due_date : $scope.dd,taskname : $scope.n, status1:$scope.s, created_by:$scope.c, completion_date:$scope.cd, modified_date:$scope.md, comments:$scope.com};
			DataService.putWebService($scope, '/task/update/' + $scope.p, params, function(err,data){
				if(err){
					console.log(err);
				} else {
					$scope.var4=!$scope.var4;
					console.log(data);
				}
			});
	}
	$scope.projecttoclick=function(){
		$scope.var6=!$scope.var6;
		}
	$scope.rename=function(pro2){
		console.log(pro2);
		;
		$scope.var6=!$scope.var6;
		$scope.myvar=!$scope.myvar;
		$scope.var7=!$scope.var7;
		$scope.myvar3=pro2.projectName;
	}
	$scope.savechange=function(pro1){
		var params = {"projectName" : $scope.newpro};
			DataService.putWebService($scope, '/project/update/' + pro1.projectName, params, function(err,data){
				if(err){
					console.log(err);
				} else {
					DataService.getWebService($scope, '/task/fetch/' + pro1._id, function(err,data){
						if(err){
							console.log(err);
						} else {
							$scope.myvar3=$scope.newpro;
		 	  				$scope.taskss=data;
		 	  				$state.go('dashboard');
		 	  				$scope.order=$scope.taskss.length;
		 	  				$scope.var7=!$scope.var7;
						}
					});
					console.log(data);
				}
			});
	}
	
	$scope.showprofile = function(){
		ngDialog.open({ 
                        template: '<form>\
                        				<label for="title" class="brdlabel">Title</label><br><input id="title" data-ng-model="n" ng-readonly="var5"/><br>
	   <label for="title" class="brdlabel">Description</label><br><input id="title" type="text" data-ng-model="d" ng-readonly="var5"/><br>
	   <label for="title" class="brdlabel">Status</label><br><input id="title" type="text" data-ng-model="s" ng-readonly="var5"/><br>
	   <label for="title" class="brdlabel">Created-by</label><br><input id="title" type="date" data-ng-model="c" ng-readonly="var5"/><br>
	   <label for="title" class="brdlabel">Assigned-date</label><br><input id="title" data-ng-model="a" ng-readonly="var5"/><br>
	   <label for="title" class="brdlabel">Due-date</label><br><input id="title" type="text" data-ng-model="d" ng-readonly="var5"/><br>
	   <label for="title" class="brdlabel">Completion-date</label><br><input id="title" type="text" data-ng-model="cd" ng-readonly="var5"/><br>
	   <label for="title" class="brdlabel">Modified-date</label><br><input id="title" type="date" data-ng-model="md" ng-readonly="var5"/><br>
	   <label for="title" class="brdlabel">Comments</label><br><input id="title" type="text" data-ng-model="com" ng-readonly="var5" style="margin-bottom:10px"/><br>
	   <button type="submit" data-ng-click="save()">Save</button>
		</form>',
                              plain: true,
                              scope: $scope,
                              controller: ['$scope', function($scope) {
                                                    console.log("dvcsdbhvujdsnhv duj");
                                           }]

                });
	};
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
	var params = {sequence: dropedTask.sequence};
		DataService.putWebService($scope, '/task/update/' + dropedTask.project_id +'/'+ dropedTask.taskname, params, function(err, data){
			if(err){
				console.log(err);
			} else {
				console.log(data);
			}

		});
};
$scope.handleprogressDragOver = function (dropedTask, event, belowTask) {
	var params = {status1: "inprogress"};
	DataService.putWebService($scope, '/task/update/' +dropedTask.project_id +'/'+ dropedTask.taskname, params, function(err, data){
		if(err){
			console.log(err);
		} else {
			console.log(data);
		}
	});
	DataService.getWebService($scope, '/task/fetch/' + dropedTask.project_id, function(err,data){
		if(err){
			console.log(err);
		} else {
			$scope.taskss = data;
			console.log(data);
		}
	});
};
$scope.handlecompleteDragOver = function (dropedTask, event, belowTask) {
	var params = {status1: "complete"};
	DataService.putWebService($scope, '/task/update/' + dropedTask.project_id +'/'+ dropedTask.taskname, params, function(err, data){
		if(err){
			console.log(err);
		} else {
			console.log(data);
		}
	});
	DataService.getWebService($scope, '/task/fetch/' + dropedTask.project_id, function(err,data){
		if(err){
			console.log(err);
		} else {
			$scope.taskss = data;
			console.log(data);
		}
	});
};
});