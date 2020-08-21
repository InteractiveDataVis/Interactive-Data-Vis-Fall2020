# Tutorial 1

This introductory tutorial will focus primarily on helping you get your environment set up for future code development. We will also walk through an example to (a) load in a new dataset and (b) render a simple HTML table to the browser.

The goals for this tutorial are:

- to continue to get comfortable with the [Github workflow](../tutorial0_serve/2_GIT_SETUP.md), and with using their [local development environment](../tutorial0_serve/3_BASIC_SERVER.md).
- to understand how to load in a dataset using [d3-fetch](https://github.com/d3/d3-fetch) (d3.json, d3.csv, etc.).
- to introduce [d3-selections](https://bost.ocks.org/mike/selection/) and [d3 data binding](https://observablehq.com/@d3/selection-join).
- to give the tools to create a simple [HTML table](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table).

### Setup + Serve:

Start with our setup flow -- this includes the [git setup](../tutorial0_serve/2_GIT_SETUP.md) (forking, cloning, setting upstream, etc.) and getting a [basic server](../tutorial0_serve/3_BASIC_SERVER.md) up and running.

Once your local serve is up and reacting to code changes, you're ready to begin working on your tutorial assignment.
As you're building, don't forget you can always reference the [class code branch](https://github.com/InteractiveDataVis/Interactive-Data-Vis-Fall2020/tree/class/tutorial0_serve) or the [demo code branch](https://github.com/InteractiveDataVis/Interactive-Data-Vis-Fall2020/tree/demo/tutorial0_serve) for additional context. 

### Deploy

Once you've completed the assignment, use the Github workflow to deploy your work to **your fork** of the course repository. Post the link to your deployed example as a comment to the appropriate post on the Commons. (Note: your link will look something like: `https://[YOUR_USERNAME].github.io/Interactive-Data-Vis-Fall2020/[TUTORIAL_PATH]/`)

To receive full credit, you must post your stable path before the start of the next class.

## Week 1 Assignment:

- [ ] Replicate the process for **your own dataset**. This will involve finding/creating a suitable dataset, saving it somewhere in your repository, and writing the code. You should leverage the files present in the root of this directory (`tutorial1_intro/` [index.html](index.html), [style.css](style.css), [main.js](main.js))
- [ ] Update the table's conditional formatting to highlight something meaningful for your new dataset. This may include changing the logic for the cell's [class](https://github.com/d3/d3-selection#selection_classed), adding another [attribute](https://github.com/d3/d3-selection#selection_attr), or directly augmenting the cell's [style](https://github.com/d3/d3-selection#selection_style).

**BONUS:**

- [ ] Add logic to update the appearance of an _entire row_ (not just a single cell).
- [ ] Add a summary row for totals/averages of your data.

## Required Reading: 

- [ ] [Interneting Is Hard: Introduction, Basic Web Pages, Links and Images](https://www.internetingishard.com/html-and-css/) 
- [ ] [Javascript.info: Getting Started](https://javascript.info/getting-started)
- [ ] [Javascript.info: Debugging Chrome](https://javascript.info/debugging-chrome)
- [ ] [D3: Data-Driven Documents](http://vis.stanford.edu/files/2011-D3-InfoVis.pdf)

## Other Resources:

- [Javascript Fundamentals](https://javascript.info/first-steps)
- [Javascript Object Basics](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics) (We recommend that you get comfortable with everyhing up to the 'What is "this"?' section)
- [How to use github](https://git-scm.com/book/en/v2)
- [Guide to CSS Selectors](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors)
