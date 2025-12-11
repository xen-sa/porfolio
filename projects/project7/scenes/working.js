function working(){
    let showUntilFrame;
    let startFrame;
    let startColor;
    let endColor;

    this.enter = function(){
        startFrame=frameCount;
        showUntilFrame = startFrame + 299;
        startColor=color("#81c0eb");
        endColor=color("#204675");
    }

    this.draw = function(){
        let progress = (frameCount - startFrame) / 300;
        progress = constrain(progress, 0, 1);

        let bg = lerpColor(startColor, endColor, progress);
        background(bg);

        let step = floor(frameCount / 30) % 4;
        let dots = ".".repeat(step);
        let loadingText = "The day goes by" + dots;

        push();
        fill("white");
        textSize(width/25);
        text(loadingText, halfWidth, halfHeight);
        pop();
        
        if(frameCount==showUntilFrame){
            gameMode=1;
            direction=1;
            scene++;
            this.sceneManager.showScene(game);
            backgroundColor="#8b707fff"
        }
    }

}