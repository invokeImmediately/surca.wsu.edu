/**********************************************************************************************************************
 CUSTOM JQUERY-BASED DYNAMIC CONTENT
 *********************************************************************************************************************/
(function ($) {
    "use strict";
	$(document).ready(function () {
			/**********************************************************************************************
			 * Tweak HTML source to work around some quirks of the WordPress setup                        *
			 **********************************************************************************************/
			var surcaSiteURL = window.location.pathname;
			switch(surcaSiteURL) {
				case '/news/':
					$('div.column.one').first().parent('section').before('<section class="row single gutter pad-top"><div class="column one"><section class="article-header header-newsEvents"><div class="header-content"><h2>News</h2><h3>What We and Our Students Have Accomplished</h3></div></section></div></section>');
					break;
			}
	});
})(jQuery);
