angular.module('P4').component('p4Grille', {
        
    templateUrl: 'p4-grille.template.html',

    bindings: {
        'playing': '<',
        'onStop': '&'
    },
    
    controller: function($scope) {
        
        var ctrl = this;

        ctrl.gameData = {
            players: [{id:0,score:0,name:'',color:'red'}, {id:1,score:0,name:'',color:'yellow'}],
            current: 0,
            values: {},
            nbRound:1,

            status: {
                isDraw: false,
                winner: '',
                playing: false
            },

            switchPlayer: () => {
                if(ctrl.gameData.current === ctrl.gameData.players[0].id){
                    ctrl.gameData.current = ctrl.gameData.players[1].id;
                }else{
                    ctrl.gameData.current = ctrl.gameData.players[0].id;
                }
            }
        };
        
        ctrl.update = () => {
            ctrl.currentPlayer = ctrl.gameData.players[ctrl.gameData.current];
        };
        
        ctrl.doChoose = (indexRow,indexCol) => {
            let key = indexCol + '-' + indexRow;
            ctrl.gameData.values[key] = ctrl.currentPlayer.color;
            
            console.log(ctrl.gameData.values);
            ctrl.checkRows(indexCol,indexRow);
            console.log(ctrl.checkRows(indexCol,indexRow));
            // if (!ctrl.checkWin()) {
                ctrl.gameData.switchPlayer();
                ctrl.update();

                // console.log('Grille : '+ctrl.currentPlayer);
            // } else {
            //     ctrl.gameData.status.winner = ctrl.currentPlayer;
            //     ctrl.onStop({status: ctrl.gameData.status});
            //     ctrl.started = false;
            //     ctrl.currentPlayer = '';
            // }
        };
        
        let checkCase = (c1, c2, c3) => {
            return c1 ? c1 === c2 && c1 === c3 : false;
        };
        
        ctrl.checkWin = () => {
            // Vérification des cases jouées.
            let result = false;
            for (let i = 0; i < 9; ++i) {
                if (i % 3 == 0) {
                    // Lignes
                    result = result || checkCase(
                        ctrl.gameData.values[i],
                        ctrl.gameData.values[i+1],
                        ctrl.gameData.values[i+2]);
                }
                if (i < 3) {
                    // Colonnes
                    result = result || checkCase(
                        ctrl.gameData.values[i],
                        ctrl.gameData.values[i+3],
                        ctrl.gameData.values[i+6]);
                }
            }
            
            // Diagonales
            result = result || checkCase(
                    ctrl.gameData.values[0],
                    ctrl.gameData.values[4],
                    ctrl.gameData.values[8]);
            result = result || checkCase(
                    ctrl.gameData.values[2],
                    ctrl.gameData.values[4],
                    ctrl.gameData.values[6]);
                    
            let isDraw = !result && Object.keys(ctrl.gameData.values).length === 9;
            
            if (result || isDraw) {
                ctrl.gameData.status.isDraw = isDraw;
                return true;
            } else {
                return false;
            }
        };

        ctrl.checkRows = (idCol,idRow)=>{
            
            let p4 = 4;
            let countAlign = 1;

            idCol = parseInt(idCol);
            idRow = parseInt(idRow);

            for(let col = idCol + 1; col < (7 - idCol); ++col){
                
                if(ctrl.gameData.values[col + '-' + idRow] && ctrl.gameData.values[col + '-' + idRow] === ctrl.currentPlayer.color){
                    ++countAlign;
                    console.log('count ==> : %s == col : %s',countAlign,col);
                    if(countAlign === p4)return true;
                    
                }else{
                    countAlign = 1;
                }
                
            }

            // for(let col = idCol - 1; col > (-1 + (6-4)); --col){
            for(let col = idCol - 1; col > idCol-4; --col){
                if(ctrl.gameData.values[col + '-' + idRow] && ctrl.gameData.values[col + '-' + idRow] === ctrl.currentPlayer.color){
                    
                    ++countAlign;
                    console.log('count <== : %s == col : %s',countAlign,col);
                    if(countAlign === p4)return true;
                   
                }else{
                    countAlign = 1;
                }

            }
            return false;
        }
        
        ctrl.started = false;
        
        ctrl.$doCheck = () => {
            if (ctrl.playing && !ctrl.started) {
                ctrl.gameData.players.reverse();
                ctrl.gameData.current = 0;
                ctrl.update();
                ctrl.gameData.values = [];
                ctrl.gameData.status.isDraw = false;
                ctrl.gameData.status.playing = false;
                ctrl.gameData.status.winner = '';
                ctrl.started = true;
            }
        };//end $doCheck
    }//end controller
});