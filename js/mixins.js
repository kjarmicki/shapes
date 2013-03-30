;(function(win) {
	
	'use strict';

	var mixins = {

		mix: function(base) {
		
			var mixins = Array.prototype.slice.call(arguments),
				i,
				prop;

			mixins.shift();

			for(i = 0; i < mixins.length; i++) {
				for(prop in mixins[i]) {
					if(mixins[i].hasOwnProperty(prop)) {
						if(typeof mixins[i][prop] === 'object' && !Array.isArray(mixins[i][prop])) {
							base[prop] = win.utils.extend({}, mixins[i][prop]);	
						}
						else if(Array.isArray(mixins[i][prop])) {
							base[prop] = win.utils.extend([], mixins[i][prop]);
						}
						else {
							base[prop] = mixins[i][prop];		
						}
					}	
				}
			}
			
		},

		html: {
			
			htmlElement: null,

			getHtml: function() {
				return this.htmlElement;	
			}
				
		},

		memoRandom: {
			
			refreshRandom: true,

			randomStorage: {},

			random: function(type, randFunc) {
		
				if(this.refreshRandom || typeof this.randomStorage[type] === 'undefined') {
					this.randomStorage[type] = randFunc();
				}

				return this.randomStorage[type];
			
			}
		},

		throttle: {
			
			throttleFunctions: [],

			throttle: function(func, delay) {
				if(this.throttleFunctions.indexOf(func) === -1) {
					this.throttleFunctions.push(func);
					setTimeout(function() {
						func();
						this._deleteThrottle(func);
					}.bind(this), delay);
				}
			},

			_deleteThrottle: function(func) {
				this.throttleFunctions = this.throttleFunctions.filter(function(remembered) {
					if(func === remembered) {
						return false;	
					}

					return true;
				});
			}

				
		},
	
		pubsub: {

			handlers: {},

			on: function(name, handler) {
				
				if(!Array.isArray(this.handlers[name])) {
					this.handlers[name] = [];	
				}

				this.handlers[name].push(handler);
						
			},

			off: function(name, handler) {

				var i;

				if(Array.isArray(this.handlers[name])) {
					for(i = 0; i < this.handlers[name].length; i++) {
						if(this.handlers[name][i] === handler) {
							this.handlers[name].splice(i, 1);
						}
					}
				}
				
			},

			trigger: function(name, data) {
				
				var i;

				if(Array.isArray(this.handlers[name])) {
					for(i = 0; i < this.handlers[name].length; i++)	{
						this.handlers[name][i](data);
					}
				}
			}
		}
		
	};

	win.mixins = mixins;

}(this));
