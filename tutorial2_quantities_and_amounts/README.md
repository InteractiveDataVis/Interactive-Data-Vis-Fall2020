# Tutorial 2

The goals for this tutorial are:

- to continue to get comfortable with the [Github workflow](../tutorial0_serve/2_GIT_SETUP.md), and with using their [local development environment](../tutorial0_serve/3_BASIC_SERVER.md).
- to introduce [HTML svg](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg) coordinate system. 
- to learn how [d3-scales](https://github.com/d3/d3-scale) can map abstract data elements to visual variables.
- to add axes to an svg using [d3-axis](https://github.com/d3/d3-axis).
- to learn the tools to make your own bar chart.

## How to setup, serve, and deploy:

From tutorial 0, you should have all the correct [installations](../tutorial0_serve/1_INSTALL.md), and have set up your [git flow](../tutorial0_serve/2_GIT_SETUP.md) (forking, cloning, setting upstream, etc.). To get started, get a [local serve](../tutorial0_serve/3_BASIC_SERVER.md) ready.

Once your local serve is up and reacting to code changes, you're ready to begin working on your tutorial assignment.
As you're building, don't forget you can always reference the [class code branch](https://github.com/InteractiveDataVis/Interactive-Data-Vis-Fall2020/tree/class/) or the [demo code branch](https://github.com/InteractiveDataVis/Interactive-Data-Vis-Fall2020/tree/demo/) for additional context. 

## Week 2 Assignment:

- [ ] Implement your own version of the vertical bar chart we did in class using the files present in the root of this directory (`tutorial1_intro/` [index.html](index.html), [style.css](style.css), [main.js](main.js)), just like we did in Tutorial 1. You may use the existing dataset, or a new one.

- [ ] Turn this **vertical bar chart** into a **horizontal bar chart**. This will require adjusting both scales to consider how the data should map back to the svg coordinate plane. (_Tip_: start by getting your bars to show, even if they are not yet positioned/sized correctly -- sometimes it is easier to understand where something should go by seeing where it currently is).

- [ ] Post your [deployed](#Deploy) link to the Tutorial 2 post on the Commons.

**BONUS:**

- [ ] Add a [color scale](https://github.com/d3/d3-scale-chromatic) to your bar chart. This is another type of scale where your range is going to be color values instead of screen dimensions. Feel free to use `ordinal` or `sequential` colorscales (this will depend on what type of field you want to map to color).

### Deploy

Once you've completed the assignment, use the Github workflow to deploy your work to **your fork** of the course repository. Post the link to your deployed example as a comment to the appropriate post on the Commons. (Note: your link will look something like: `https://[YOUR_USERNAME].github.io/Interactive-Data-Vis-Fall2020/[TUTORIAL_PATH]/`)

To receive full credit, you must post your stable path before the start of the next class.

## Resources:

[Javascript Fundamentals](https://javascript.info/first-steps)

[Javascript Object Basics](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics) (We recommend that you get comfortable with everything up to the 'What is "this"?' section)

[How to use github](https://git-scm.com/book/en/v2)

[Guide to CSS Selectors](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors)

[d3 scales](https://github.com/d3/d3-scale)
