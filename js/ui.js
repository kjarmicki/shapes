;(function(win) {

	'use strict';

	var UI = function(params) {

		win.mixins.mix(this, win.mixins.pubsub);
		win.mixins.mix(this, win.mixins.html);

		this.htmlElement = win.document.createElement('div');
		this.htmlElement.className = params.htmlClassName;

		this.renderAll(params.fields);
		this.renderAll(params.buttons);

		
	};

	UI.prototype = {

		templates: {
			color: '<input type="color" name="%name" value="%value">',
			range: '<input type="range" name="%name" value="%value" min="%min" max="%max">',
			checkbox: '<input type="checkbox" name="%name" value="%value" checked>',
			label: '<label for="%name">%label</label>',
			button: '<button>%title</button>'
		},
	
		renderAll: function(items) {
			
			var i;

			for(i in items) {
				if(items.hasOwnProperty(i)) {
					this.htmlElement.appendChild(this.render(i, items[i]));
				}
			}
		},

		onChange: function() {
			this.trigger('change', this.getData());
		},

		getData: function() {
			
			var inputs = this.htmlElement.querySelectorAll('input'),
				data = {},
				i;

			for(i = 0; i < inputs.length; i++) {

				if(typeof data[inputs[i].name] === 'undefined' && inputs[i].type === 'checkbox') {
					data[inputs[i].name] = [];
				}
				
				if(inputs[i].type === 'checkbox') {
					if(!inputs[i].checked) {
						data[inputs[i].name].push('');	
					}
					else {
						data[inputs[i].name].push(inputs[i].value);	
					}
					
				}
				else {
					data[inputs[i].name] = inputs[i].value;
				}
			}

			return data;
				
		},

		render: function(name, data) {

			var container = win.document.createElement('div'),
				rendered,
				label,
				prop;

			if(this.templates.hasOwnProperty(data.type)) {
				container.className = 'clearfix ui-item ui-' + data.type;
				rendered = this.templates[data.type];
				for(prop in data) {
					if(data.hasOwnProperty(prop)) {
						rendered = rendered.replace('%' + prop, data[prop]);
					}
				}

				if(data.label) {
					label = this.templates.label;
					label = label.replace('%name', data.name);
					label = label.replace('%label', data.label);

					container.innerHTML += label;
				}

				container.innerHTML += rendered;
			}
			else {
				console.error('Unknown template: ' + data.type);
				return;
			}

			if(container.querySelector('input')) {
				container.querySelector('input').addEventListener('change', function(e) {
					this.onChange(e);
				}.bind(this));
			}

			if(data.click) {
				container.querySelector('button').addEventListener('click', data.click.bind(this));
			}

			return container;
				
		}
		
	};
	
	win.UI = UI;
	
}(this));
