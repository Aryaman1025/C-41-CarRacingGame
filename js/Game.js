class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(225,200);
    car1.addImage(car1image);
    car2 = createSprite(450,200);
    car2.addImage(car2image);
    car3 = createSprite(675,200);
    car3.addImage(car3image);
    car4 = createSprite(900,200);
    car4.addImage(car4image);

    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getRank();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      image(trackImage,0,-displayHeight*4,displayWidth,displayHeight*5);
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 200;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 225;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          stroke("green")
          fill("red")
          ellipse(x,y,75,75);
          
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }

      
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      console.log("hi");
      player.distance +=10
      player.update();
    }
    
    if(player.distance > 4120){
      
      player.rank += 1
      Player.updateRank(player.rank)
      
      textSize(50);
      text(player.name + ": " + player.rank , 120,-displayHeight*4+50)

      gameState = 2
    }

drawSprites();
  }
}