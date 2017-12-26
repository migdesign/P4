angular.module('P4').controller('P4Controller', function() {
		
		this.playing = false;
		this.results = false;
		this.listNbRound = [1,2,3,5];
		this.nbRound=0;
		
		this.start = () => {
			this.playing = true;
			this.results = false;
			
		};//end start
		this.doStop = () => {
			this.results = true;
			// this.status = status;
			this.playing = false;
		};//end doStop
	});//fin controller