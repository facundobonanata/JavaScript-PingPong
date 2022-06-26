
(function(){ //Funcion anonima
     self.Board = function(width, height){ //Creacion de los objetos.
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
    }

    self.Board.prototype = {
        get elements(){
            var elements = this.bars;
            elements.push(this.ball);
            return elements;
        }       
    }
})();

(function(){
    self.Bar =function(x,y,width,height,board){
        this.x=x;
        this.y=y
        this.width=width
        this.height=height;
        this.board=board;
        this.board.bars.push(this);
        this.kind ="rectangle";
        this.speed = 10;
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
    self.BoardView = function (canvas, board){
    console.log(board);

        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d"); //Obj a traves del cual podemos dibujar en js

    }

    self.BoardView.prototype={
        draw: function(){
            for (var i = this.board.elements.length -1; i>=0; i--){
               var el= this.board.elements[i]

               draw(this.ctx,el)
            }       
        }
    }

    function draw(ctx, element){
        if(element !== null && element.hasOwnProperty("kind")){
            switch(element.kind){
                case "rectangle":
                     ctx.fillRect(element.x,element.y,element.width,element.height);
                     break;            
       }
        
    }
}
})();

var board = new Board(800,400);
console.log(board)
var bar = new Bar(20,100,15,80,board)
var bar = new Bar(765,100,15,80,board)
var canvas = document.getElementById('canvas') //obtener elementos document del objt model
var board_View = new BoardView(canvas, board);

document.addEventListener("Keydown", function(ev){
    if(ev.keyCode==38){
        bar.up();
    }
    else if(ev.keyCode == 40){
        bar.down();
    }
});

window.addEventListener("load", main);

function main(){

    board_View.draw();

}
