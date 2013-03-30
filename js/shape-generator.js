;(function(win) {

	'use strict';
	
	var ShapeGenerator = function(params) {

		win.mixins.mix(this, win.mixins.html);
		win.mixins.mix(this, win.mixins.pubsub);
		win.mixins.mix(this, win.mixins.memoRandom);

		this.canvas = win.document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');

		this.ui = params.ui;
		this.ui.parent = this;

		this.htmlElement = win.document.createElement('div');
		this.htmlElement.className = params.htmlClassName;
		this.output = win.document.createElement('img');
		this.output.className = 'generator-output';
		this.htmlElement.appendChild(this.output);
		this.htmlElement.appendChild(this.ui.getHtml());

		this.ui.on('change', function(data) {
			this.generate(false, data);
		}.bind(this));
				
	};

	ShapeGenerator.prototype = {
		
		shape: function(refreshRandom) {
			
			var i,
				x,
				y,
				size,
				counter;

			this.refreshRandom = refreshRandom;

			this.canvas.width = this.options.width;	
			this.canvas.height = this.options.height;

			this.ctx.strokeStyle = this.options.strokeStyle;
			this.ctx.fillStyle = this.options.fillStyle;
			this.ctx.lineWidth = this.options.lineWidth;	
			this.ctx.lineJoin = 'round';

			counter = this.random('counter', function() { return Math.ceil(Math.random() * 4); });
			for(i  = 0; i < counter; i++) {
				this.part({
					type: this.options.shapes[this.random('type-' + i, function() { return Math.floor(Math.random() * this.options.shapes.length); }.bind(this))],
					x: this.options.width / 2,
					y: this.options.height / 2,
					width: this.random('width-' + i, function() { return Math.floor(Math.random() * this.options.height) / 2; }.bind(this)),
					height: this.random('height-' + i, function() { return Math.floor(Math.random() * this.options.width) / 2; }.bind(this)),
					useStroke: true // this.random('useStroke-' + i, function() { return !!(Math.floor(Math.random() * 5)); })
				});
			}

			return this.canvas.toDataURL();
		},

		part: function(options) {

			var x,
				y;
			
			this.ctx.beginPath();
			
			if(options.type === 'circle') {
				this.ctx.arc(options.x, options.y, options.width, 0, Math.PI*2, true);
			}
			else if(options.type === 'rectangle') {
				x = options.x - options.width / 2;
				y = options.y - options.height / 2;

				this.ctx.moveTo(x, y);
				this.ctx.lineTo(x, y + options.height);
				this.ctx.lineTo(x + options.width, y + options.height);
				this.ctx.lineTo(x + options.width, y);
				this.ctx.lineTo(x, y);
			}
			else {
				this.ctx.closePath();
				return;
			}

			if(options.useStroke) {
				this.ctx.stroke();
			}
			else {
				this.ctx.fill();
			}

		},

		generate: function(refreshRandom, data) {

			this.options = data || this.ui.getData();
			refreshRandom = !!refreshRandom;

			this.data = this.shape(refreshRandom);
			this.output.src = this.data;

			this.trigger('change');
		}

	};

	win.ShapeGenerator = ShapeGenerator;

}(this));
