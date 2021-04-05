let facemesh;
let predictions = [];
let img1;
let img2;
let width=900;
let height=900;
let total = 0;
let valor = 0;
let ascii2 = [" ","`","-",".","'","_",":",",","\"","=","^",";","<","+","!","*","?","/","c","L","\\","z","r","s","7","T","i","v","J","t","C","{","3","F",")","I","l","(","x","Z","f","Y","5","S","2","e","a","j","o","1","4","[","n","u","y","E","]","P","6","V","9","k","X","p","K","w","G","h","q","A","U","b","O","d","8","#","H","R","D","B","0","$","m","g","M","W","&","Q","%","N","@"];
let ascii = ["@","N","%","Q","&","W","M","g","m","$","0","B","D","R","H","#","8","d","O","b","U","A","q","h","G","w","K","p","X","k","9","V","6","P","]","E","y","u","n","[","4","1","o","j","a","e","2","S","5","Y","f","Z","x","(","l","I",")","F","3","{","C","t","J","v","i","T","7","s","r","z","\\","L","c","/","?","*","!","+","<",";","^","=","\"",",",":","_","'",".","-","`"," "];


function preload(){ 
    img1 = loadImage('/vc/docs/sketches/arboles.jpg'); 
    
}  

function setup() {
  // Create a canvas that's at least the size of the image.


  // create an image using the p5 dom library
  // call modelReady() when it is loaded
 
  createCanvas(width, height); 
  background(255); 
  fill(0); 
  textFont("Courier", 6); 
  img1.resize(width,height); 
  //img1.filter(GRAY); 
  img1.loadPixels();

  let i = 0;
  

  for (let y = 0; y < height; y += 3) 
  { 
      for (let x = 0; x < width; x += 6) 
      { 
        
        let pixel = img1.pixels[4*(y * img1.width + x)]; 
        let r = red(pixel); 
        let g = green(pixel); 
        let b = blue(pixel); 
        let c = (r+g+b)/3 
        c=(c*90)/255;
        valor = Math.round(c);
        
        text(ascii[valor], x, y); 
    }
  }

}
