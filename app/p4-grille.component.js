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
            countAlign:1,

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
            //création de la clé ID de la cell qui vient d'être joué
            let key = indexCol + '-' + indexRow;
            
            ctrl.gameData.values[key] = ctrl.currentPlayer.color;

            isWinnerCells(ctrl.checkRows(indexCol,indexRow));
            isWinnerCells(ctrl.checkColumns(indexCol,indexRow));
            isWinnerCells(ctrl.checkDiagNESW(indexCol,indexRow));
            isWinnerCells(ctrl.checkDiagNWSE(indexCol,indexRow));

            // listCellWinner = ctrl.checkRows(indexCol,indexRow);
            // if(Array.isArray(listCellWinner)){
            //     for(let i = 0 ; i < listCellWinner.length; i++){
            //         angular.element(document.getElementById(listCellWinner[i])).addClass('winner-'+ctrl.currentPlayer.color);
            //     }
            // }

            
            // console.log('ROW : %s',ctrl.checkRows(indexCol,indexRow));
            // console.log('COLUMN : %s',ctrl.checkColumns(indexCol,indexRow));
            // console.log('DIAGONALE NE-SW : %s',ctrl.checkDiagNESW(indexCol,indexRow));
            // console.log('DIAGONALE NW-SE : %s',ctrl.checkDiagNWSE(indexCol,indexRow));
            
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
        
        let isWinnerCells = (listCellWinner) =>{
            if(Array.isArray(listCellWinner)){
                for(let i = 0 ; i < listCellWinner.length; i++){
                    angular.element(document.getElementById(listCellWinner[i])).addClass('winner-'+ctrl.currentPlayer.color);
                }
            }
        }

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
            let listCellWinner=[];

            idCol = parseInt(idCol);
            idRow = parseInt(idRow);

            listCellWinner.push(idCol + '-' + idRow);

            for(let col = idCol + 1; col < idCol+4; ++col){
                
                if(ctrl.gameData.values[col + '-' + idRow] && ctrl.gameData.values[col + '-' + idRow] === ctrl.currentPlayer.color){
                    ++countAlign;
                    listCellWinner.push(col + '-' + idRow);
                }
                
            }

            for(let col = idCol - 1; col > idCol-4; --col){
                
                if(ctrl.gameData.values[col + '-' + idRow] && ctrl.gameData.values[col + '-' + idRow] === ctrl.currentPlayer.color){
                    
                    ++countAlign;
                    listCellWinner.push(col + '-' + idRow);
                }

            }

            if(countAlign === p4){

                // console.log('P4 count ==> : %s ',countAlign);
                return listCellWinner.sort();
                // console.log(listCellWinner);
                // return true;
            }
            
            return false;
        };

        ctrl.checkColumns = (idCol,idRow)=>{
            
            let p4 = 4;
            let countAlign = 1;
            let listCellWinner=[];

            idCol = parseInt(idCol);
            idRow = parseInt(idRow);

            listCellWinner.push(idCol + '-' + idRow);
            //TODO penser à simplifier la fonction car on ne vérifie que dans les sens du haut vers le bas
            for(let row = idRow + 1; row < idRow+4; ++row){
                
                if(ctrl.gameData.values[idCol + '-' + row] && ctrl.gameData.values[idCol + '-' + row] === ctrl.currentPlayer.color){
                    ++countAlign;
                    listCellWinner.push(idCol + '-' + row);
                }
                
            }

            for(let row = idRow - 1; row > idRow-4; --row){
                
                if(ctrl.gameData.values[idCol + '-' + row] && ctrl.gameData.values[idCol + '-' + row] === ctrl.currentPlayer.color){
                    ++countAlign;
                    listCellWinner.push(idCol + '-' + row);
                }

            }

            if(countAlign === p4){

                // console.log('P4 count ==> : %s ',countAlign);
                return listCellWinner.sort();
                // console.log(listCellWinner);
                // return true;
            }
            
            return false;
        };

        ctrl.checkDiagNESW = (idCol,idRow)=>{
            
            let p4 = 4;
            let countAlign = 1;
            let listCellWinner=[];

            idCol = parseInt(idCol);
            idRow = parseInt(idRow);
            //on recupere l'id de la cell qui vient d'être joué
            listCellWinner.push(idCol + '-' + idRow);

            for(let row = idRow + 1, col = idCol - 1; row < (idRow + 4) && col > (idCol - 4); ++row, --col){
                
                if(ctrl.gameData.values[col + '-' + row] && ctrl.gameData.values[col + '-' + row] === ctrl.currentPlayer.color){
                    ++countAlign;
                    listCellWinner.push(col + '-' + row);
                }
                
            }

            for(let row = idRow - 1, col = idCol + 1; row > (idRow - 4) && col < (idCol + 4); --row, ++col){
                
                if(ctrl.gameData.values[col + '-' + row] && ctrl.gameData.values[col + '-' + row] === ctrl.currentPlayer.color){
                    ++countAlign;
                    listCellWinner.push(col + '-' + row);
                }

            }

            if(countAlign === p4){

                // console.log('P4 count ==> : %s ',countAlign);
                return listCellWinner.sort();
                // console.log(listCellWinner);
                // return true;
            }
            
            return false;
        };

        ctrl.checkDiagNWSE = (idCol,idRow)=>{
            
            let p4 = 4;
            let countAlign = 1;
            let listCellWinner=[];

            idCol = parseInt(idCol);
            idRow = parseInt(idRow);

            listCellWinner.push(idCol + '-' + idRow);

            for(let row = idRow - 1, col = idCol - 1; row > (idRow - 4) && col > (idCol - 4); --row, --col){
                
                if(ctrl.gameData.values[col + '-' + row] && ctrl.gameData.values[col + '-' + row] === ctrl.currentPlayer.color){
                    ++countAlign;
                    listCellWinner.push(col + '-' + row);
                }
                
            }

            for(let row = idRow + 1, col = idCol + 1; row < (idRow + 4) && col < (idCol + 4); ++row, ++col){
                
                if(ctrl.gameData.values[col + '-' + row] && ctrl.gameData.values[col + '-' + row] === ctrl.currentPlayer.color){
                    ++countAlign;
                    listCellWinner.push(col + '-' + row);
                }

            }
            
            if(countAlign === p4){

                // console.log('P4 count ==> : %s ',countAlign);
                return listCellWinner.sort();
                // console.log(listCellWinner);
                // return true;
            }
            
            return false;
        };

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