var GamePlay = {
    init: function() {
        GamePlay.canvas = document.getElementById('game_view');
        $('.pause').bind('click', function() { GamePlay.mode = "pause";});
        $('.play').bind('click', function() { GamePlay.mode = "play"; Board.processMove(); GamePlay.draw();});
        $('.forward').bind('click', function() { Board.processMove(); GamePlay.draw();});
        $('.newgame').bind('click', function() { GamePlay.setupNewGame();});
        $('.reset').bind('click', function() { Board.reset();});
        $('#set_board').bind('click', function() { GamePlay.setBoardNumber();});
        $('#board_number').bind('keyup', function(e) { if(e.keyCode == 13) {GamePlay.setBoardNumber();}});

        $('#check_breadcrumbs').click(function(evt) {
          if (evt.srcElement.checked) {
            GamePlay.show_breadcrumbs = true;
          } else {
            GamePlay.show_breadcrumbs = false;
          }
        });

        GamePlay.show_breadcrumbs = false;
        var itemImageUrls = ["assets/images/FruitApple.png", "assets/images/FruitBanana.png", "assets/images/FruitCherry.png", "assets/images/FruitMelon.png", "assets/images/FruitOrange.png"];
        GamePlay.itemImages = new Array();
        for (var i=0; i<itemImageUrls.length; i++) {
            var img = new Image();
            img.src = itemImageUrls[i];
            GamePlay.itemImages[i] = img;
        }
        GamePlay.player_one_image = new Image();
        GamePlay.player_one_image.src = "assets/images/FruitBlueBot.png";
        GamePlay.player_two_image = new Image();
        GamePlay.player_two_image.src = "assets/images/FruitPurpleBot.png";
        GamePlay.visitedImg = new Image();
        GamePlay.visitedImg.src = "assets/images/FruitCellVisited.png";
        GamePlay.bothVisitedImg = new Image();
        GamePlay.bothVisitedImg.src = "assets/images/FruitCellVisitedBoth.png";
        GamePlay.oppVisitedImg = new Image();
        GamePlay.oppVisitedImg.src = "assets/images/FruitCellOppVisited.png";
        GamePlay.itemImages[itemImageUrls.length - 1].onload = function(){
            GamePlay.setupNewGame();
        };

    },
    setupNewGame: function(boardNumber) {
        // Create a new board setup according to the following priority:
        //
        // 1. If a board number is passed in, use that.
        // 2. If the bot has default_board_number() defined, use that.
        // 3. Generate a random board number.
        var nextBoardNum;

        if(boardNumber === undefined) {
            if ( typeof default_board_number == 'function' && !isNaN(parseInt(default_board_number()))) {
                nextBoardNum = default_board_number()
            } else {
                Math.seedrandom();
                nextBoardNum = Math.min(Math.floor(Math.random() * 999999), 999999);
            }
        } else {
            nextBoardNum = boardNumber;
        }

        $('#board_number').val(nextBoardNum);

        Board.init(nextBoardNum);

        Board.newGame();
        GamePlay.itemTypeCount = get_number_of_item_types();
        document.getElementById('grid').width = WIDTH * 50;
        document.getElementById('grid').height = HEIGHT * 50;
        document.getElementById('game_view').width = WIDTH * 50;
        document.getElementById('game_view').height = HEIGHT * 50;
        $('#buttons').css('padding-left', 0);
        $('#buttons').css('padding-top', HEIGHT * 50);
        Grid.draw();
        GamePlay.start();
    },
    start: function() {
        GamePlay.mode = "pause";
        GamePlay.draw();
    },
    draw: function() {
        var ctx = GamePlay.canvas.getContext('2d');
        ctx.clearRect(0,0,GamePlay.canvas.width,GamePlay.canvas.height);
        GamePlay.drawItems(ctx, Board.board, Board.history);
        GamePlay.drawPlayerTwo(ctx, Board.board);
        GamePlay.drawPlayerOne(ctx, Board.board);
        GamePlay.displayScore(ctx, Board.board);
        if (GamePlay.mode == "play") {
           var score = Board.checkGameOver();
           if (score !== undefined) {
               if (score > 0) {
                   document.getElementById("p1_desc").innerHTML = 'Player 1 (<img src="assets/images/FruitBlueBot.png" style="vertical-align: middle; border: 0; width: 20px; height: 20px;">): ' + Player1.name + " wins!!!";
               }
               if (score < 0) {
                   document.getElementById("p2_desc").innerHTML = 'Player 2 (<img src="assets/images/FruitPurpleBot.png" style="vertical-align: middle; border: 0; width: 20px; height: 20px;">): ' + Player2.name + " wins!!!";
               }
               if (score == 0) {
                   document.getElementById("p1_desc").innerHTML = 'Player 1 (<img src="assets/images/FruitBlueBot.png" style="vertical-align: middle; border: 0; width: 20px; height: 20px;">): ' + Player1.name + " ties.";
                   document.getElementById("p2_desc").innerHTML = 'Player 2 (<img src="assets/images/FruitPurpleBot.png" style="vertical-align: middle; border: 0; width: 20px; height: 20px;">): ' + Player2.name + " ties.";
               }
               GamePlay.mode = "pause";
               return;
           }
           Board.processMove();
           setTimeout(function() {GamePlay.draw();}, 500);
        } else {
           GamePlay.mode = "pause";
        }
    },
    displayScore: function(ctx, state) {
          document.getElementById("p1_desc").innerHTML = 'Player 1 (<img src="assets/images/FruitBlueBot.png" style="vertical-align: middle; border: 0; width: 20px; height: 20px;">): ' + Player1.name;
          document.getElementById("p2_desc").innerHTML = 'Player 2 (<img src="assets/images/FruitPurpleBot.png" style="vertical-align: middle; border: 0; width: 20px; height: 20px;">): ' + Player2.name;
          
          for (var i=1; i<=GamePlay.itemTypeCount; ++i) {
               document.getElementById("totf" + i).innerHTML = "(" + (Board.totalItems[(i-1)]-Board.myCollected[(i-1)]-Board.oppCollected[(i-1)]) + ")";
          }
          for (var i=1; i<=GamePlay.itemTypeCount; ++i) {
               document.getElementById("p1f" + i).innerHTML = Board.myCollected[(i-1)];
          }
          for (var i=1; i<=GamePlay.itemTypeCount; ++i) {
               document.getElementById("p2f" + i).innerHTML = Board.oppCollected[(i-1)];
          }
       /*
        ctx.font = "30px Arial";
        ctx.fillStyle = "#366B76";
        ctx.fillText(Player1.name, 0, 550);
        ctx.font = "15px Arial";
        ctx.fillStyle = "#000";
        for (var i=0; i<GamePlay.itemTypeCount; i++) {
            ctx.fillText(Board.myCollected[i].toFixed(1), 50*i, 575);
            ctx.drawImage(GamePlay.itemImages[i], 52*i+15, 555, 25, 25);
        }
        ctx.font = "30px Arial";
        ctx.fillStyle = "#82298E";
        ctx.fillText(Player2.name, 0, 625);
        ctx.font = "15px Arial";
        ctx.fillStyle = "#000";
        for (var i=0; i<GamePlay.itemTypeCount; i++) {
            ctx.fillText(Board.oppCollected[i].toFixed(1), 50*i, 650);
            ctx.drawImage(GamePlay.itemImages[i], 52*i+15, 630, 25, 25);
        }
        ctx.font = "30px Arial";
        ctx.fillStyle = "#F00";
        ctx.fillText("items left", 0, 700);
        ctx.font = "15px Arial";
        ctx.fillStyle = "#000";
        for (var i=0; i<GamePlay.itemTypeCount; i++) {
            ctx.fillText((Board.totalItems[i]-Board.myCollected[i]-Board.oppCollected[i]).toFixed(1), 50*i, 725);
            ctx.drawImage(GamePlay.itemImages[i], 52*i+15, 705, 25, 25);
        */
    },
    drawPlayerOne: function(ctx, state) {
        ctx.drawImage(GamePlay.player_one_image, Board.myX * 50 + 2, Board.myY * 50 + 2);
    },
    drawPlayerTwo: function(ctx, state) {
        ctx.drawImage(GamePlay.player_two_image, Board.oppX * 50 - 2, Board.oppY * 50 - 2);
    },
    drawItems: function(ctx, state, history) {
        for (var i=0; i<WIDTH; i++) {
            for (var j=0; j<HEIGHT; j++) {
                if (state[i][j] !== 0) {
                    ctx.drawImage(GamePlay.itemImages[state[i][j] - 1], i * 50, j * 50);
                } else if (GamePlay.show_breadcrumbs && history[i][j]==1) {
                    ctx.drawImage(GamePlay.visitedImg, i * 50, j * 50);
                } else if (GamePlay.show_breadcrumbs && history[i][j]==2) {
                    ctx.drawImage(GamePlay.oppVisitedImg, i * 50, j * 50);
                } else if (GamePlay.show_breadcrumbs && history[i][j]==3) {
                    ctx.drawImage(GamePlay.bothVisitedImg, i * 50, j * 50);
                }
            }
        }
    },
    setBoardNumber: function() {
        var boardNumber;

        boardNumber = parseInt($('#board_number').val());
        if (!isNaN(boardNumber)) {
            GamePlay.setupNewGame(boardNumber);
        } else {
            GamePlay.setupNewGame();
        }
    }
}
