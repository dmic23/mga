(function () {
    'use strict';

    angular
        .module('main.directives')
        .directive('studentPlan', studentPlan);

    studentPlan.$inject = ['$sce', 'Users', 'Main', '$uibModal', 'Upload'];

    function studentPlan($sce, Users, Main, $uibModal, Upload) {

        var directive = {
            restrict: 'EA',
            scope: {
                tempType: '=',
                authAcct: '=',
                userId: '=',
                plans: '=',
                path: '='
            },
            link: function(scope, elem, attrs){

                scope.searchItem  = '';

                scope.$watch('plans', function(newValue, oldValue) {
                    if(newValue){
                        groupPlans(newValue);
                    }
                }); 

                function groupPlans(StudentPlans){
                    scope.sortedPlans = _.groupBy(StudentPlans, 'plan_week')
                }

                scope.openPlan = function(selectedPlan, edit){

                    scope.selectedPlan = selectedPlan;
                    var schedulePlan = _.clone(selectedPlan);

                    var modalInstance = $uibModal.open({
                        templateUrl: $sce.trustAsResourceUrl(static_path('views/modals/student-plan.modal.html')),
                        controller: function($scope, $uibModalInstance){
                            var vm = this;
                            vm.path = scope.path;

                            vm.plan_files = scope.selectedPlan.student_plan_file

                            if(scope.authAcct.is_staff){
                                vm.authAcct = scope.authAcct;

                                Users.getAll()
                                    .then(function(response){
                                        vm.allUsers = response;
                                    });
                            }

                            if(schedulePlan.id && edit){
                                vm.edit = true;
                                vm.modalTitle = "Update";
                                vm.plan = schedulePlan;
                            } else if(schedulePlan.id && !edit){
                                vm.edit = false;
                                vm.modalTitle = "";
                                vm.plan = schedulePlan;
                            } else {
                                vm.edit = true;
                                vm.modalTitle = "New";
                                vm.plan = {};
                            }

                            vm.closeModal = function(){
                                $uibModalInstance.dismiss('cancel');
                            };

                            vm.submitPlan = function(studentPlan){
                                scope.sendPlan(studentPlan);

                                $uibModalInstance.close();
                            };

                            vm.removePlanFile = function(file){
                                scope.removePlanFile(file);
                            }

                        },
                        controllerAs: 'vm',
                        size: 'lg',

                    });
                };

                scope.sendPlan = function(newPlan){

                    if(newPlan.students.length > 1 && newPlan.students[0].id){
                        newPlan['students'] = _.pluck(_.clone(newPlan.students), 'id');
                    }

                    if(newPlan.student_plan_file){
                        // var updPlanFiles = _.clone(newPlan.student_plan_file);
                        // console.log(updPlanFiles);
                        var updPlan =  _.omit(newPlan, 'student_plan_file');
                        // updPlan['files'] = [];
                        // updPlan['files'].push(updPlanFiles);
                    } else {
                        var updPlan = newPlan;
                    }

                    if(newPlan.id){
                        var planUrl = 'api/v1/student-plan/'+newPlan.id+'/';
                        var planMethod = 'PUT';
                    } else {
                        var planUrl = 'api/v1/student-plan/';
                        var planMethod = 'POST';
                    }

                    Upload.upload({
                        url: planUrl,
                        data: updPlan,
                        method: planMethod,
                    })
                    .then(function(response){
                        if(newPlan.id){
                            var index = scope.plans.indexOf(scope.selectedPlan);
                            scope.plans[index] = response.data;
                        } else {
                            scope.plans.push(response.data);
                        }
                        groupPlans(scope.plans);
                    }, function(errorMsg){
                        console.log('Error status: ' + errorMsg.status);
                    }, function(evt){
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        scope.fileProgress = progressPercentage;
                    });
                }

                scope.removePlanFile = function(file){
                    Users.deleteStudentPlanFile(file)
                        .then(function(response){
                            var index = scope.selectedPlan.student_plan_file.indexOf(file);
                            scope.selectedPlan.student_plan_file.splice(index, 1); 
                        })
                        .catch(function(errMsg){
                            console.log(errMsg);
                        })
                } 

                scope.removePlan = function(plan){
                    Users.deleteStudentPlan(plan)
                        .then(function(response){
                            var index = scope.plans.indexOf(plan);
                            scope.plans.splice(index, 1); 
                            groupPlans(scope.plans);
                        })
                        .catch(function(errMsg){
                            console.log(errMsg);
                        })
                    
                } 

                groupPlans(scope.plans);           
            },
            templateUrl: function(elem,attrs) {
                return $sce.trustAsResourceUrl(static_path('views/directives/student-plan-'+attrs.tempType+'.directive.html'));
            }

        }
        return directive;
    }
})();