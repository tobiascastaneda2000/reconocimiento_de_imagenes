
export function sketch(p){
  

 



  class Burbuja {
    //Declaramos la clase 'Burbuja' con tres propiedades

    constructor(x,y,c){
     this.x=x;
     this.y=y;
     this.c=c;
    }
   
    
   
   up(n) {
      //Creamos un método 'caer' para mover los objetos 'gota'.
      p.fill(this.c, 20);
      p.noStroke();
      this.y = this.y-n;
      if (this.y<=0) {
        this.y =p.height+20;
      }
      p.ellipse(this.x+p.random(2), this.y, p.windowWidth*0.1 , p.windowWidth*0.1);
    }
  }

  class Flower {
constructor(color1, color2){
this.color1=color1;
this.color2=color2;}
display(){
p.noStroke();
p.fill(this.color1);
p.noStroke();
p.beginShape();
p.vertex(50,-15);
p.vertex(0,0);
p.vertex(50,15);
p.bezierVertex(70,0,50,-15,50,-15); 
p.endShape();
p.noFill();
p.fill(this.color2);
p.rotate(p.radians(90));
p.noStroke();
p.beginShape();
p.vertex(50,-15);
p.vertex(0,0);
p.vertex(50,15);
p.bezierVertex(70,0,50,-15,50,-15); 
p.endShape();
p.fill(this.color1);
p.rotate(p.radians(180));
p.noStroke();
p.beginShape();
p.vertex(50,-15);
p.vertex(0,0);
p.vertex(50,15);
p.bezierVertex(70,0,50,-15,50,-15); 
p.endShape();
p.fill(this.color2);
p.rotate(p.radians(270));
p.noStroke();
p.beginShape();
p.vertex(50,-15);
p.vertex(0,0);
p.vertex(50,15);
p.bezierVertex(70,0,50,-15,50,-15); 
p.endShape();

  }

}
let flowers=[];
/*let figuras2=new Figura2[4]; 
let figuras3=new Figura3[2]; 
let figuras4=new Figura4[4]; 
let figuras4b=new Figura4[4]; 
let figuras5=new Figura5[4]; 
let figuras6=new Figura6[1];*/
let burbujas= [];
let sentence;
let rotation;
let rotation2;
let rotation3;
let PositionX;
let PositionY;
let rotationSpeed;
let rotationSpeed2;
let scale;
let scaleSpeed;
let upSpeed;
let color1;
let color2;
let color3;
let color4;
let color5;
let Font;
let Font2;
let displayTimeSentence;
let sentences;
let fontSize;
let link = p.createA('https://poeticaleatoria.web.app/', 'volver')
link.position(p.windowWidth*0.5, p.windowHeight*0.8)

rotationSpeed=1;
  rotation=1;
  rotation2=360;
  rotation3=45;
  color1=p.color(250,60,20,160);//naranja variante 1
  color2=p.color(222,18,201,160);// violeta
  color3=p.color(229,248,7,160); //amarillo
  color4=p.color(255,7,71,160);//rosa
  color5=p.color(122,14,78,160);//fucsia 
  rotationSpeed2=0.003;
  scale=1;
  scaleSpeed=0.003;


  p.updateWithProps = props => {
    sentences=props.selectedSentences
    console.log(sentences)
  }

  p.setup=() =>{
  
  
   
  p.createCanvas(p.displayWidth, p.displayHeight);
  Font2=p.loadFont("../../assets/RobotoCondensedRegular.otf",50);

  for ( let i=0; i<100; i++){
    burbujas.push(new Burbuja (p.random(p.windowWidth),p.random(p.windowHeight)+20*i,p.color(48,66,200,20)));}
   for( let i =0; i<10; i++)
     { 
      flowers.push(new Flower(color1,color4));
     
    
    }
  
 
  
  

  
}

p.draw=()=>{
  
displayTimeSentence=p.round(p.millis()/3000);

  p.fill(9,2,36,70);
  p.rect(0,0,p.displayWidth, p.displayHeight);
  for(let i=0; i<100; i++){
    upSpeed=p.int(p.random(3));
   burbujas[i].up(upSpeed);}
  
   if( p.windowWidth <=720)

{   if ( displayTimeSentence< sentences.length)
   {p.fill(250,60,20,150);      
   p.textAlign(p.CENTER, p.CENTER);
   p.textWrap(p.WORD);
   p.textSize(40);
   p.text(sentences[displayTimeSentence],p.windowWidth/10,p.windowHeight/10, p.windowWidth*0.8, p.windowHeight*0.8)}
   else{ p.fill(250,60,20,150);      
     p.textAlign(p.CENTER, p.CENTER);
     p.textFont(Font2,40);
     p.text("Fin de la historia",p.windowWidth/2,p.windowHeight/2); 
     p.noFill()
     /*p.strokeWeight(1);
     p.stroke(color1);
     p.fill(13,17,54)
     p.rect(p.windowWidth/3,p.windowHeight*0.58, p.windowWidth/3,50, 25);
     p.noStroke();
     p.fill(color1);
     p.textSize(40)
     p.text("Volver", p.windowWidth*0.5, p.windowHeight*0.6)*/
   
    } }

     else {

      if ( displayTimeSentence< sentences.length)
      {p.fill(250,60,20,150);      
      p.textAlign(p.CENTER, p.CENTER);
      p.textWrap(p.WORD);
      p.textSize(50);
      p.text(sentences[displayTimeSentence],p.windowWidth/6,p.windowHeight/15, p.windowWidth*0.8, p.windowHeight*0.8)}
      else{ p.fill(250,60,20,150);      
        p.textAlign(p.CENTER, p.CENTER);
        p.textFont(Font2,50);
        p.text("Fin de la historia",p.windowWidth/2,p.windowHeight/2); 
        p.noFill()
       /* p.strokeWeight(1);
        p.stroke(color1);
        p.fill(13,17,54)
        p.rect(p.windowWidth*0.45,p.windowHeight*0.57, p.windowWidth*0.1,60,p.windowWidth*0.04);
        p.noStroke();
       p.fill(color1);
        p.textFont(Font2,50) 
        p.text("Volver", p.windowWidth*0.5, p.windowHeight*0.6)*/
     
        
      }





     }




if ( p.windowWidth  <= 720 )
{p.scale(0.7);}




  
   let PositionX=100;
   let PositionY=100;

   for (let i = 0; i<flowers.length; i++)
   { 
     
   p.push();
   p.translate(PositionX,PositionY);
 
 if(rotation<=360)
   {rotation=rotation+0.5;}
   
 if(rotation>=360)
   {rotation=0;}
 
 
 p.rotate(p.radians(rotation));
 flowers[i].display();
 PositionX=PositionX+200;
  
   p.pop();
 }

   
 
} }