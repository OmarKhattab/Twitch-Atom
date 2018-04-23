'use babel';

import StreamwidgetView from './streamwidget-view';
import {
  CompositeDisposable
} from 'atom';



export default {

  streamwidgetView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.streamwidgetView = new StreamwidgetView(state.streamwidgetViewState);
    d = document.createElement('div')
    d.classList.add('myElementClass')
    d.appendChild(this.streamwidgetView.getElement())
    document.body.appendChild(d)

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable(

    );

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'streamwidget:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.streamwidgetView.destroy();
    this.statusBar.destroy();
  },

  toggle() {
    console.log('Streamwidget was toggled!');
  },

  destroy() {
    this.element.remove();
    this.subscriptions.dispose();
    this.statusBarTile.dispose();
    this.streamwidget.destroy();
  },


/*  consumeStatusBar: function(statusBar) {
    return this.statusBar = statusBar;
  }, */

   consumeStatusBar: function(statusBar) {
     //url input
     var url = document.createElement('input');
     url.setAttribute('id', 'channel');
     url.setAttribute('class', 'native-key-bindings');
     url.setAttribute('placeholder', 'streamer name');
     var muted = true;
     var tempurl;
     //Search Button
     var SearchButton = document.createElement('button');
     SearchButton.innerHTML = "load stream";
     var frame = document.getElementsByClassName('frame')
     changeChannel = () => {

       frame[0].src = `http://player.twitch.tv/?channel=${url.value}&muted=${muted}`
      // chatframe.src = `http://www.twitch.tv/embed/${url.value}/chat`
       tempurl = url.value
       url.value = '';
     }
     SearchButton.addEventListener('click', changeChannel)

      // Hide stream
      var HideStreamButton = document.createElement('button');
      HideStreamButton.innerHTML = "Hide Stream";
      hideStream = () => {
        if (document.getElementsByClassName('frame-drag')[0].style.display === "none") {
          document.getElementsByClassName('frame-drag')[0].style.display = "block";
          HideStreamButton.innerHTML = "Hide Stream";
        } else {
          document.getElementsByClassName('frame-drag')[0].style.display = "none";
          HideStreamButton.innerHTML = "View Stream";
          muted = true;
          frame[0].src = `http://player.twitch.tv/?channel=${tempurl}&muted=${muted}`
        }
      }
      HideStreamButton.addEventListener('click', hideStream)

     //container
     var Container = document.createElement('div');
     Container.appendChild(url);
     Container.appendChild(SearchButton);
     Container.appendChild(HideStreamButton);
     Container.classList.add('SearchContainer');

    return this.statusBarTile = statusBar.addRightTile({
      item: Container,
      priority: -20
    });
  }


};
