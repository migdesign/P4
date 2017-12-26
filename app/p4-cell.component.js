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
            
			ctrl.played = false;//si la cell est jouée
            ctrl.playerClass = '';//class css de la cell
            
			ctrl.play = () => {
                if (!ctrl.played) {//si la cell n'est pas jouée
                
					ctrl.played = true;//la cell devient jouée
					ctrl.playerClass = ctrl.currentPlayer.color;//la class css de la cell devient celle du joueur courant
                    ctrl.onChoose({indexRow: ctrl.indexRow,indexCol:ctrl.indexCol});//la fonction onchoose prend pour parametre indexrow et indexCol
                
                    console.log('Cell : '+ ctrl.currentPlayer);

                } else {
                    // console.warn('Impossible de jouer ici...');
                    alert('Cette cellule a déjà été jouée !');
				}
            };//end play
            
			ctrl.reset = () => {
				ctrl.playerClass = '';
				ctrl.played = false;
            };//end reset
            
			ctrl.$onChanges = (changes) => {
                console.log('change');
				if (changes.currentPlayer.currentValue === '' && changes.currentPlayer.previousValue) {
					ctrl.reset();
				}
			};//end $onChanges
		}//end controller
	});//end component