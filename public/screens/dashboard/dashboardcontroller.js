kanbanApp.controller('DashboardController', function($scope, $state, ngDialog, DataService) {
      $scope.username = window.localStorage.getItem("name");
      $scope.useremail = window.localStorage.getItem("email");
	  $scope.projects=[];	  $scope.members=[];    	  $scope.tags=[];
	  $scope.var1=true;    $scope.selectedmember = [];    $scope.comments = [];
     $scope.var2=false;
     $scope.var5=true;
	 $scope.n="true";    $scope.d="true";  $scope.s="true";	 $scope.e="true";
	 $scope.p="true";     $scope.dd="";
	 $scope.var7=false;
	 $scope.dragitem="";
	 $scope.num=0;   $scope.var9 = false;
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
	   	DataService.putWebService($scope, '/project/updateemail/' +$scope.myvar3._id +'/'+$scope.selectedmember, params, function(err,data){
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
   		var params = {taskname:$scope.name1,project_id:$scope.myvar3._id,description:$scope.des,due_date:$scope.day,sequence:$scope.order, created_by :$scope.useremail};
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
	   
	   $scope.n=detail.taskname;
	   $scope.d=detail.description;
	   $scope.s=detail.status1;
	   $scope.dd=detail.due_date;
	   $scope.c=detail.created_by;
	   $scope.p=detail.project_id;
	   $scope.cd=detail.completion_date;
	   $scope.md=detail.modified_date;
	   $scope.var4=!$scope.var4;
	   $scope.comments = detail.comments;
	}
	$scope.edit=function(){
       $scope.var5=!$scope.var5; 
   	}
	
	$scope.save=function(){
		var params = {description : $scope.d , due_date : $scope.dd,taskname : $scope.n, status1:$scope.s, created_by:$scope.c, completion_date:$scope.cd, assigned_to:$scope.md};
			DataService.putWebService($scope, '/task/update/' + $scope.p + '/'+$scope.n, params, function(err,data){
				if(err){
					console.log(err);
				} else {
					$scope.var4=!$scope.var4;
					console.log(data);
				}
			});
	}

	$scope.savecomment = function(){
		var params = {email : $scope.useremail, comment : $scope.com};
			DataService.putWebService($scope, '/task/update/' + $scope.p + '/'+$scope.n, params, function(err,data){
				if(err){
					console.log(err);
				} else {
					$scope.var10=!$scope.var10;
					console.log(data);
				}
			});
	}

	$scope.projecttoclick=function(){
		$scope.var6=!$scope.var6;
		}
	$scope.rename=function(pro2){
		console.log(pro2);
		$scope.var7=!$scope.var7;
		
	}
	$scope.savechange=function(pro1){
		var params = {"projectName" : $scope.newpro};
			DataService.putWebService($scope, '/project/update/' + pro1._id, params, function(err,data){
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
	
	$scope.showprofile = function(profile){
		DataService.getWebService($scope, '/user/signin/' + profile, function(err,data){
			if(err){
				console.log(err);
			} else {
				console.log("fcdcdscf",data)
				$scope.var9 = !$scope.var9;
				$scope.myvar2 = !$scope.myvar2;
				$scope.name = data[0].name;
				$scope.email = data[0].email;
				$scope.mobile = data[0].mobile;
				$scope.skype = data[0].skype;
				$scope.pass = data[0].password;
				console.log("Fffbfb "+$scope.var9+$scope.name+$scope.email);
			}
		});
		
		// ngDialog.open({ 
  //                       template: '<form>\
  //                       				<label for="title" class="brdlabel">First Name</label><br><input id="title" ng-readonly="var5"/><br>\
  //                       				<label for="title" class="brdlabel">Last Name</label><br><input id="title" ng-readonly="var5"/><br>\
	 //   <label for="title" class="brdlabel">Email</label><br><input id="title" type="email" ng-readonly="var5"/><br>\
	 //   <label for="title" class="brdlabel">Mobile</label><br><input id="title" type="text" ng-readonly="var5"/><br>\
	 //   <label for="title" class="brdlabel">Skype</label><br><input id="title" type="text" ng-readonly="var5"/><br>\
	 //   <button type="submit" data-ng-click="save()">Save</button>\
		// </form>',
  //                             plain: true,
  //                             scope: $scope,
  //                             controller: ['$scope', function($scope) {
  //                                                   console.log("dvcsdbhvujdsnhv duj");
  //                                          }]

  //               });
	};

	$scope.invitemember = function(){
		$scope.var8 = !$scope.var8;
	};
	$scope.inviteemail = function(){
		console.log($scope.newmember);
		DataService.getWebService($scope, '/user/invite/' + $scope.newmember +'/'+$scope.myvar3._id, function(err,data){
						if(err){
							console.log(err);
						} else {
							$scope.var8 = !$scope.var8;
						}
					});
	};

	$scope.saveprofile = function(){
		var params = {name : $scope.name, mobile : $scope.mobile, skype : $scope.skype};
		DataService.putWebService($scope, '/user/signup/'+ $scope.useremail, params, function(err,data){
			if(err){
				console.log(err);
			} else {
				$scope.var9 = !$scope.var9;
				$scope.username = $scope.name;
			}
		});
	};

	$scope.changepass = function(){
		$scope.var10 = !$scope.var10;
		$scope.myvar2 = !$scope.myvar2;
	};

	$scope.savepass = function(){
		if($scope.old == $scope.pass){
		if($scope.new1 == $scope.new2){
			var params = {password : $scope.new1};
			DataService.putWebService($scope, '/user/signup/'+ $scope.useremail, params, function(err,data){
			if(err){
				console.log(err);
			} else {
				$scope.var10 = !$scope.var10;
				console.log("dvdvdvdv",data);
			}
		});
		} else {
		alert("Confirm your new password");
	}
	} else {
		alert("enter old password");
	}
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
	if(!dropedTask.assigned_date){
		alert("Before drop please assign time to task");
	} else {
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
}
};
$scope.handlecompleteDragOver = function (dropedTask, event, belowTask) {
	var params = {status1: "complete", email : dropedTask.created_by};
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