function game(){
    this.enter = function(){
    }

    this.draw = function(){
        background(backgroundColor);
        places.forEach(place=> place.display(scene));
        drawText();
        moveButtons();
        setBorders();
    }

    this.keyPressed = function() {
        if (keyCode == 32) {
            if(scene==2&&borderRight==true&&gameMode==0){
                //go to "loading" scene
                this.sceneManager.showScene(working);
            }else if(scene==5&&borderLeft==true){
                //go to "end" page
                gameMode=0;
                sx=0;
                characterWalk = 0;
                direction=0;
                scene=0;
                movement=0;
                this.sceneManager.showScene(endScreen);
            }
            //next scene
            changeScene();
        } 
    }
}