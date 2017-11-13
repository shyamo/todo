/*Copyright 2017 - Shyam B*/
var counter = 0;
var setMarked = false;
var MainComponent = React.createClass({
  componentDidMount(){
    document.getElementById('ta').focus();
  },
  getInitialState() {
    return {
      data: [{
        id: 0,
        title: "Lorem Ipsum",
        dt: "2017/11/07",
        removeClass: "show",
        doneClass: "done"
      }]
    }
  },
  _handleKeyPress: function(e) {
    if (e.key === 'Enter') {
      this.addItem();
    }
  },
  removeItem : function(id) {
    var findIndex = this.state.data.map((item, i) => {
      if (id === item.id) {
        var self = this;
        var remove = item.removeClass;
        var object = item;
        object.removeClass ='removed';
        this.setState({
          removeClass: 'removed'
        });
        this.forceUpdate();
      }
    });
    this.forceUpdate();
  },
  addItem: function() {
    var txt = document.getElementById('ta').value;
    if (txt !== '') {
      counter++;
      var dt = new Date().toJSON().slice(0,10);
      this.state.data.push({id: counter,
        title: txt,
        dt: dt,
        removeClass: '',
        doneClass: ''
      });
      this.forceUpdate();
      var txtInput = document.getElementById('ta');
      txtInput.value = '';
      txtInput.focus();
    }
  },
  addRemoveDoneClass: function (addClass, removeClass, id, markedBool, eventType) {
    var elem = document.getElementById('item-' + id).querySelectorAll('.item-title .item-done .item-done-cta .fa')[0];
    if (!elem.classList.contains('marked')) {
      elem.classList.add(addClass);
      elem.classList.remove(removeClass);
    }

  },
  addRemoveMarked: function (id) {
    var rootElem = document.getElementById('item-' + id);
    var elem = document.getElementById('item-' + id).querySelectorAll('.item-title .item-done .item-done-cta .fa')[0];
    elem.classList.toggle('marked');
    if (elem.classList.contains('marked')) {
      elem.classList.add('fa-check-circle');
      elem.classList.remove('fa-circle-0');
      rootElem.classList.add('js-marked');
    } else {
      elem.classList.add('fa-circle-0');
      elem.classList.remove('fa-check-circle');
      rootElem.classList.remove('js-marked');
    }
  },
  setMarked: function (id) {
    this.addRemoveMarked(id);
  },
  hoverDone: function (id) {
    this.addRemoveDoneClass('fa-check-circle','fa-circle-o', id, '', 'hover');
  },
  hoverReset: function (id) {
    this.addRemoveDoneClass('fa-circle-o','fa-check-circle', id, '', 'hover');
  },
  render: function(){
    var self = this;
    var items = this.state.data.map(function (item, i) {
      return (
        <li className={"item " + item.removeClass} id={"item-" + item.id}>
          <span className="item-title">
            <span className="item-done">
              <a href="#" onMouseEnter={() => self.hoverDone(item.id)}
              onMouseLeave={() => self.hoverReset(item.id)}
              onClick={() => self.setMarked(item.id)}
              ontap={() => self.setMarked(item.id)}
              className="item-done-cta">
                <i className="fa fa-2x fa-circle-o" aria-hidden="true"></i>
              </a>
            </span>
            <span className="item-text">{item.title}</span>
          </span>
          <span className="item-remove">
            <a href="#"
            onClick={() => self.removeItem(item.id)}
            ontap={() => self.removeItem(item.id)}
            className="item-remove-cta">
              <i className="fa fa-2x fa-times" aria-hidden="true"></i>
            </a>
          </span>
        </li>
      )
    });
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="wrapper center">
              <h1>Todo list</h1>
              <div className="flex-wrapper">
                <div className="flex-text">
                  <input id="ta" type="text" value={this.state.value}
                  placeholder="I have to..."
                  onKeyPress={this._handleKeyPress}
                  className="input" />
                </div>
                <div className="flex-button">
                  <button id="addItem" className="add-item" onClick={this.addItem}><i className="fa fa-2x fa-plus" aria-hidden="true"></i></button>
                </div>
              </div>
              <ul className="todo">
              {items}
              </ul>
              <span className='foo'>&copy; Shyam B</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

React.render(<div>
    <MainComponent/>
  </div>, document.getElementById("root"));
