/**
	joView
	=======
	
	Base class for all other views, containers, controls and other visual doo-dads.
	
	Use
	-----
	
		var x = new joView(data);
	
	Where `data` is either a text or HTML string, an HTMLElement, or any joView object
	or subclass.
		
	Methods
	-------
	
	- `setData(data)`
	- `getData()`
	- `createContainer(type, classname)`
	- `setContainer(element)`
	- `getContainer()`
	- `clear()`
	- `refresh()`
	
*/
joView = function(data) {
//	joLog("new view", this.tagName);
	
	this.changeEvent = new joSubject(this);

	this.setContainer();

	if (data)
		this.setData(data);
};
joView.prototype = {
	tagName: "joview",
	busyNode: null,
	container: null,
	data: null,
	
	getContainer: function() {
		return this.container;
	},

	setContainer: function(container) {
		this.container = joDOM.get(container);
			
		if (!this.container)
			this.container = this.createContainer();
		
		this.setEvents();
		
		return this;
	},
	
	createContainer: function() {
		return joDOM.create(this);
	},

	clear: function() {
		this.data = "";
		
		if (this.container)
			this.container.innerHTML = "";

		this.changeEvent.fire();
	},

	setData: function(data) {
		this.data = data;
		this.refresh();
		
		return this;
	},

	getData: function() {
		return this.data;
	},

	refresh: function() {
		if (!this.container || typeof this.data == "undefined")
			return 0;

		this.container.innerHTML = "";
		this.draw();
		this.setBusy(false);

		this.changeEvent.fire(this.data);
	},

	draw: function() {
		this.container.innerHTML = this.data;
	},
	
	setStyle: function(style) {
		joDOM.setStyle(this.container, style);
		
		return this;
	},
	
	setBusy: function(state, msg) {
		if (state) {
			if (!this.busyNode) {
				this.busyNode = new joBusy(msg);
			}
			this.container.appendChild(this.busyNode.container);
		}
		else {
			if (this.busyNode) {
				try {
					this.container.removeChild(this.busyNode.container);
				}
				catch(e) {
				}
			}
		}
	},
	
	setEvents: function() {}
};
