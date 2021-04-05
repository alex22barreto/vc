let facemesh;
let predictions = [];
let img;
let width=350
let height=450

function preload(){ img = loadImage('/vc/docs/sketches/lenna.png'); }  

function setup() {
  // Create a canvas that's at least the size of the image.


  // create an image using the p5 dom library
  // call modelReady() when it is loaded
 
  createCanvas(width, height); 
  image(img, 0, 0,width,height);
  //img.hide(); // hide the image in the browser
  //frameRate(1); // set the frameRate to 1 since we don't need it to be running quickly in this case
}  




// when the image is ready, then load up poseNet

// when poseNet is ready, do the detection
