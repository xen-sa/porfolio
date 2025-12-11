function homepage(){
    this.enter = function(){
    }

    this.draw = function(){
        background(backgroundColor);
        let textSmallSize=width/70
        let pulse = sin(frameCount * 0.05);
        let pulsingSize = textSmallSize + pulse * (textSmallSize * 0.08); 

        push();
        imageMode(CENTER);
        image(titleImage, halfWidth, height*0.40);
        pop();

        push();
        textSize(pulsingSize);
        fill("#caaec7");
        text("Press space to start playing", halfWidth, height*0.75);
        pop();
    }

    this.keyPressed = function() {
        //start game
        if (keyCode == 32) {
            backgroundColor="#e8c7e3"
            this.sceneManager.showScene(game);
        }
    }
}