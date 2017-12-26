angular.module('P4').component('p4Loggin',{
    
    bindings:{
        onLoggin:'&'
    },

    templateUrl:'p4-loggin.template.html',

    controller: function($scope){
        var ctrl=this;
        ctrl.nbRound=1;
        ctrl.doLoggin = ()=>{
            $scope.start();
        };
        
    }
        
});//end component