class cannon {
 constructor(gameWidth, gameHeight) {
   this.width = gameWidth;
   this.height= gameHeight;
  this.pos= {
    x:this.width/2,
    y: this.height
    };

    }
cannonDraw(c){
    c.fillStyle="red";
 c.fillRect(this.pos.x,this.pos.y-190,100,150);
 c.beginPath();
 c.arc(this.pos.x,this.pos.y-40,40,0,Math.PI*2);
 c.closePath();
 c.fillStyle="blue";
 c.fill();
 c.beginPath();
 c.fillStyle="green";
 c.arc(this.pos.x+100,this.pos.y-40,40,0,Math.PI*2);
 c.closePath();
 c.fillStyle="yellow";
 c.fill();
}

}

class bullet{
  constructor(gameWidth,gameHeight){
    this.width = gameWidth;
    this.height= gameHeight;
    this.inherit= new cannon(gameWidth,gameHeight);
    this.bpos=[];
    this.bpos[0]={x:this.inherit.pos.x,
      y:this.inherit.pos.y-190};
  }
  bulletDraw(c,l){

    c.arc(this.bpos[l].x+20,this.bpos[l].y,5,0,Math.PI*2);
    c.closePath();
    c.fill();
    c.arc(this.bpos[l].x+50,this.bpos[l].y,5,0,Math.PI*2);
    c.closePath();
    c.fill();
    c.arc(this.bpos[l].x+80,this.bpos[l].y,5,0,Math.PI*2);
    c.closePath();
    c.fill();
  }
}

class rock{
  constructor(gameWidth,gameHeight){
      this.r=[];
      this.r[0]= Math.floor(Math.random() * 100 + 54);
      this.strength=[];
      this.strength[0]= this.r[0];
      this.rpos=[];
      this.rpos[0]= {x:gameWidth-this.r[0],
        y:this.r[0]};
        if(this.rpos[0].y<this.r[0]){this.rpos[0].y=this.r[0];}
        this.color=[];
        this.color[0]="#178326";

  }
  rockDraw(c,t){
    if(this.r[t]>0)
    {
    c.fillStyle=this.color[t];
    c.arc(this.rpos[t].x,this.rpos[t].y,this.r[t],0,Math.PI*2);
    c.closePath();
    c.fill();}
  }
}

var canvas=document.getElementById("ballBlast");
var c = canvas.getContext("2d");
var game_height= window.innerHeight;
var game_width= window.innerWidth;
var dby=5,drx=[],dry=[],score=0,j,t,i=0,high_score=0;
  var coin_restart=1;
canvas.width=game_width;
canvas.height=game_height;
var mount= new Image(),rand_mount=0,rand_time=0;
var arr_img=["https://media.giphy.com/media/yByo4tOPLJKla/giphy.gif","https://twistedsifter.files.wordpress.com/2013/05/animated-gifs-of-fighting-game-backgrounds-19.gif?w=768&h=368","https://editorial.designtaxi.com/news-gamegifs23052013/14.gif","https://store-images.s-microsoft.com/image/apps.15488.13970954616076420.d48753f0-33c3-42e7-95f6-e78748ae196e.9ff3fe46-9897-484e-9c3b-887e0c0c4a85?mode=scale&q=90&h=270&w=270&background=%23464646"];
function random_mount(){
  var random= Math.floor(Math.random()*5);
  mount.src= arr_img[random];
}
random_mount();
function rand_timer(){
  rand_time= Math.floor(Math.random() * 350 + 450);
}

rand_timer();
const colors = ['#ffcccc', '#0086b3','#0a290a', '#ff99ff'];
var aim= new cannon(game_width,game_height);
var ammo= new bullet(game_width,game_height);
var brandRock= new rock(game_width,game_height);
var l=ammo.bpos.length-1,rl=0,inst=0,rul=0;
var rock_time=0,score_note=0,once=0,twice=0,click_once=0,tot_coin=Number(localStorage.getItem("total coin")),coin=0;
drx[0]=5;
dry[0]=5;
if(tot_coin== undefined)
{tot_coin=0;
localStorage.setItem("total coin",tot_coin);
}
var score_high=localStorage.getItem("high score");
var arr_r=[];
arr_r[0]=brandRock.r[0];
var store=localStorage.getItem("store");
if(store== undefined)
{store=0;
  store++;
localStorage.setItem("store",store);
}
if(score_high==undefined){
  score_high=0;
localStorage.setItem("high score",score_high);
}

function draw(){
  if(score%10==0&&score>0&&rand_mount==0){random_mount();
  rand_mount++;}
  c.drawImage(mount,0,0,game_width,game_height);
  if(click_once==0){
    c.fillStyle="green";
    c.fillRect(game_width-150,10,140,40);
    c.fillStyle ="red";
    c.font= "25px 'comic sans MS' ";
    c.fillText('Instruction',game_width-150,40);
    c.fillStyle="green";
    c.fillRect(game_width/2-120,game_height/2-20,270,40);
    c.fillStyle="red";
    c.font= "25px 'comic sans MS'";
    c.fillText('How The Game Works',game_width/2-120,game_height/2);
    c.fillStyle ="red";
    c.fillRect(20,40,220,50);
    c.fillStyle ="yellow";
    c.font= "25px 'comic sans MS' ";
    c.fillText('total coins:'+tot_coin,50,40);
    c.fillStyle ="red";
    c.font= "40px 'comic sans MS' ";
    c.fillText('BALL BLAST GAME!!',game_width/2-120,game_height/2-80);
    c.fillStyle ="green";
    c.font= "30px 'comic sans MS' ";
    c.fillText('Click Any where to Continue',game_width/2-120,game_height/2-40);
  }

  else if(click_once==1)
  {if(rul>0)
  {rules();}
  c.fillStyle ="green";
  c.font= "30px 'comic sans MS' ";
  c.fillText('Click Any where to Continue',100,400);
}

  else{
    c.fillStyle ="black";
    c.fillRect(40,10,150,40);
    c.fillStyle ="yellow";
    c.font= "25px 'comic sans MS' ";
    c.fillText('coins:'+coin,50,40);

  c.fillStyle ="red";
  c.font= "25px 'comic sans MS' ";
  c.fillText('score:'+score,game_width/2-100,40);

  c.fillStyle ="red";
  c.font= "25px 'comic sans MS' ";
  c.fillText('high score:'+score_high,game_width/2+30,40);

  if(inst>0){
    c.fillStyle="green";
    c.fillRect(game_width-150,10,140,40);
    c.fillStyle ="red";
    c.font= "30px 'comic sans MS' ";
    c.fillText('Play Game',game_width-150,40);
    instruction();
  }
  else{

  c.fillStyle="green";
  c.fillRect(game_width-190,10,150,40);
  c.fillStyle ="red";
  c.font= "15px 'comic sans MS' ";
  c.fillText('How To Play The Game',game_width-190,40);
    endGame();
     if(i>0){}
    else{
  aim.cannonDraw(c);
  if(l<=ammo.bpos.length){
  if(ammo.bpos[l].y<=game_height-200){l++;
    // console.log("pos"+l);
     bulletChange(l);}}
  bulletUpdate();
  if(rock_time%rand_time==0&&rock_time>0){
    ++rl;
    rand_timer();
    rockNew(rl);
  }
  rock_time++;
  if(score%10==0&&score>0&&score_note==0){dby+=2;
  score_note++;}
  rockMove();
  scoreUpdate();
}}}
  requestAnimationFrame(draw);
}
draw();
function bulletUpdate()
{
for(j=0;j<=l;j++){
    ammo.bpos[j].y-=dby;
    ammo.bulletDraw(c,j);
    if(ammo.bpos[0].y<0){ammo.bpos.shift();
    l--;
  // console.log("up"+l);
}
}
  }
  function  bulletChange(l)
    {
      ammo.bpos[l]={x:aim.pos.x,
        y:aim.pos.y-150};
      }
      function rockMove(){
        for(t=0;t<=rl;t++){
        if(brandRock.rpos[t].x+brandRock.r[t]>game_width||brandRock.rpos[t].x<brandRock.r[t]){drx[t]=-drx[t];}
        if(brandRock.rpos[t].y+brandRock.r[t]>game_height||brandRock.rpos[t].y<brandRock.r[t]){dry[t]=-dry[t];}
        brandRock.rpos[t].x+=drx[t];
        brandRock.rpos[t].y+=dry[t];
        brandRock.rockDraw(c,t);
        }
      }
      function rockNew(rl)
      {
        brandRock.r[rl]= Math.floor(Math.random() * 91 + 60);
        arr_r[rl]=brandRock.r[rl];
        brandRock.strength[rl]=brandRock.r[rl];
        brandRock.rpos[rl]={x:randoma(rl),
                        y:randomb(rl)};
        drx[rl]=5;
        dry[rl]=5;
        brandRock.color[rl]= colors[Math.floor(Math.random() * colors.length)];
      }
      function randoma(rl){
        var randx=Math.random();
        if(randx<0.5){
          return brandRock.r[rl];
        }
        else{
          return game_width-brandRock.r[rl];
        }
      }
      function randomb(rl){
        var rand=Math.random()*(game_height/2);
        if(rand<brandRock.r[rl]){return brandRock.r[rl];}
        else{return rand;}
      }

      function scoreUpdate(){
        for(j=0;j<=l;j++){
          for(t=0;t<=rl;t++){
              if(j<l){
              if(((ammo.bpos[j].y>=brandRock.rpos[t].y-brandRock.r[t]&&ammo.bpos[j].y<=brandRock.rpos[t].y+brandRock.r[t])&&(ammo.bpos[j].x>=brandRock.rpos[t].x-brandRock.r[t]&&ammo.bpos[j].x<=brandRock.rpos[t].x+brandRock.r[t]))||((ammo.bpos[j].x+25>=brandRock.rpos[t].x-brandRock.r[t]&&ammo.bpos[j].x+25<=brandRock.rpos[t].x+brandRock.r[t])&&(ammo.bpos[j].y>=brandRock.rpos[t].y-brandRock.r[t]&&ammo.bpos[j].y<=brandRock.rpos[t].y+brandRock.r[t]))||((ammo.bpos[j].x+50>=brandRock.rpos[t].x-brandRock.r[t]&&ammo.bpos[j].x+50<=brandRock.rpos[t].x+brandRock.r[t])&&(ammo.bpos[j].y>=brandRock.rpos[t].y-brandRock.r[t]&&ammo.bpos[j].y<=brandRock.rpos[t].y+brandRock.r[t]))){
                brandRock.r[t]-=3;
                brandRock.strength[t]-=3;
                if(l>2){
                ammo.bpos.splice(j,1);
                 l--;}
                 // console.log(l);
                brandRock.rpos[t].y-=0.5;
                if(brandRock.r[t]<20&&arr_r[t]>70){
                  rockInto2(t,arr_r[t]);
                  score++;
                  coin+=25;
                  rand_mount=0;
                  score_note=0;
   }
                else if(brandRock.r[t]<20){
                  brandRock.r[t]=0;
                  brandRock.strength[t]=0;

                  score++;
                  coin+=25;
                  rand_mount=0;
                  score_note=0;
                   }
              }   if(brandRock.strength[t]>0){
                 c.fillStyle ="red";
                    c.font= "30px 'comic sans MS' ";
                    c.fillText(brandRock.strength[t],brandRock.rpos[t].x,brandRock.rpos[t].y);}
    } }}}

    function rockInto2(t,a){
      brandRock.r[t]=Math.round(a/2);
      rl++;
      brandRock.r[rl]=brandRock.r[t];
        brandRock.strength[t]=brandRock.r[rl];
      brandRock.strength[rl]=brandRock.r[rl];
      brandRock.rpos[rl]={x:brandRock.rpos[t].x,
                      y:brandRock.rpos[t].y};
      arr_r[t]=a/2;
      arr_r[rl]=a/2;
      drx[rl]=-5;
      dry[rl]=-5;
    }
      function endGame(){
        for(j=0;j<=rl;j++){
        if((((aim.pos.x-25>=brandRock.rpos[j].x-brandRock.r[j])&&(aim.pos.x-25<=brandRock.rpos[j].x+brandRock.r[j]))||((aim.pos.x+25>=brandRock.rpos[j].x-brandRock.r[j])&&(aim.pos.x+25<=brandRock.rpos[j].x+brandRock.r[j]))||((aim.pos.x-25>=brandRock.rpos[j].x-brandRock.r[j])&&(aim.pos.x+25<=brandRock.rpos[j].x+brandRock.r[j])))&&(brandRock.rpos[j].y<=game_height&&brandRock.rpos[j].y>=game_height-150)||i>0){
          i++;
          c.fillStyle ="red";
          c.fillRect(20,10,210,40);
          c.fillStyle ="yellow";
          c.font= "25px 'comic sans MS' ";
          c.fillText('total coins:'+tot_coin,25,40);
          c.fillStyle ="red";
          c.font= "70px 'comic sans MS' ";
          c.fillText("Game Over",(game_width/2)-200,(game_height/2)-100);
          c.fillStyle ="green";
          c.font= "50px 'comic sans MS' ";
          c.fillText("Refresh to Play Again",(game_width/2)-200,(game_height/2));
          highScore();
          if(once==0){
          localStorage.setItem("score-"+store,score);
          store++;
          localStorage.setItem("store",store);
           once++;
           tot_coin+=Number(coin);
           localStorage.setItem("total coin",tot_coin);

         }}         }
            }

            function highScore(){
              if(twice==0){
              if(score>score_high){
                score_high=score;
                localStorage.setItem("high score",score_high);
                high_score++;
             }
              twice++;}
              if(high_score>0){
                c.fillStyle="green";
                c.font= "50px 'comic sans MS' ";
                c.fillText("HIGH SCORE!!!",(game_width/2)-200,150);
              }
              else{
                c.fillStyle="red";
                c.font = "20px 'comic sans MS'";
                c.fillText("Better Luck Next Time!!", (game_width/2)-200, 150);
              }
            }
            function instruction(){
              c.fillStyle ="#0028ff";
              c.font= "30px 'comic sans MS' ";
              c.fillText("Instructions:",game_width/2-100,100);
              c.fillStyle ="red";
              c.font= "20px 'comic sans MS' ";
              c.fillText("1) Use left and right arrow keys for moving the cannon",100,150);
              c.fillStyle ="red";
              c.font= "20px 'comic sans MS' ";
              c.fillText("2) Score points by hitting the rocks with the bullets",100,200);
              c.fillStyle ="red";
              c.font= "20px 'comic sans MS' ";
              c.fillText("3) If the ball hits the cannon, you lose",100,250);
              c.fillStyle ="red";
              c.font= "20px 'comic sans MS' ";
              c.fillText("4) Certain rocks may split after you destroy it, the value being half of the original",100,300);
              c.fillStyle ="red";
              c.font= "20px 'comic sans MS' ";
              c.fillText("5) Now click 'Play Game' to play the game!! Have fun!!",100,350);
            }

            function rules(){
              c.fillStyle ="blue";
              c.font= "30px 'comic sans MS'";
              c.fillText("HOW THE GAME WORKS", game_width/2-100, 100);
              c.fillStyle ="red";
              c.font= "20px 'comic sans MS'";
              c.fillText("Every time a ball disappears or splits into two, the following things happen:", 100,150);
              c.fillStyle="red";
              c.font="20px 'comic sans MS'";
              c.fillText("1) Your total number of coins go up by 25",100,200);
              c.fillStyle="red";
              c.font="20px 'comic sans MS'";
              c.fillText("2) Your score goes up by only one point",100,250);
              c.fillStyle="red";
              c.font="20px 'comic sans MS'";
              c.fillText("3) Once you get hit, your high score and total number of coins will be saved",100,300);
              c.fillStyle="red";
              c.font="20px 'comic sans MS'";
              c.fillText("4) Understand carefully and play", 100,350);
            }

function cannonShop(){
      c.fillStyle="blue";
      c.fillRect(this.pos.x,this.pos.y-190,100,150);
      c.beginPath();
      c.arc(this.pos.x,this.pos.y-40,40,0,Math.PI*2);
      c.closePath();
      c.fillStyle="red";
      c.fill();
      c.beginPath();
      c.arc(this.pos.x+80,this.pos.y-40,40,0,Math.PI*2);
      c.closePath();
      c.fillStyle="red";
      c.fill();

      }

      window.addEventListener("keydown",cannonMove, false);
  function cannonMove(key){
    if(key.keyCode== "37"&&aim.pos.x>35){aim.pos.x-=10;}
    else if(key.keyCode== "39"&&aim.pos.x<game_width-80){aim.pos.x+=10;}}//for cannon mpvement
    canvas.addEventListener('click',function(event){//to access instruction
      if(event.x>game_width-150&&event.x<game_width-20&&event.y>10&&event.y<50){
        if(inst>0){inst=0;}
        else{inst++;}
      }
    });
    canvas.addEventListener('click',function(event){
      if(event.x>game_width/2-120&&event.x<game_width/2+150&&event.y>game_height/2-20&&event.y<game_height+20){
        if(rul>0){rul=0;}
        else{rul++;}
      }
      });
  canvas.addEventListener('click',function(event){click_once++;

  });
  canvas.addEventListener('click',function(event){
    if(event.x>game_width/2-200&&event.x<game_width+20&&event.y>game_height/2+100&&event.y<game_height/2+150){
    if(i>0&&tot_coin>=(200*coin_restart)){
      tot_coin-=(200*coin_restart);
      localStorage.setItem("total coin",tot_coin);
      dby=5;drx=[];dry=[];i=0;high_score=0;
      aim= new cannon(game_width,game_height);
      ammo= new bullet(game_width,game_height);
      brandRock= new rock(game_width,game_height);
      l=0;rl=0;inst=0;
      score_note=0;once=0;twice=0;coin=0;
      drx[0]=5;
      dry[0]=5;
      coin_restart++;
    }

    }
  });
