;(function(win) {

	'use strict';

	var i,
		generators = new win.ShapeGeneratorsCollection({
			domRoot: '.generators'
		}),
		composer = new win.ShapesComposer({
			domRoot: '.composition',
			generatorsCollection: generators,
			ui: new win.UI({
				htmlClassName: 'composition-ui box',
				buttons: {
					regenerate: {
						type: 'button',
						title: 'Regenerate',
						click: function(e) {
							console.log(this.parent.render(true));
						}
					}	
				}
			})
		}),
		count = 6;

	for(i = 0; i < count; i++) {
		
		generators.addItem(new win.ShapeGenerator({
			htmlClassName: 'generator box',
			ui: new win.UI({
				htmlClassName: 'generator-ui',
				buttons: {
					regenerate: {
						type: 'button',
						title: 'Regenerate',
						click: function(e) {
							this.parent.generate(true);
						}
					}
				},
				fields: {
					lineWidth: {
						type: 'range',
						name: 'lineWidth',
						label: 'Line Width',
						min: 0,
						max: 6,
						step: 1,
						value: 1
					},
					strokeStyle: {
						type: 'color',
						name: 'strokeStyle',
						label: 'Stroke Color',
						value: '#ccc'
					},
					/*
					fillStyle: {
						type: 'color',
						name: 'fillStyle',
						label: 'Fill Color',
						value: '#ccc'
					},
					*/
					width: {
						type: 'range',
						name: 'width',
						label: 'Width',
						min: 0,
						max: 200,
						step: 5,
						value: 100
					},
					height: {
						type: 'range',
						name: 'height',
						label: 'Height',
						min: 0,
						max: 200,
						step: 5,
						value: 100
					},
					cb_circle: {
						type: 'checkbox',
						name: 'shapes',
						label: 'Circles',
						value: 'circle'
					},
					cb_rectangle: {
						type: 'checkbox',
						name: 'shapes',
						label: 'Rectangles',
						value: 'rectangle'
					}		
				}
			})
		}));

	}

	generators.forEach(function(generator) {
		generator.generate(true);
	});

	/*
	win.document.querySelector('.regenerate-all').addEventListener('click', function() {
		generators.forEach(function(generator) {
			generator.generate(true);
		});
	}, false);
	*/

}(this));
