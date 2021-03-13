# Visual Computing Template

Welcome to the [UN / DISI](http://www.ingenieria.unal.edu.co/dependencias/departamentos/departamento-de-ingenieria-de-sistemas-e-industrial) _visual computing_ course template site.

## Goal

To study the process of creation and manipulation of a digital image of a modern visual application, using current hardware.

## Methodology

[Active-learning](https://en.wikipedia.org/wiki/Active_learning) using [free-software](https://en.wikipedia.org/wiki/Free_software) to develop:

* [Slides](https://github.com/orgs/alex22barreto/teams/presentations/repositories).
* [nub](https://github.com/alex22barreto/nub) and [p5.nub.js](https://github.com/alex22barreto/p5.nub.js).
* [p5.quadrille.js](https://github.com/objetos/p5.quadrille.js).

## Grading

Workshops [blog posts](https://en.wikipedia.org/wiki/Edublog)-like reports produced with [codedoc](https://codedoc.cc/) and [p5.js](https://p5js.org/) and having a basic research structure:
  * Problem statement
  * Background
  * Code (solution) & results
  * Conclusions & future work

## Outline

| To read | Subject                                                            | 
|------------|--------------------------------------------------------------------|
|            | [Introduction](https://github.com/alex22barreto/Introduction)    |
|            | [Processing](https://processing.org/) & [p5.js](https://p5js.org/) |
| [gh-pages](https://pages.github.com/) | [VC Template](https://alex22barreto.github.io/vc/) |
| [Do we see reality as it is?](http://y2u.be/oYp5XuGYqqY) | [Cognitive](https://github.com/alex22barreto/Cognitive) | 
| [The barycentric conspiracy](https://fgiesen.wordpress.com/2013/02/06/the-barycentric-conspirac/) | [Rendering & Algorithm visualization](https://github.com/alex22barreto/Rendering) | 
| [Shaders tutorial](https://processing.org/tutorials/pshader/) | [Fragment Shaders](https://github.com/alex22barreto/FragmentShaders) |
| [3D Math primer for Graphics and Game Development -- chs. 8 & 9](https://tfetimes.com/wp-content/uploads/2015/04/F.Dunn-I.Parberry-3D-Math-Primer-for-Graphics-and-Game-Development.pdf), [Projection matrix](http://www.songho.ca/opengl/gl_projectionmatrix.html) | [Affine Transformations](https://github.com/alex22barreto/Transformations) |
| [nub](https://github.com/alex22barreto/nub) | [SceneGraphs](https://github.com/alex22barreto/SceneGraphs) |
| [A Survey of Interaction Techniques](https://hal.inria.fr/hal-00789413/document) | [Interaction](https://github.com/alex22barreto/Interaction) |
| [Shaders tutorial](https://processing.org/tutorials/pshader/) | [Vertex Shaders](https://github.com/alex22barreto/VertexShaders) |
| [Visualizing Data](http://media.espora.org/mgoblin_media/media_entries/1633/Visualizing_Data.pdf), [Network Science -- ch. 2](http://networksciencebook.com/chapter/2) | Data Visualization | 

## Hacking

The webpage is to be developed in _markdown_ ([CommonMark](https://spec.commonmark.org/0.29/) and [GitHub Flavored Markdown](https://github.github.com/gfm/)) at the `main` branch of your `https://github.com/<gh-username>/vc` repo using [codedoc](https://codedoc.cc/), and the resulting webpage served from the `gh-pages` branch of that repo at: `https://<gh-username>.github.io/vc/`. Refer to the [gh-pages](https://pages.github.com/) documentation for details.

1. Install [codedoc](https://codedoc.cc/):
   ```shell
   npm i -g @codedoc/cli
   ```
2. Fork and clone the [vc repo](https://github.com/alex22barreto/vc/) using the github web interface, or the [cli](https://cli.github.com/):
   ```shell
   gh repo clone alex22barreto/vc
   cd vc
   # --> Created fork will be <gh-username>/vc:
   gh repo fork #@see https://cli.github.com/manual/gh_repo_fork
   ```
   Note that the cloned repo already contains the [codedoc-p5-plugin](https://github.com/alex22barreto/vc/tree/main/.codedoc/components/p5) which is being developed separately [here](https://github.com/alex22barreto/codedoc-p5-plugin).
3. Install  `codedoc` dependencies (don't forget to `cd vc` if you haven't already):
   ```shell
   codedoc install
   ```
4. Edit your `<gh-username>` at the `github` section of the `.codedoc/config.ts` file, replacing `alex22barreto` with your `<gh-username>`.
   ```ts | config.ts
   export const config = configuration({
     // ..
     misc: {
       github: {
         user: 'gh-username', // --> name of the user on GitHub owning the repo
         // ..
       }
     },
     // ..
   });
   ```
5. Run locally with:
   ```shell
   codedoc serve
   ```
   *Note:* to also [run the p5.js sketches locally](https://codedoc.cc/docs/config/output#build-files-on-git) link `dist/docs/sketches` to the `sketches` folder.
   ```shell
   cd dist/docs/
   ln -s ../../docs/sketches
   ```
6. Deploy to github:
   ```shell
   git push #@see https://github.com/alex22barreto/vc/blob/main/.github/workflows/deploy-to-gh-pages.yml
   ```
   The page should soon be available at: `https://<gh-username>.github.io/vc/`

> :ToCPrevNext