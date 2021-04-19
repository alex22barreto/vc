# Image and video processing


## Conversión a escala de grises

* Descargar: [Escala de Grises](https://github.com/alex22barreto/vc/blob/main/docs/md/docs/workshops/files/EscalaGrises.zip)

### Problem statement
Transformar imágenes y videos a escala de grises utilizando técnica de promedio rgb y luma.

### Background
Existen diferentes métodos o fórmulas para la conversión de las imágenes a escala de grises. Cada una de las técnicas tiene sus características particulares, por ejemplo: algunas técnicas al realizar la conversión resaltan mejor el brillo de las imágenes. En este caso, se analizarán los métodos de promedio RGB y luma.

El método del promedio aritmético RGB se basa en la estimación de la tonalidad de gris aplicando un
promedio en los 3 canales que tiene cada uno de los pixeles presentes en la imagen, a través de la formula:

> :Formula align=center
> ```
> Gray = \frac{1}{3} (R+G+B)
> ```

Luma es el promedio ponderado de R, G y B con corrección gamma, en función de su contribución a la luminosidad percibida. Este método ha sido utilizado durante mucho tiempo como la dimensión monocromática en la transmisión de televisión en color. 

Existen variantes de aplicación de esté método, asignando diferentes pesos a cada componente de la ecuación de la siguiente manera: 

> :Formula align=center
> ```
> (SDTV) Y'_{601} = (0.2989 \times R) + (0.5870 \times G)+ (0.1140 \times B) \\ \\
>
> (Adobe) Y'_{240} = (0.212 \times R) + (0.701 \times G) + (0.087 \times B) \\ \\
> 
> (HDTV) Y'_{709} = (0.2126 \times R) + (0.7152 \times G) +(0.0722 \times B) \\ \\
> 
> (UHDTV, HDR) Y'_{709} = (0.2627 \times R) + (0.6780 \times G) + (0.0593 \times B ) \\ \\
> ```

### Code (solution) & results

### Imagen
#### Promedio RGB
Para el promedio RGB de imagen, se hace la conversión con el siguiente código:

```shell
PGraphics pg, pg2;
PImage img;
float red, blue, green, rgbProm;
int x, y;

void setup(){
  size(800, 300);
  
  pg = createGraphics(400, 300);
  pg2 = createGraphics(400, 300);  
  img = loadImage("dog3.jpg"); 
}

void draw(){
  
  //Imagen original
  pg.beginDraw();
  pg.background(100);
  img.resize(400,300);
  pg.endDraw();
  image(img, 0, 0);
  
  //Imagen Modificada
  pg2.beginDraw();
  pg2.background(100);
  
  for (x = 0; x < img.width; x++) {
    for (y = 0; y < img.height; y++) {
      
      red = red(img.get(x,y));
      blue = blue(img.get(x,y));
      green = green(img.get(x,y));
      rgbProm = (red + blue + green)/3;
      pg2.set(x, y, color(rgbProm));
    }
  }
  
  pg2.endDraw();
  image(pg2,400,0); 
}
```

A continuación se presente la imagen original en el lado derecho y el resultado obtenido al lado izquierdo.

![ImgPromRGB](/docs/sketches/promRGB.jpg)

#### Luma
Para el proceso de conversión a escala de grises por medio de la técnica luma, se realizó con el siguiente código: 

```shell
PGraphics pg, pg2;
PImage img;
float red, blue, green, luma;
int x, y;

void setup(){
  size(800, 300);
  
  pg = createGraphics(400, 300);
  pg2 = createGraphics(400, 300);  
  img = loadImage("dog3.jpg"); 
}

void draw(){
  
  //Imagen original
  pg.beginDraw();
  pg.background(100);
  img.resize(400,300);
  pg.endDraw();
  image(img, 0, 0);
  
  //Imagen Modificada
  pg2.beginDraw();
  pg2.background(100);
  
  for (x = 0; x < img.width; x++) {
    for (y = 0; y < img.height; y++) {
      
      red = red(img.get(x,y));
      blue = blue(img.get(x,y));
      green = green(img.get(x,y));
      luma = (red * 0.2126 + green * 0.7152 + blue * 0.0722);
      pg2.set(x, y, color(luma));
    }
  }
  
  pg2.endDraw();
  image(pg2,400,0);
}
```

Como resultado se obtiene la imagen del lado izquierdo y se presenta la imagen original al lado derecho.

![ImgLuma](/docs/sketches/luma.jpg)

### Video

Para procesar video, en processing es necesario instalar la librería Movie y con la función read() se obtienen los frames del video que posteriormente se procesan como una imagen.

#### Promedio RGB
El siguiente código es el encargado del transformar el video a escala de grises por el proceso de promedio RGB.

```shell
import processing.video.*;
float red, blue, green, rgbProm;
int x, y;
Movie myMovie;

void setup() {
  size(1000, 450);
  background(0);
  myMovie = new Movie(this, "dog.mp4");
  myMovie.loop();

}

void movieEvent(Movie m) {
  m.read();
}

void draw() {
  
  image(myMovie, 0, 0, 500, 450);
  image(myMovie, 500, 0, 500, 450);
  
  for (x = 500; x < width; x++) {
    for (y = 0; y < height; y++) {
      
      red = red(get(x,y));
      blue = blue(get(x,y));
      green = green(get(x,y));
      rgbProm = (red + blue + green)/3;
      set(x, y, color(rgbProm));
    }
  }
}    
```
El resultado de la transformación a escala de grises del video se presenta a la izquierda y el video original a la derecha.

![VidPromRGB](/docs/sketches/rgb.gif)

#### Luma
El siguiente código es el encargado del transformar el video a escala de grises por la técnica luma.

```shell
import processing.video.*;
float red, blue, green, luma;
int x, y;
Movie myMovie;

void setup() {
  size(1000, 450);
  background(0);
  myMovie = new Movie(this, "dog.mp4");
  myMovie.loop();

}

void movieEvent(Movie m) {
  m.read();
}

void draw() {
  
  image(myMovie, 0, 0, 500, 450);
  image(myMovie, 500, 0, 500, 450);
  
  for (x = 500; x < width; x++) {
    for (y = 0; y < height; y++) {
      
      red = red(get(x,y));
      blue = blue(get(x,y));
      green = green(get(x,y));
      luma = (red * 0.2126 + green * 0.7152 + blue * 0.0722);
      set(x, y, color(luma));
    }
  }
}
```
El resultado de la transformación a escala de grises por la técnica luma de video se presenta a la izquierda y el video original a la derecha.

![VidLuma](/docs/sketches/luma.gif)



## Aplicación de algunas máscaras de convolución

* Descargar: [Máscaras de convolución](https://github.com/alex22barreto/vc/blob/main/docs/md/docs/workshops/files/MascarasConvolucion.zip)

### Problem statement
Transformar imágenes y videos a escala de grises utilizando técnica de promedio rgb y luma.

### Background
El núcleo, kernel, matriz de convolución o máscara, es una matriz que se utiliza para aplicar efectos sobre una imagen. Los efectos pueden ser desenfocar, afilar, delinear, o grabar en relieve, entre otros. También se utilizan en el aprendizaje automático para la extracción de características en la imagen. En dicho proceso se conoce como “convolución”. Convolución es el proceso de agregar cada elemento de la imagen a sus vecinos locales, ponderados por el núcleo. Esto está relacionado con una forma de convolución matemática. 

Algunos de los efectos consisten en: 

* Desenfocar: resultado de desenfocar una imagen mediante una función gaussiana, reduce el ruido de la imagen y reduce los detalles. 

* Delinear: identifica puntos en una imagen digital en los que el brillo de la imagen cambia bruscamente o tiene discontinuidades. 

* Grabar en relieve: cada píxel de una imagen se reemplaza por un resaltado o una sombra, dependiendo de los límites claros / oscuros de la imagen original. 

* Afilar: mejora y mantiene el brillo en las regiones de cambio rápido; principalmente bordes. 

Para aplicar los efectos sobre las imágenes presentadas, su usó el paquete p5.js de JavaScript, mediante el cual se hace un proceso iterativo en el que se opera sobre cada pixel y sus vecinos inmediatos con el núcleo del filtro deseado para obtener el nuevo valor de cada pixel. En el programa, se crearon funciones propias donde se modifica cada valor RGB de los pixeles y se actualiza en tiempo real el resultado. 

### Code (solution) & results
Para realizar este procedimiento, tanto en imagen como en video, se adapto la función de convolucion de un ejemplo de processing: https://processing.org/examples/convolution.html 

### Imagen
#### Identidad
Esta máscara devuelve la misma imagen y utiliza el siguiente Kernel:

> :Formula align=center
> ```
> \begin{bmatrix}
> 0 & 0 & 0 \\      
> 0 & 1 & 0 \\
> 0 & 0 & 0
> \end{bmatrix}
> ```

Para realizar la operación identidad en imagen, se utiliza el siguiente código:

```shell
PImage img;
PGraphics pg, pg2;
int x, y, matrixsize, loc ;
//Kernel para máscara identidad. Produce la misma imagen. 
float[][] matrix = { { 0, 0, 0},
                     { 0, 1, 0},
                     { 0, 0, 0}};
                     
void setup() {
  size(800, 300);
  pg = createGraphics(400, 300);
  pg2 = createGraphics(400, 300);
  img = loadImage("cat.jpg");
}

void draw() {
  
  matrixsize = 3;
  
  pg.beginDraw();
  pg.background(100);
  img.resize(400, 300);
  pg.image(img,0,0,400,300);
  pg.endDraw();
  pg.loadPixels();
  image(pg, 0, 0);
  
  pg2.beginDraw();
  pg2.loadPixels();
  for (x = 0; x < pg.width; x++) {
    for (y = 0; y < pg.height; y++ ) {
      color c = convolution(x, y, matrix, matrixsize, pg);
      loc = x + y * pg.width;
      pg2.pixels[loc] = c;
    }
  }
  pg2.updatePixels();
  pg2.endDraw();
  image(pg2,400,0);
}

color convolution(int x, int y, float[][] matrix, int matrixsize, PImage img)
{
  float rtotal = 0.0;
  float gtotal = 0.0;
  float btotal = 0.0;
  int offset = matrixsize / 2;
  for (int i = 0; i < matrixsize; i++){
    for (int j= 0; j < matrixsize; j++){
      // What pixel are we testing
      int xloc = x+i-offset;
      int yloc = y+j-offset;
      int loc = xloc + img.width*yloc;
      // Make sure we haven't walked off our image, we could do better here
      loc = constrain(loc,0,img.pixels.length-1);
      // Calculate the convolution
      rtotal += (red(img.pixels[loc]) * matrix[i][j]);
      gtotal += (green(img.pixels[loc]) * matrix[i][j]);
      btotal += (blue(img.pixels[loc]) * matrix[i][j]);
    }
  }
  // Make sure RGB is within range
  rtotal = constrain(rtotal, 0, 255);
  gtotal = constrain(gtotal, 0, 255);
  btotal = constrain(btotal, 0, 255);
  // Return the resulting color
  return color(rtotal, gtotal, btotal);
}
```
El resultado de la operación identidad se presenta a la izquierda y la imagen original a la derecha.

![ImgIdentity](/docs/sketches/identity.jpg)

#### Box blur
Un Box Blur es un filtro lineal en el que cada píxel resulta del promedio de sus vecinos tomando el siguiente kernel:

> :Formula align=center
> ```
> \frac{1}{9}
> \begin{bmatrix}
> 1 & 1 & 1 \\      
> 1 & 1 & 1 \\
> 1 & 1 & 1
> \end{bmatrix}
> ```

Para realizar el desenfoque de cuadro de la imagen, se utiliza el siguiente código:

```shell
PImage img;
PGraphics pg, pg2;
int x, y, matrixsize, loc ;
//Kernel para máscara Box Blur. 
float[][] matrix = { { 0.1111, 0.1111, 0.1111 },
                     { 0.1111,  0.1111, 0.1111 },
                     { 0.1111, 0.1111,0.1111 } };

void setup() {
  size(800, 300);
  pg = createGraphics(400, 300);
  pg2 = createGraphics(400, 300);
  img = loadImage("cat.jpg");
}

void draw() {
  
  matrixsize = 3;
  
  pg.beginDraw();
  pg.background(100);
  img.resize(400, 300);
  pg.image(img,0,0,400,300);
  pg.endDraw();
  pg.loadPixels();
  image(pg, 0, 0);
  
  pg2.beginDraw();
  pg2.loadPixels();
  for (x = 0; x < pg.width; x++) {
    for (y = 0; y < pg.height; y++ ) {
      color c = convolution(x, y, matrix, matrixsize, pg);
      loc = x + y * pg.width;
      pg2.pixels[loc] = c;
    }
  }
  pg2.updatePixels();
  pg2.endDraw();
  image(pg2,400,0);
}

color convolution(int x, int y, float[][] matrix, int matrixsize, PImage img)
{
  float rtotal = 0.0;
  float gtotal = 0.0;
  float btotal = 0.0;
  int offset = matrixsize / 2;
  for (int i = 0; i < matrixsize; i++){
    for (int j= 0; j < matrixsize; j++){
      // What pixel are we testing
      int xloc = x+i-offset;
      int yloc = y+j-offset;
      int loc = xloc + img.width*yloc;
      // Make sure we haven't walked off our image, we could do better here
      loc = constrain(loc,0,img.pixels.length-1);
      // Calculate the convolution
      rtotal += (red(img.pixels[loc]) * matrix[i][j]);
      gtotal += (green(img.pixels[loc]) * matrix[i][j]);
      btotal += (blue(img.pixels[loc]) * matrix[i][j]);
    }
  }
  // Make sure RGB is within range
  rtotal = constrain(rtotal, 0, 255);
  gtotal = constrain(gtotal, 0, 255);
  btotal = constrain(btotal, 0, 255);
  // Return the resulting color
  return color(rtotal, gtotal, btotal);
}
```
El resultado de desenfoque de cuadro se presenta a la izquierda y la imagen original a la derecha.

![ImgBoxBlur](/docs/sketches/boxblur.jpg)

#### Edge Detection

Máscara que sirve para encontrar los puntos de cambio drástico del brillo en una imagen, a través del siguiente Kernel:

> :Formula align=center
> ```
> \begin{bmatrix}
> -1 & -1 & -1 \\      
> -1 & 8 & -1 \\
> -1 & -1 & -1
> \end{bmatrix}
> ```

Con el siguiente código, se obtiene la detección de bordes de la imagen:

```shell
PImage img;
PGraphics pg, pg2;
int x, y, matrixsize, loc ;
//Kernel para detección de bordes de tercer nivel       
float[][] matrix = { { -1, -1, -1},
                     { -1, 8, -1},
                     { -1, -1, -1}}; 

void setup() {
  size(800, 300);
  pg = createGraphics(400, 300);
  pg2 = createGraphics(400, 300);
  img = loadImage("cat.jpg");
}

void draw() {
  
  matrixsize = 3;
  
  pg.beginDraw();
  pg.background(100);
  img.resize(400, 300);
  pg.image(img,0,0,400,300);
  pg.endDraw();
  pg.loadPixels();
  image(pg, 0, 0);
  
  pg2.beginDraw();
  pg2.loadPixels();
  for (x = 0; x < pg.width; x++) {
    for (y = 0; y < pg.height; y++ ) {
      color c = convolution(x, y, matrix, matrixsize, pg);
      loc = x + y * pg.width;
      pg2.pixels[loc] = c;
    }
  }
  pg2.updatePixels();
  pg2.endDraw();
  image(pg2,400,0);
}

color convolution(int x, int y, float[][] matrix, int matrixsize, PImage img)
{
  float rtotal = 0.0;
  float gtotal = 0.0;
  float btotal = 0.0;
  int offset = matrixsize / 2;
  for (int i = 0; i < matrixsize; i++){
    for (int j= 0; j < matrixsize; j++){
      // What pixel are we testing
      int xloc = x+i-offset;
      int yloc = y+j-offset;
      int loc = xloc + img.width*yloc;
      // Make sure we haven't walked off our image, we could do better here
      loc = constrain(loc,0,img.pixels.length-1);
      // Calculate the convolution
      rtotal += (red(img.pixels[loc]) * matrix[i][j]);
      gtotal += (green(img.pixels[loc]) * matrix[i][j]);
      btotal += (blue(img.pixels[loc]) * matrix[i][j]);
    }
  }
  // Make sure RGB is within range
  rtotal = constrain(rtotal, 0, 255);
  gtotal = constrain(gtotal, 0, 255);
  btotal = constrain(btotal, 0, 255);
  // Return the resulting color
  return color(rtotal, gtotal, btotal);
}
```
El resultado de detección de bordes se presenta a la izquierda y la imagen original a la derecha.

![ImgEdgeDetection](/docs/sketches/edgedetection.jpg)

#### Gaussian Blur 3x3
Está mascara se utiliza para reducir el ruido de la imagen y reducir los detalles con la siguiente matriz 3x3: 

> :Formula align=center
> ```
> \frac{1}{16}
> \begin{bmatrix}
> 1 & 2 & 1 \\      
> 2 & 4 & 2 \\
> 1 & 2 & 1
> \end{bmatrix}
> ```

Para realizar el desenfoque gaussiano 3x3 en imagen, se utiliza el siguiente código:

```shell
PImage img;
PGraphics pg, pg2;
int x, y, matrixsize, loc ;
//Kernel para desenfoque gaussiano con matriz 3x3
 float[][] matrix = {{0.0625, 0.125, 0.0625},
                     {0.125,  0.25,  0.125 },
                     {0.0625, 0.125, 0.0625}};

void setup() {
  size(800, 300);
  pg = createGraphics(400, 300);
  pg2 = createGraphics(400, 300);
  img = loadImage("cat.jpg");
}

void draw() {
  
  matrixsize = 3;
  
  pg.beginDraw();
  pg.background(100);
  img.resize(400, 300);
  pg.image(img,0,0,400,300);
  pg.endDraw();
  pg.loadPixels();
  image(pg, 0, 0);
  
  pg2.beginDraw();
  pg2.loadPixels();
  for (x = 0; x < pg.width; x++) {
    for (y = 0; y < pg.height; y++ ) {
      color c = convolution(x, y, matrix, matrixsize, pg);
      loc = x + y * pg.width;
      pg2.pixels[loc] = c;
    }
  }
  pg2.updatePixels();
  pg2.endDraw();
  image(pg2,400,0);
}

color convolution(int x, int y, float[][] matrix, int matrixsize, PImage img)
{
  float rtotal = 0.0;
  float gtotal = 0.0;
  float btotal = 0.0;
  int offset = matrixsize / 2;
  for (int i = 0; i < matrixsize; i++){
    for (int j= 0; j < matrixsize; j++){
      // What pixel are we testing
      int xloc = x+i-offset;
      int yloc = y+j-offset;
      int loc = xloc + img.width*yloc;
      // Make sure we haven't walked off our image, we could do better here
      loc = constrain(loc,0,img.pixels.length-1);
      // Calculate the convolution
      rtotal += (red(img.pixels[loc]) * matrix[i][j]);
      gtotal += (green(img.pixels[loc]) * matrix[i][j]);
      btotal += (blue(img.pixels[loc]) * matrix[i][j]);
    }
  }
  // Make sure RGB is within range
  rtotal = constrain(rtotal, 0, 255);
  gtotal = constrain(gtotal, 0, 255);
  btotal = constrain(btotal, 0, 255);
  // Return the resulting color
  return color(rtotal, gtotal, btotal);
}
```
El resultado de desenfoque gausiano 3x3 se presenta a la izquierda y la imagen original a la derecha.

![ImgGaussian3](/docs/sketches/gaussian3.jpg)

#### Gaussian Blur 5x5
Al igua que Gaussian Blur 3x3,busca reducir el ruido de la imagen y los detalles pero con una matriz 5x5. El kernel 5x5 es el siguiente:

> :Formula align=center
> ```
> \frac{1}{256}
> \begin{bmatrix}
> 1 & 4 & 6 & 4 & 1 \\
> 4 & 16 & 24 & 16 & 4 \\
> 6 & 24 & 36 & 24 & 6 \\
> 4 & 16 & 24 & 16 & 4 \\
> 1 & 4 & 6 & 4 & 1 
> \end{bmatrix}
> ```

Con el siguiente código, se realiza el desenfoque gaussiano 5x5 en imagen:

```shell
PImage img;
PGraphics pg, pg2;
int x, y, matrixsize, loc ;
//Kernel para desenfoque gaussiano con matriz 5x5
float[][] matrix = { { 0.0039, 0.0156, 0.02344, 0.0156, 0.0039},
                     { 0.0156, 0.0625, 0.09375, 0.0625, 0.0156},
                     { 0.02344, 0.09375, 0.1406, 0.09375, 0.02344},
                     { 0.0156, 0.0625, 0.09375, 0.0625, 0.0156},
                     { 0.0039, 0.0156, 0.02344, 0.0156, 0.0039}}; 

void setup() {
  size(800, 300);
  pg = createGraphics(400, 300);
  pg2 = createGraphics(400, 300);
  img = loadImage("cat.jpg");
}

void draw() {
  
  matrixsize = 5;
  
  pg.beginDraw();
  pg.background(100);
  img.resize(400, 300);
  pg.image(img,0,0,400,300);
  pg.endDraw();
  pg.loadPixels();
  image(pg, 0, 0);
  
  pg2.beginDraw();
  pg2.loadPixels();
  for (x = 0; x < pg.width; x++) {
    for (y = 0; y < pg.height; y++ ) {
      color c = convolution(x, y, matrix, matrixsize, pg);
      loc = x + y * pg.width;
      pg2.pixels[loc] = c;
    }
  }
  pg2.updatePixels();
  pg2.endDraw();
  image(pg2,400,0);
}

color convolution(int x, int y, float[][] matrix, int matrixsize, PImage img)
{
  float rtotal = 0.0;
  float gtotal = 0.0;
  float btotal = 0.0;
  int offset = matrixsize / 2;
  for (int i = 0; i < matrixsize; i++){
    for (int j= 0; j < matrixsize; j++){
      // What pixel are we testing
      int xloc = x+i-offset;
      int yloc = y+j-offset;
      int loc = xloc + img.width*yloc;
      // Make sure we haven't walked off our image, we could do better here
      loc = constrain(loc,0,img.pixels.length-1);
      // Calculate the convolution
      rtotal += (red(img.pixels[loc]) * matrix[i][j]);
      gtotal += (green(img.pixels[loc]) * matrix[i][j]);
      btotal += (blue(img.pixels[loc]) * matrix[i][j]);
    }
  }
  // Make sure RGB is within range
  rtotal = constrain(rtotal, 0, 255);
  gtotal = constrain(gtotal, 0, 255);
  btotal = constrain(btotal, 0, 255);
  // Return the resulting color
  return color(rtotal, gtotal, btotal);
}
```
El resultado de desenfoque gausiano 5x5 se presenta a la izquierda y la imagen original a la derecha.

![ImgGaussian5](/docs/sketches/gaussian5.jpg)

### Video
#### Identidad
Con el siguiente código se obtiene la operación identidad del video:

```shell
import processing.video.*;
PImage img;
PGraphics pg, pg2;
Movie myMovie;
int x, y, matrixsize, loc ;

//Kernel para máscara identidad. Produce la misma imagen.
float[][] matrix = { { 0, 0, 0},
                     { 0, 1, 0},
                     { 0, 0, 0}};
                     
void setup() {
  size(1000, 450);
  pg = createGraphics(500, 450);
  pg2 = createGraphics(500, 450);
  myMovie = new Movie(this, "cat.mp4");
  myMovie.loop();
}

void movieEvent(Movie m) {
  m.read();
}

void draw() { 
  matrixsize = 3;
  
  pg.beginDraw();
  pg.background(100);
  pg.image(myMovie, 0, 0, 500, 450);
  pg.endDraw();
  pg.loadPixels();
  image(pg, 0, 0, 500, 450);
  
  pg2.beginDraw();
  pg2.loadPixels();
  for (x = 0; x < pg.width; x++) {
    for (y = 0; y < pg.height; y++ ) {
      color c = convolution(x, y, matrix, matrixsize, pg);
      loc = x + y * pg.width;
      pg2.pixels[loc] = c;
    }
  }
  pg2.updatePixels();
  pg2.endDraw();
  image(pg2, 500, 0, 500, 450);
}

color convolution(int x, int y, float[][] matrix, int matrixsize, PGraphics pg)
{
  float rtotal = 0.0;
  float gtotal = 0.0;
  float btotal = 0.0;
  int offset = matrixsize / 2;
  for (int i = 0; i < matrixsize; i++){
    for (int j= 0; j < matrixsize; j++){
      // What pixel are we testing
      int xloc = x+i-offset;
      int yloc = y+j-offset;
      int loc = xloc + pg.width*yloc;
      // Make sure we haven't walked off our image, we could do better here
      loc = constrain(loc,0,pg.pixels.length-1);
      // Calculate the convolution
      rtotal += (red(pg.pixels[loc]) * matrix[i][j]);
      gtotal += (green(pg.pixels[loc]) * matrix[i][j]);
      btotal += (blue(pg.pixels[loc]) * matrix[i][j]);
    }
  }
  // Make sure RGB is within range
  rtotal = constrain(rtotal, 0, 255);
  gtotal = constrain(gtotal, 0, 255);
  btotal = constrain(btotal, 0, 255);
  // Return the resulting color
  return color(rtotal, gtotal, btotal);
}
```
El resultado de la operación identidad en video se presenta a la izquierda y el video original a la derecha.

![VidIdentity](/docs/sketches/identity.gif)

#### Box blur
Para realizar el desenfoque de cuadro de un video, se utiliza el siguiente código:

```shell
import processing.video.*;
PImage img;
PGraphics pg, pg2;
Movie myMovie;
int x, y, matrixsize, loc ;

//Kernel para máscara Box Blur. 
float[][] matrix = { { 0.1111, 0.1111, 0.1111 },
                     { 0.1111,  0.1111, 0.1111 },
                     { 0.1111, 0.1111,0.1111 } };
                     
void setup() {
  size(1000, 450);
  pg = createGraphics(500, 450);
  pg2 = createGraphics(500, 450);
  myMovie = new Movie(this, "cat.mp4");
  myMovie.loop();
}

void movieEvent(Movie m) {
  m.read();
}

void draw() { 
  matrixsize = 3;
  
  pg.beginDraw();
  pg.background(100);
  pg.image(myMovie, 0, 0, 500, 450);
  pg.endDraw();
  pg.loadPixels();
  image(pg, 0, 0, 500, 450);
  
  pg2.beginDraw();
  pg2.loadPixels();
  for (x = 0; x < pg.width; x++) {
    for (y = 0; y < pg.height; y++ ) {
      color c = convolution(x, y, matrix, matrixsize, pg);
      loc = x + y * pg.width;
      pg2.pixels[loc] = c;
    }
  }
  pg2.updatePixels();
  pg2.endDraw();
  image(pg2, 500, 0, 500, 450);
}

color convolution(int x, int y, float[][] matrix, int matrixsize, PGraphics pg)
{
  float rtotal = 0.0;
  float gtotal = 0.0;
  float btotal = 0.0;
  int offset = matrixsize / 2;
  for (int i = 0; i < matrixsize; i++){
    for (int j= 0; j < matrixsize; j++){
      // What pixel are we testing
      int xloc = x+i-offset;
      int yloc = y+j-offset;
      int loc = xloc + pg.width*yloc;
      // Make sure we haven't walked off our image, we could do better here
      loc = constrain(loc,0,pg.pixels.length-1);
      // Calculate the convolution
      rtotal += (red(pg.pixels[loc]) * matrix[i][j]);
      gtotal += (green(pg.pixels[loc]) * matrix[i][j]);
      btotal += (blue(pg.pixels[loc]) * matrix[i][j]);
    }
  }
  // Make sure RGB is within range
  rtotal = constrain(rtotal, 0, 255);
  gtotal = constrain(gtotal, 0, 255);
  btotal = constrain(btotal, 0, 255);
  // Return the resulting color
  return color(rtotal, gtotal, btotal);
}
```
El resultado de desenfoque de cuadro en video se presenta a la izquierda y el video original a la derecha.

![VidBoxBlur](/docs/sketches/boxblur.gif)

#### Edge Detection
El siguiente código es la solución para obtener la detección de bordes de un video:

```shell
import processing.video.*;
PImage img;
PGraphics pg, pg2;
Movie myMovie;
int x, y, matrixsize, loc ;

//Kernel para detección de bordes de tercer nivel       
float[][] matrix = { { -1, -1, -1},
                     { -1, 8, -1},
                     { -1, -1, -1}}; 
                     
void setup() {
  size(1000, 450);
  pg = createGraphics(500, 450);
  pg2 = createGraphics(500, 450);
  myMovie = new Movie(this, "cat.mp4");
  myMovie.loop();
}

void movieEvent(Movie m) {
  m.read();
}

void draw() { 
  matrixsize = 3;
  
  pg.beginDraw();
  pg.background(100);
  pg.image(myMovie, 0, 0, 500, 450);
  pg.endDraw();
  pg.loadPixels();
  image(pg, 0, 0, 500, 450);
  
  pg2.beginDraw();
  pg2.loadPixels();
  for (x = 0; x < pg.width; x++) {
    for (y = 0; y < pg.height; y++ ) {
      color c = convolution(x, y, matrix, matrixsize, pg);
      loc = x + y * pg.width;
      pg2.pixels[loc] = c;
    }
  }
  pg2.updatePixels();
  pg2.endDraw();
  image(pg2, 500, 0, 500, 450);
}

color convolution(int x, int y, float[][] matrix, int matrixsize, PGraphics pg)
{
  float rtotal = 0.0;
  float gtotal = 0.0;
  float btotal = 0.0;
  int offset = matrixsize / 2;
  for (int i = 0; i < matrixsize; i++){
    for (int j= 0; j < matrixsize; j++){
      // What pixel are we testing
      int xloc = x+i-offset;
      int yloc = y+j-offset;
      int loc = xloc + pg.width*yloc;
      // Make sure we haven't walked off our image, we could do better here
      loc = constrain(loc,0,pg.pixels.length-1);
      // Calculate the convolution
      rtotal += (red(pg.pixels[loc]) * matrix[i][j]);
      gtotal += (green(pg.pixels[loc]) * matrix[i][j]);
      btotal += (blue(pg.pixels[loc]) * matrix[i][j]);
    }
  }
  // Make sure RGB is within range
  rtotal = constrain(rtotal, 0, 255);
  gtotal = constrain(gtotal, 0, 255);
  btotal = constrain(btotal, 0, 255);
  // Return the resulting color
  return color(rtotal, gtotal, btotal);
}
```
El resultado de detección de bordes en video se presenta a la izquierda y el video original a la derecha.

![VidEdgeDetection](/docs/sketches/edgedetection.gif)

#### Gaussian Blur 3x3
Con el siguiente código, se obtiene el desenfoque gaussiano 3x3 para video:

```shell
import processing.video.*;
PImage img;
PGraphics pg, pg2;
Movie myMovie;
int x, y, matrixsize, loc ;

//Kernel para desenfoque gaussiano con matriz 3x3
 float[][] matrix = {{0.0625, 0.125, 0.0625},
                     {0.125,  0.25,  0.125 },
                     {0.0625, 0.125, 0.0625}};
                     
void setup() {
  size(1000, 450);
  pg = createGraphics(500, 450);
  pg2 = createGraphics(500, 450);
  myMovie = new Movie(this, "cat.mp4");
  myMovie.loop();
}

void movieEvent(Movie m) {
  m.read();
}

void draw() { 
  matrixsize = 3;
  
  pg.beginDraw();
  pg.background(100);
  pg.image(myMovie, 0, 0, 500, 450);
  pg.endDraw();
  pg.loadPixels();
  image(pg, 0, 0, 500, 450);
  
  pg2.beginDraw();
  pg2.loadPixels();
  for (x = 0; x < pg.width; x++) {
    for (y = 0; y < pg.height; y++ ) {
      color c = convolution(x, y, matrix, matrixsize, pg);
      loc = x + y * pg.width;
      pg2.pixels[loc] = c;
    }
  }
  pg2.updatePixels();
  pg2.endDraw();
  image(pg2, 500, 0, 500, 450);
}

color convolution(int x, int y, float[][] matrix, int matrixsize, PGraphics pg)
{
  float rtotal = 0.0;
  float gtotal = 0.0;
  float btotal = 0.0;
  int offset = matrixsize / 2;
  for (int i = 0; i < matrixsize; i++){
    for (int j= 0; j < matrixsize; j++){
      // What pixel are we testing
      int xloc = x+i-offset;
      int yloc = y+j-offset;
      int loc = xloc + pg.width*yloc;
      // Make sure we haven't walked off our image, we could do better here
      loc = constrain(loc,0,pg.pixels.length-1);
      // Calculate the convolution
      rtotal += (red(pg.pixels[loc]) * matrix[i][j]);
      gtotal += (green(pg.pixels[loc]) * matrix[i][j]);
      btotal += (blue(pg.pixels[loc]) * matrix[i][j]);
    }
  }
  // Make sure RGB is within range
  rtotal = constrain(rtotal, 0, 255);
  gtotal = constrain(gtotal, 0, 255);
  btotal = constrain(btotal, 0, 255);
  // Return the resulting color
  return color(rtotal, gtotal, btotal);
}
```
El resultado de desenfoque gaussiano 3x3 en video se presenta a la izquierda y el video original a la derecha.

![VidGaussian3](/docs/sketches/gaussian3.gif)

#### Gaussian Blur 5x5
Para obtener un desenfoque gaussiano 5x5, se realiza con el siguiente código:

```shell
import processing.video.*;
PImage img;
PGraphics pg, pg2;
Movie myMovie;
int x, y, matrixsize, loc ;

//Kernel para desenfoque gaussiano con matriz 5x5
float[][] matrix = { { 0.0039, 0.0156, 0.02344, 0.0156, 0.0039},
                     { 0.0156, 0.0625, 0.09375, 0.0625, 0.0156},
                     { 0.02344, 0.09375, 0.1406, 0.09375, 0.02344},
                     { 0.0156, 0.0625, 0.09375, 0.0625, 0.0156},
                     { 0.0039, 0.0156, 0.02344, 0.0156, 0.0039}}; 
                     
void setup() {
  size(1000, 450);
  pg = createGraphics(500, 450);
  pg2 = createGraphics(500, 450);
  myMovie = new Movie(this, "cat.mp4");
  myMovie.loop();
}

void movieEvent(Movie m) {
  m.read();
}

void draw() { 
  matrixsize = 5;
  
  pg.beginDraw();
  pg.background(100);
  pg.image(myMovie, 0, 0, 500, 450);
  pg.endDraw();
  pg.loadPixels();
  image(pg, 0, 0, 500, 450);
  
  pg2.beginDraw();
  pg2.loadPixels();
  for (x = 0; x < pg.width; x++) {
    for (y = 0; y < pg.height; y++ ) {
      color c = convolution(x, y, matrix, matrixsize, pg);
      loc = x + y * pg.width;
      pg2.pixels[loc] = c;
    }
  }
  pg2.updatePixels();
  pg2.endDraw();
  image(pg2, 500, 0, 500, 450);
}

color convolution(int x, int y, float[][] matrix, int matrixsize, PGraphics pg)
{
  float rtotal = 0.0;
  float gtotal = 0.0;
  float btotal = 0.0;
  int offset = matrixsize / 2;
  for (int i = 0; i < matrixsize; i++){
    for (int j= 0; j < matrixsize; j++){
      // What pixel are we testing
      int xloc = x+i-offset;
      int yloc = y+j-offset;
      int loc = xloc + pg.width*yloc;
      // Make sure we haven't walked off our image, we could do better here
      loc = constrain(loc,0,pg.pixels.length-1);
      // Calculate the convolution
      rtotal += (red(pg.pixels[loc]) * matrix[i][j]);
      gtotal += (green(pg.pixels[loc]) * matrix[i][j]);
      btotal += (blue(pg.pixels[loc]) * matrix[i][j]);
    }
  }
  // Make sure RGB is within range
  rtotal = constrain(rtotal, 0, 255);
  gtotal = constrain(gtotal, 0, 255);
  btotal = constrain(btotal, 0, 255);
  // Return the resulting color
  return color(rtotal, gtotal, btotal);
}
```
El resultado de desenfoque gaussiano 5x5 en video se presenta a la izquierda y el video original a la derecha.

![VidGaussian5](/docs/sketches/gaussian5.gif)





## Conversión de la imagen  arte ASCII
### Problem statement
Transformar imágenes sin importar si son a color o no en una imagen representada por caracteres digitables del cosdigo ASCII.

### Background
La imagen es cargada de forma que se mantengan los tres canales de color para cada pixe, luego iteramos por la matriz de pixeles, de forma empirica se de duce que el tamaño de cada caracter normalmente es el doble de alto que de ancho, por lo que se intera dando saltos en los indices de la matriz segun la regla mencionada.
Calculamos en cada ocacion el promedio aritmetico RGB basados en el valor de cada uno de los canales, para luego el valor de gris obtenido mediante una regla de tres simple se transforme en un caracter de ASCII.
Los caracteres se encuantran almacenados en un arreglo previamente ordenado segun el peso en la escala de gris que pueden generar, orden tomado de la web. 

> :Formula align=center
> ```
> Caracter = (\frac{1}{3} (R+G+B) * 90)/255
> ```

### Code (solution) & results

```shell
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
 
  createCanvas(width, height); 
  background(255); 
  fill(0); 
  textFont("Courier", 6); 
  img1.resize(width,height); 
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
```

A continuación se presente la imagen original y el resultado obtenido.

> :P5 width=900, height=900
>
> let img; 
> function preload(){ img = loadImage('/vc/docs/sketches/arboles.jpg'); }
> function setup() { createCanvas(900, 900); image(img, 0, 0,width,height); }

> :P5  sketch=/docs/sketches/asciiart.js, width=900, height=900


## Conversión de la imagen a un foto-mosaico

* Descargar: [Foto Mosaico](https://github.com/alex22barreto/vc/blob/main/docs/md/docs/workshops/files/Mosaico.zip)

Esta es la imagen original de mi mascota Bruno

![Imagen original](https://raw.githubusercontent.com/snriverar84/vc/main/docs/sketches/mosaico_1.png)

El primer paso para armar el mosaico, es redibujar la imagen en una cuadricula (cuyo valor de tamaño se puede cambiar)

![Imagen en cuadricula](https://raw.githubusercontent.com/snriverar84/vc/main/docs/sketches/mosaico_2.png)

El segundo paso, es quitar los bordes de la cuadricula, esto da la impresion de una imagen pixelada pero con pixeles mucho mas grandes

![Imagen en cuadricula sin bordes](https://raw.githubusercontent.com/snriverar84/vc/main/docs/sketches/mosaico_3.png)

En el tercer paso se modifica la imagen a blanco y negro, para asi analizar el brillo (brightness) de cada pixel.

![Imagen en cuadricula sin bordes](https://raw.githubusercontent.com/snriverar84/vc/main/docs/sketches/mosaico_4.png)

Posteriormente se seleccionan las imagenes que van a formar el mosaico. Cada una de estas imagenes se pasa a blanco y negro, se analiza su nivel de brillo y al recorrer el arreglo de la imagen original, esta se construye con la imagen de mosaico con el nivel de brillo mas parecido al pixel a reemplazar

![Imagenes para el mosaico](https://raw.githubusercontent.com/snriverar84/vc/main/docs/sketches/mosaico_5.png)

Por último, tenemos el resultado final

![IResultado final](https://raw.githubusercontent.com/snriverar84/vc/main/docs/sketches/mosaico_6.png)


## Conclusions & future work
Una imagen en escala de grises es simplemente una en la que los únicos colores son tonos de gris por lo que se necesita proporcionar menos información para cada píxel. Un color gris es aquel en el que los componentes rojo, verde y azul tienen todos la misma intensidad en el espacio RGB, por lo que solo es necesario especificar un valor de intensidad único para cada píxel, a diferencia de las tres intensidades necesarias para especificar cada píxel en una imagen a color. Y para obtener una imagen en escala de grises, existen varios métodos como luma y promedio RGB. 

El procesamiento de imágenes busca mejorar el aspecto de las imágenes y hacer más evidentes en ellas ciertos detalles que se desean hacer notar. Uno de los métodos para realizar este procesamiento son las máscaras de convolución, que ayudan a aplicar ciertos filtros y obtener características de las imagenes puesto que esta técnica modifica las matrices de la imagen según lo que se desee realizar.

Ademas de la aplicacion de filtros para mejorar la imagen en general o para resaltar detalles podemos con estos conceptos base hacer analisis con respecto a la intensidad del color en un pixel o grupo de ellos para transformar la imagen a una equivalente pero que como en el caso del arte ASCII la imagen se ve si se visualiza la totalidad de la imagen, si se revisa por pequeñas partes solo veremos conjuntos de letras sin sentido, caso contrario con la foto mosaico, que dependiendo de la imagen y el tamaño del grupo de pixeles puede que de forma general la visualizacion de la imagen no sea tan fiel a la imagen original pero si inspeccionamos pequeñas partes de la imagen seguramente tendremos una cantidad de informacion mayor, que puede ser incluso informacion distinta a la de la imagen general, transmitiendo gran cantidad de informacion en una sola imagen. 

Para un trabajo futuro, se busca investigar e implementar más métodos de conversión a escala de grises y conocer la diferencia entre cada uno de ellos. 
Ademas, se puede estudiar porque se consiguen dichos efectos en las imagenes tratadas y también si existe un método para obtener la imagen original a partir de una imagen modificada por máscaras de convolución o las transformaciones a mosaico o arte ASCII.

> :ToCPrevNext