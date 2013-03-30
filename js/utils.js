;(function(win) {

	'use strict';
	
	var utils = {
	
		extend: function() {
			
			var args = Array.prototype.slice.call(arguments),
				base = args.shift(),
				extend,
				prop,
				i;
			
			for(i = 0; i < args.length; i++) {
				
				extend = args[i];

				for(prop in extend) {
					if(extend.hasOwnProperty(prop)) {
						if(typeof extend[prop] === 'object' && !Array.isArray(extend[prop])) {

							if(base.hasOwnProperty(prop)) {
								base[prop] = utils.extend(base[prop], extend[prop]);
							}
							else {
								base[prop] = utils.extend({}, extend[prop]);
							}
						}
						else {
							try {
								base[prop] = extend[prop];
							}
							catch(e) { }
						}
					}
				}
			}
				
			return base;	
		}
		
	};

	win.utils = utils;

}(this));
