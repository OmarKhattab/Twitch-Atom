'use babel';
var main = require("./main.js");
const interact = require('interactjs');

export default class StreamwidgetView {

  constructor(serializedState) {
    var lop = document.createElement('div');
    lop.innerHTML = 'lop lop lop lo pl o pl o p l op l o p lo p l op'

    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('streamwidget');


    // INPUT FIELD
    var url = document.createElement('input');
    url.setAttribute('id', 'channel');
    url.setAttribute('class', 'native-key-bindings');
    url.setAttribute('placeholder', 'streamer name');


    //Search Button
    var SearchButton = document.createElement('button');
    SearchButton.innerHTML = "load stream";
    changeChannel = () => {
      frame.src = `http://player.twitch.tv/?channel=${url.value}`
      chatframe.src = `http://www.twitch.tv/embed/${url.value}/chat`
      url.value = '';
    }
    SearchButton.addEventListener('click', changeChannel)


    //Instructions
    var instructions = document.createElement('div');
    instructions.innerHTML = 'Drag the purple circle to move the video, enlarge the player by dragging right left or bottom edges, search for streamer and press load stream to view a new stream, hide chat and stream with the buttons.'
    instructions.classList.add('instructions');
    this.element.appendChild(instructions);

<<<<<<< HEAD
    // Input and Button container
    SearchContainer = document.createElement('div');
    SearchContainer.appendChild(url);
    SearchContainer.appendChild(SearchButton);
    SearchContainer.classList.add('SearchContainer');

    // HIDE ELEMENTS CODE
    var HideButtonsContainer = document.createElement('div');

    // Hide stream
    var HideStreamButton = document.createElement('button');
    HideStreamButton.innerHTML = "Hide Stream";
    hideStream = () => {
      if (framedrag.style.display === "none") {
        framedrag.style.display = "block";
        HideStreamButton.innerHTML = "Hide Stream";
      } else {
        framedrag.style.display = "none";
        HideStreamButton.innerHTML = "View Stream";
      }
    }
    HideStreamButton.addEventListener('click', hideStream)


    //HideButtonsContainer.appendChild(HideChatButton);
    HideButtonsContainer.appendChild(HideStreamButton);
    HideButtonsContainer.classList.add('HideButtonsContainer');


    //framedrag is the div for the iframe that is going to be dragged


    var framedrag = document.createElement('div');
    framedrag.classList.add('draggableborder')
    framedrag.classList.add('frame-drag')

=======
    //interactvideodrag is the video with draggable blue icon
    var interactvideodrag = document.createElement('div');
    //interactvideodrag.setAttribute('id','twitchFrame');
>>>>>>> b3f15079f3cb7553cddffc3a5f78d10727ada5cd

    var frame = document.createElement('iframe');
    frame.src = "http://player.twitch.tv/?channel=ninja&muted=false";
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
    this.element.appendChild(SearchContainer);
    this.element.appendChild(HideButtonsContainer)


    interact('.resize')
      .resizable({
        // resize from all edges and corners
        edges: {
          left: true,
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
