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
    var t = document.createElement('div');
    t.innerHTML = `hello`;




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
  },

  serialize() {
    return {
      streamwidgetViewState: this.streamwidgetView.serialize()
    };
  },

  toggle() {
    console.log('Streamwidget was toggled!');
    var t = document.createElement('div');

    this.statusBarTile = this.statusBar.addLeftTile({
      item: t,
      priority: -1
    });

  },


  consumeStatusBar: function(statusBar) {
    return this.statusBar = statusBar;
  },


};
