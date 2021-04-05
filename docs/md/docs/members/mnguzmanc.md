# Marcela Guzmán Caicedo

## Bio

Estudiante de 24 años de Ingenieria de Sistemas de la Universidad Nacional de Colombia. 

## Hobbies

Me gusta escuchar música y tomar fotos a los amaneceres y atardeceres.

## Ilusión Café Wall

La ilusión de la pared de la cafetería, es una ilusión optica-geometrica la cual fue notado como un patrón en las baldosas de una cafetería en St Michael's Hill, Bristol (Reino Unido) por el psicologo Richard Gregory en 1973.

se puede ver a Richard Gregory en la pared del café original en St Michael's Hill en Febrero del 2010.

![Image of Richar and Cafe Wall](https://upload.wikimedia.org/wikipedia/commons/7/79/CafeWall.jpg)

La pared está formada por baldosas blancas y negras alternadas y divididas por líneas paralelas que dan la ilusión de estar inclinadas.

La ilusión de la pared del café ha ayudado a los neuropsicólogos a estudiar la forma en que el cerebro procesa la información visual. La ilusión también se ha utilizado en aplicaciones de diseño gráfico y arte, así como en aplicaciones arquitectónicas.

### Explicación

Las líneas diagonales se perciben por la forma en que interactúan las neuronas del cerebro. Diferentes tipos de neuronas reaccionan a la percepción de colores oscuros y claros, y debido a la ubicación de los mosaicos oscuros y claros, diferentes partes de las líneas paralelas se atenúan o se aclaran en la retina. En donde se encuentra un contraste de brillo a lo largo de la línea paralela, se produce una asimetría a pequeña escala en la que la mitad de las baldosas oscuras y claras se mueven una hacia la otra formando pequeñas porciones. Estas porciones pequeñas luego se integran en porciones largas, y el cerebro interpreta la línea paralela como una línea inclinada.

![Image of Cafe Wall](https://upload.wikimedia.org/wikipedia/commons/d/d2/Caf%C3%A9_wall.svg)

### Código en Processing:

```shell
int s=89;
color black=color(0);
color white=color(255);
Line l[];
float update=0;

void setup() {
  size(810, 680);
  stroke(89, 89, 89);
  strokeWeight(2);
  l=new Line[8];

  for (int i=0; i<8; i++) {
    l[i]=new Line(i*90);
  }
}

void draw() {

  for (int i=0; i<8; i++) {
    if (i%2==0)
      l[i].drawL(-270+update);
    else
      l[i].drawL(-270-update);
  }
  update=update+0.5;
  if (update==180)
    update=0;
}

class Line {

  int n=20;
  float posY;

  Line(float posY) {
    this.posY=posY;
  }

  void drawL(float diff) {

    for (int i=0; i<16; i++) {
      float posX=i*90 +diff;
      if (i%2==0) {
        fill(0);
        rect(posX, posY, s, s);
      } else {
        fill(255);
        rect(posX, posY, s, s);
      }
    }
  }
}
//Código tomado de: http://nrajansblog.blogspot.com/2018/05/cafe-wall-illusion-using-processing.html
```

> :ToCPrevNext
