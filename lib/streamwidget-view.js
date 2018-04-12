'use babel';
const interact = require('interactjs');

export default class StreamwidgetView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('streamwidget');

    //Instructions
    var instructions = document.createElement('div');
    instructions.innerHTML = 'Donate: BTC:33ErtQLxBnn5RNigfmduDt1m5XX4zhi54j'
    instructions.classList.add('instructions');
    this.element.appendChild(instructions);

    //framedrag is the div for the iframe that is going to be dragged
    var framedrag = document.createElement('div');
    framedrag.classList.add('draggableborder')
    framedrag.classList.add('frame-drag')

    var frame = document.createElement('iframe');
    frame.src = "http://player.twitch.tv/?channel=ninja&muted=true";
    frame.classList.add('frame');
    framedrag.appendChild(frame);

    interact('.frame-drag')
      .draggable({
        // enable inertial throwing

        // keep the element within the area of it's parent
        restrict: {

          endOnly: true,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        // enable autoScroll
        autoScroll: true,

        // call this function on every dragmove event
        onmove: this.dragMoveListener,

      });

    frame.classList.add('resize')
    this.element.appendChild(framedrag)

    interact('.resize')
      .resizable({
        // resize from all edges and corners
        edges: {
          left: false,
          right: true,
          bottom: true,
          top: false
        },

        // minimum size
        restrictSize: {
          min: {
            width: 100,
            height: 50
          },
        },

        inertia: true,
      })
      .on('resizemove', function(event) {
        var target = event.target,
          x = (parseFloat(target.getAttribute('data-x')) || 0),
          y = (parseFloat(target.getAttribute('data-y')) || 0);

        // update the element's style
        target.style.width = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.webkitTransform = target.style.transform =
          'translate(' + x + 'px,' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
        target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);
      });

  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  dragMoveListener =  (event) => {
    var target = event.target,
    // keep the dragged position in the data-x/data-y attributes
    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  //DO NOT TOUCH  BRACKET
}
