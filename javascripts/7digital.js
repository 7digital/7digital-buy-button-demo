
/* 

Custom JavaScript for the 7digital Bootstrapper
By Leighton Crane
(c) 7digital 2012.

*/

(function ($) {

	/* "use strict"; */
	
	var cache,
		config,
		modelObject;

/* ------------------------------------------------------------------------ 
 *	Config Object
 * ------------------------------------------------------------------------
 */

	config = {};

/* ------------------------------------------------------------------------ 
 *	Cache Object
 * ------------------------------------------------------------------------
 */
	
	cache = {
		
		domSelections : {},
		setup : function() {}		
		
	};
	
/* ------------------------------------------------------------------------ 
 *	Model Object
 * ------------------------------------------------------------------------
 */
	
	modelObject = {
		
		methodToDoStuff : function() {
			
			// Do some stuff

		},
		
		bindEventMethods : function() {

			// Do some stuff
			
		},
		
		setup : function() {
			
			this.bindEventMethods();
			// Do some other stuff
			
		}		
	};

/* ------------------------------------------------------------------------ 
 *	Ready Event
 * ------------------------------------------------------------------------
 */

	$(document).ready(function() {

		cache.setup();
		modelObject.setup();
							  
	});

}(jQuery));