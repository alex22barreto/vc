# Rendering

## Problem statement
Realizar una indagación teórica de algún algoritmo de visibilidad o algún método de iluminación global.

## Background

### Path tracing
Path tracing o trazado de caminos, es un método de renderizado de imágenes, similar al método ray tracing, que utiliza muestras aleatorias para calcular gradualmente una imagen final con el fin de que la iluminación global sea fiel a la realidad.

La iluminación global hace referencia al conjunto de algoritmos usados en gráficos que buscan añadir realismo a la modelación de la luz en escenas 3D. Estos algoritmos tienen en cuenta la luz directa de una fuente de luz y los rayos de luz provenientes de las reflexiones de luz sobre las superficies de la escena.

El trazado de ruta es un algoritmo que envía rayos desde la cámara y, cuando un rayo golpea una superficie reflectante o refractiva, repite el proceso hasta que alcanza una fuente de luz. La serie de rayos de la cámara a la luz forma un "camino".

### Historia
El trazado de caminos fue el primer algoritmo de renderizado utilizado en gráficos. Fue presentado por James Kajiya en 1986, quien lo introdujo en el mismo artículo que describió por primera vez la ecuación de renderizado. 
Este método se introdujo como un algoritmo para encontrar una solución numérica de la integral de la ecuación de renderizado y genera de manera incremental, caminos de eventos de dispersión que comienzan en la cámara y terminan en las fuentes de luz de la escena. Una década más tarde, Lafortune sugirió muchos refinamientos, incluyendo el trazado de caminos bidireccional.

En 1977, se introdujo el método de transporte de luz de metrópolis, por Eric Veach y Leonidas J. Guibas, el cual pertuba los caminos encontrados con el fin de aumentar el rendimiento de escenas difíciles.

El interés hacia el algoritmo de trazado de caminos se ha incrementado gracias la potencia de las CPUs y GPUs para renderizar imágenes mucho más rápido. Así, en 2002 Tim Purcell presentó por primera vez un algoritmo de iluminación global que se ejecuta en una GPU. En febrero de 2009, Austin Robison de Nvidia mostró la primera aplicación comercial de trazado de caminos que se ejecuta en una GPU, y otras implementaciones han seguido, como la de Vladimir Koylazov en agosto de 2009. 

En la industria del cine, Blue Sky Studios, Sony Pictures Imageworks, Walt Disney Animation Studios, Pixar Animation Studios, han utilizado el trazado de caminos para alguno de sus proyectos. 

### Descripción
Debido a que el método de trazado de caminos es una solución a la ecuación de renderizado, debe cumplir los siguientes tres principios:

* `Principio de iluminación global:` para una escena interior determinada, todos los objetos de la habitación deben aportar iluminación a todos los demás objetos.

* `Principio de equivalencia:` no hay distinción entre la iluminación emitida por una fuente de luz y la iluminación reflejada por una superficie, es decir que la luz reflejada es equivalente a la luz emitida.

* `Principio de dirección:` La iluminación que proviene de las superficies debe dispersarse en una dirección particular que es alguna función de la dirección de entrada de la iluminación de llegada y la dirección de salida que se muestrea, por lo cual la luz reflejada y luz dispersada tienen una dirección.

### Algoritmo en Pseudocódigo
```shell
Color TracePath(Ray ray, count depth) {
    if (depth >= MaxDepth) {
      return Black;  // Rebotes suficientes.
    }

    ray.FindNearestObject();
    if (ray.hitSomething == false) {
      return Black;  // No hubo intersección.
    }

    Material material = ray.thingHit->material;
    Color emittance = material.emittance;

    // Escoger una dirección aleatoria y continuar.
    Ray newRay;
    newRay.origin = ray.pointWhereObjWasHit;
    newRay.direction = RandomUnitVectorInHemisphereOf(ray.normalWhereObjWasHit);

    // PProbabilidad de newRay
    const float p = 1 / (2 * PI);

    // Calcular el BRDF para el rayo
    float cos_theta = DotProduct(newRay.direction, ray.normalWhereObjWasHit);
    Color BRDF = material.reflectance / PI;

    // Trazar recursivamente las fuentes de luz reflejadas.
    Color incoming = TracePath(newRay, depth + 1);

    // Aplicar la ecuación de renderizado. 
    return emittance + (BRDF * incoming * cos_theta / p);
  }

  void Render(Image finalImage, count numSamples) {
    foreach (pixel in finalImage) {
      foreach (i in numSamples) {
        Ray r = camera.generateRay(pixel);
        pixel.color += TracePath(r, 0);
      }
      pixel.color /= numSamples;  // Promedio de muestras.
    }
  }
```

Este es el procedimiento para realizar un trazado de camino sencillo. La función TracePath calcula una sola muestra de un píxel, donde solo se considera recorrido de recopilación. Luego, todas las muestras se promedian para obtener el color de salida.   

### Muestreo aleatorio
En Path Tracing, los rayos se distribuyen aleatoriamente dentro de cada píxel en la sala de la cámara y en cada intersección con un objeto en la escena, se genera un nuevo rayo de reflexión apuntando en una dirección aleatoria. Después de un cierto número de rebotes, cada rayo finalmente abandona la escena o es absorbido. Cuando un rayo termina de indagar en la escena, se calcula un valor de muestra en función de los objetos contra los que rebotó. El valor de la muestra se suma al promedio del píxel de origen.

Las muestras en una imagen con trazado de caminos se distribuyen uniformemente en todos los píxeles. El color de cada píxel es el promedio de todas las muestras calculadas para ese píxel.
Los componentes aleatorios en trazado de caminos, hacen que la imagen renderizada parezca ruidosa pero el ruido disminuye con el tiempo a medida que se calculan más y más muestras.

El factor decisivo para la calidad del renderizado es el número de muestras por píxel (SPP). Cuanto mayor sea el SPP que tenga en una imagen renderizada, menos ruido se notará. 
Las tomas en exteriores se pueden reproducir con SPP relativamente bajos cuando se tiene la luz solar. Pero en tomas en interiores y escenas similares en entornos con poca luz, se requieren un número de SPP mucho más alto para verse bien. 

### Trazado de caminos bidireccional
El muestreo de un punto se puede realizar mediante cualquiera de los dos siguientes enfoques:

* Trazado de camino hacia atrás: donde los caminos se generan empezando desde la cámara y rebotando alrededor de la escena hasta que encuentre una fuente de luz.

* Trazado de luz: donde el camino se genera desde las fuentes de luz y rebotan alrededor de la escena hasta que encuentran la cámara.

El trazado de caminos bidireccional proporciona un algoritmo que combina los dos enfoques y puede producir una varianza más baja que cualquiera de los métodos por separado. Para cada muestra, se trazan dos caminos de forma independiente: uno utilizando la fuente de luz y otro desde la cámara. Esto produce un conjunto de posibles estrategias de muestreo, donde cada vértice de un camino se puede conectar directamente a cada vértice del otro. Esto funciona particularmente bien para escenas que se iluminan principalmente mediante iluminación indirecta. 

### Metropolis light transport
Este algoritmo fue propuesto en 1997 por Veach y Guibas y creado para lograr una convergencia más rápida en escenas en las que la luz debe atravesar pasillos extraños o pequeños agujeros para llegar a la parte de la escena que está viendo la cámara. 

El algoritmo consta de dos fases, en la primera se utiliza un trazado de rayos bidireccional para generar un conjunto de caminos iniciales de la luz y en la segunda fase, cada uno de estos caminos sufrirá una mutación que será aceptada o rechazada según una probabilidad. En este sentido, el algoritmo "recuerda" las trayectorias exitosas desde las fuentes de luz hasta la cámara. 

## Conclusions && future work
Path tracing es un algoritmo que se basa en lanzar rayos desde la cámara a la escena y que cuando uno de estos se encuentra con un objeto, se lanza un nuevo rayo en una dirección aleatoria, formando así un camino de rayos. Este proceso puede llegar a ser impreciso y por eso es necesario repetir el proceso la mayor cantidad de veces para poder obtener un resultado satisfactorio.

Para un trabajo futuro se espera realizar la implementación del algoritmo y profundizar más en las aplicaciones.

> :ToCPrevNext