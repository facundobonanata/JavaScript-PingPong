
(function(){ //Funcion anonima
     self.Board = function(width, height){ //Creacion de los objetos.
        this.width = width;
        this.height = height;
        this.playing = false;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
    }

    self.Board.prototype = {
        get elements(){
            var elements = this.bars.map(function(bar){ return bar; }); //copia del arreglo
            elements.push(this.ball);
            return elements;
        }       
    }
})();

(function(){
    self.Ball = function(x,y,radius,board){  //creacion pelota
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed_y = 0;
        this.speed_x = 3;
        this.board = board;
        this.direction =1;

        this.board=board;
        board.ball = this;
        this.kind = "circle";


}
    self.Ball.prototype = {
    move: function(){
        this.x += (this.speed_x * this.direction);
        this.y += (this.speed_y);
    }
}
})();
(function(){
    self.Bar = function(x,y,width,height,board){ //crear barras
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.board.bars.push(this);
        this.kind ="rectangle";
        this.speed = 5;
    }

    self.Bar.prototype = { //metodos movimiento barras
        down: function(){
            this.y += this.speed;
        },
        up: function(){
            this.y -= this.speed;
        },
        toString: function(){  //toString se ejecuta cuando convertimos un obj a una cadena
            return "x: "+ this.x +" y: "+ this.y ; //imprimir en que coordenadas
        }
    }
})();

(function(){
    self.BoardView = function (canvas, board){  //dibujar la pizarra

        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d"); //Obj a traves del cual podemos dibujar en js
    }

    self.BoardView.prototype = {
        clean: function(){
           this.ctx.clearRect(0,0,this.board.width,this.board.height);
        },
        draw: function(){

            for (var i = this.board.elements.length -1; i>=0; i--){
               var el= this.board.elements[i]

               draw(this.ctx,el)
            };      
        },
        play: function(){
            //console.log(ev.keyCode)
          if(this.board.playing){
            this.clean();
            this.draw();
            this.board.ball.move();
        }
      }
    }
    


    function draw(ctx, element){
        switch(element.kind){
            case "rectangle":   //dibujando las barras
                ctx.fillRect(element.x,element.y,element.width,element.height);
                 break;
             case "circle":  //dibujando la pelota
                ctx.beginPath();
                ctx.arc(element.x,element.y,element.radius,0,7);
                ctx.fill();
                ctx.closePath();
                break;        
       }
           
}
})();

var board = new Board(800,400);
var bar = new Bar(20,100,15,80,board)
var bar_2 = new Bar(765,100,15,80,board)
var canvas = document.getElementById('canvas') //obtener elementos document del objt model
var board_view = new BoardView(canvas, board);
var ball = new Ball(350,100,10,board)



document.addEventListener("keydown", function(ev){ //Movimiento de las barras con teclado
    console.log(ev.keyCode);
    if(ev.keyCode==38){
        ev.preventDefault(); //evitar movimiento de ventana
        bar.up();
    }else if(ev.keyCode == 40){
        ev.preventDefault();
        bar.down();
    }else if(ev.keyCode == 87){
        ev.preventDefault();
        //W
        bar_2.up();
    }else if(ev.keyCode == 83){
        ev.preventDefault();
        //S
        bar_2.down();
    }else if(ev.keyCode === 32){
        ev.preventDefault();
        board.playing = !board.playing;
    }   
});

board_view.draw();
//window.addEventListener("load", main);
window.requestAnimationFrame(controller)//muevete al siguiente frame y utliza la funcion controller


function controller(){
    board_view.play();
    requestAnimationFrame(controller);

}
