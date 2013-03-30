;(function(win) {
	
	'use strict';

	var ShapeGeneratorsCollection = function(params) {

		win.mixins.mix(this, win.mixins.pubsub);
		
		this.domRoot = win.document.querySelector(params.domRoot);
		this.generators = [];
		
	};

	ShapeGeneratorsCollection.prototype = {
	
		addItem: function(generator, construct) {

			if(this.generators.indexOf(generator) === -1) {
				this.generators.push(generator);

				this.domRoot.appendChild(generator.getHtml());

				generator.on('change', function() {
					this.trigger('change');
				}.bind(this));
			}
						
		},

		forEach: function(callback) {
				
			return this.generators.forEach(callback);

		}

	};

	win.ShapeGeneratorsCollection = ShapeGeneratorsCollection;

}(this));
