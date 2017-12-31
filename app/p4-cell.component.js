angular.module('P4').component('p4Cell', {

		templateUrl: 'p4-cell.template.html',
		bindings: {
            'indexRow': '@',
            'indexCol':'@',
			'currentPlayer': '<',
			'onChoose': '&'
        },
        
		controller: function() {

            var ctrl = this;
            
            ctrl.playerClass = '';//class css de la cell
            
			ctrl.play = () => {
   
                for(let row = 5; row > -1; --row ){

                    let IdDiv = ctrl.indexCol+'-'+row;
                    //teste si la div n'est ni "red" ni "yellow"
                    if(!angular.element(document.getElementById(IdDiv)).hasClass('red') && !angular.element(document.getElementById(IdDiv)).hasClass('yellow')){
                
                        ctrl.playerClass = ctrl.currentPlayer.color;//la class css de la cell devient celle du joueur courant
                        ctrl.onChoose({indexRow: row,indexCol:ctrl.indexCol});//la fonction onchoose prend pour parametre indexrow et indexCol
                        
                        ctrl.reset();
                        
                        angular.element(document.getElementById(IdDiv)).addClass(ctrl.currentPlayer.color);
                        angular.element(document.getElementById(IdDiv)).html(IdDiv);
                        break;
                    }

                }//end for "row"
 
            };//end play
            
			ctrl.reset = () => {
				ctrl.playerClass = '';
				ctrl.played = false;
            };//end reset
            
			ctrl.$onChanges = (changes) => {
                // console.log('change');
				if (changes.currentPlayer.currentValue === '' && changes.currentPlayer.previousValue) {
					ctrl.reset();
				}
			};//end $onChanges
		}//end controller
	});//end component