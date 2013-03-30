;(function(win) {

	'use strict';

	var ShapesComposer = function(params) {

		var render = this.render.bind(this, false);

		win.mixins.mix(this, win.mixins.pubsub);
		win.mixins.mix(this, win.mixins.memoRandom);
		win.mixins.mix(this, win.mixins.throttle);
	
		this.domRoot = win.document.querySelector(params.domRoot);
		this.output = win.document.createElement('div');
		this.output.className = 'composer-output';
		this.collection = params.generatorsCollection;
		this.ui = params.ui;
		this.ui.parent = this;
		this.domRoot.appendChild(this.output);
		this.domRoot.appendChild(this.ui.getHtml());

		this.collection.on('change', function() {
			this.throttle(render, 50);
		}.bind(this));
	};

	ShapesComposer.prototype = { 
		
		render: function(refreshRandom) {
			
			var data = [],
				parts = [],
				part,
				img,
				i,
				j;
			
			this.collection.forEach(function(generator) {
				data.push(generator.data);
			});

			this.output.innerHTML = '';
			this.refreshRandom = refreshRandom;
			
			
			part = win.document.createElement('div');
			part.className = 'composition-part';
			
			for(i = 0; i < data.length; i++) {
				img = win.document.createElement('img');
				img.src = data[i];
				img.style.top = this.random('img-' + i + '-top', 
					function() {
						var bounds = [40, 60]; 
						return bounds[Math.floor(Math.random() * bounds.length)]; 
				}) + 'px';
				img.style.left = this.random('img-' + i + '-left',
					function() {
						var bounds = [40, 60, 80];
						return bounds[Math.floor(Math.random() * bounds.length)];
				}) + 'px';
				part.appendChild(img);
			}

			for(i = 0; i < 4; i++) {
				this.output.appendChild(part.cloneNode(true));	
			}

		}
			
	};

	win.ShapesComposer = ShapesComposer;
	
}(this));
