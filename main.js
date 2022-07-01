
(function(){ 
     self.Board = function(width, height){//Creacion de los objetos.
        this.width = width;
        this.height = height;
        this.playing = false;
        this.bars = [];
        this.ball = null;
        this.playing=false;

    }

    self.Board.prototype = {
        get elements(){
            var elements = this.bars.map((element)=>element);; 
            
            elements.push(this.ball);
            return elements;
        },
        get getWidth(){return this.width;
        },
        get getHeight(){return this.height;
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
        this.direction = 1;
        this.bounce_angle = 0;
        this.speed = 3;
        this.board = board;
        this.kind = "circle";
        this.max_bounce_angle = Math.PI / 12;

        board.ball = this;

}
    self.Ball.prototype = {
        move: function(){
        this.x += (this.speed_x * this.direction);
        this.y += (this.speed_y);
               
        //para que la pelota rebote en el tablero arriba y abajo//

        if(this.y + this.radius > this.board.getHeight || this.y + this.radius <= 20 ){
            this.speed_y = -this.speed_y
        }
        //para marcar e incrementar puntuacion //
        var puntuacion1Text = document.getElementById("j1score")
        var puntuacion2Text = document.getElementById("j2score")
        var puntuacion1 =0
        var puntuacion2 =0
        
        if(this.x + this.radius < 0){
            puntuacion2Text.innerHTML = ++puntuacion2

        } if(puntuacion1 == 5){
            alert("Jugador 1 gano")}
            
            //funcion win//

        /*}else if(this.x + this.radius >0){
            puntuacion2.innerHTML = ++puntuacion2
        }*/
     if(this.x + this.radius > this.board.getWidth){
    puntuacion1Text.innerHTML = ++puntuacion1
    if(puntuacion2 == 5){
        alert("Jugador 2 gano")
    }

}
//Hacer funcion para poner la pelota en pocision inicial//


//Hacer funcion para resetear pocisiones barras y pelota


    },
    get width(){
        return this.radius * 2;
    },
    get height(){
        return this.radius * 2;
    }, 
    
    
    

    //Colisioness

    collision: function(bar){ //reacciona a la colision
        // calcula el angulo en el que va a moverse la pelota
        var relative_intersect_y = (bar.y + (bar.height / 2)) - this.y;
        
        var normalized_intersect_y = relative_intersect_y / (bar.height / 2);
        
        this.bounce_angle = normalized_intersect_y * this.max_bounce_angle;
        
        this.speed_y = this.speed * -Math.sin(this.bounce_angle);
        this.speed_x = this.speed * Math.cos(this.bounce_angle);
        // modifica la dirección dependiendo de la dirección de la barra

        if (this.x > (this.board.width / 2)) this.direction = -1;
        else this.direction = 1;
        }
    }

    
})();


function hit(a,b){
    //revisa si a colisiona con b
    var hit = false;
    //Colsiones horizontales
    if (b.x + b.width >= a.x && b.x < a.x + a.width)
    {
        //Colisiones verticales
       if (b.y + b.height >= a.y && b.y < a.y + a.height)
            hit = true;
    }
    //Colisión de a con b
    if (b.x <= a.x && b.x + b.width >= a.x + a.width) {
        if (b.y <= a.y && b.y + b.height >= a.y + a.height)
            hit = true;
    }
    //Colisión b con a
    if (a.x <= b.x && a.x + a.width >= b.x + b.width) {
        if (a.y <= b.y && a.y + a.height >= b.y + b.height)
            hit = true;
    }
    return hit;

}   


//barras
(function(){
    self.Bar = function(x,y,width,height,board){ //crear barras
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.board.bars.push(this);
        this.kind ="rectangle";
        this.speed = 12;
    }

    //metodos movimiento barras
    self.Bar.prototype = {
        down: function(){
            if(this.y + this.height <= this.board.height){ //ajustar//
                this.y += this.speed;
            }
        },
        up: function(){
            if(this.y>0){
            this.y -= this.speed;
        }
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

            for (var i = this.board.elements.length -1; i >=0; i--){
               var el= this.board.elements[i];

               draw(this.ctx,el)
            };      
        },
        check_collisions: function(){
            for (var i = this.board.bars.length -1; i >= 0; i--){
                 var bar = this.board.bars[i];
                 if(hit(bar, this.board.ball )){
                    this.board.ball.collision(bar);

                 }
            };
        },
        play: function(){
          if(this.board.playing){
            this.clean();
            this.draw();
            this.check_collisions(); 
            this.board.ball.move();
        }
      }
    }  


    function draw(ctx, element){
        switch(element.kind){
            case "rectangle":   //dibujar las barras
            ctx.fillStyle ="black"
                ctx.fillRect(element.x,element.y,element.width,element.height);
                 break;
             case "circle":
                ctx.fillStyle="black"  //dibujar la pelota
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
var canvas = document.getElementById("canvas") //obtener elementos document del objt model
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
    //añadir k restart//   
});

board_view.draw();
//window.addEventListener("load", main);
window.requestAnimationFrame(controller)//muevete al siguiente frame y utliza la funcion controller


function controller(){
    board_view.play();
    window.requestAnimationFrame(controller);

}
