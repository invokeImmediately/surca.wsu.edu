/*!*************************************************************************************************
 * ▄▀▀▀ █  █ █▀▀▄ ▄▀▀▀ ▄▀▀▄    ▄▀▀▀ █  █ ▄▀▀▀▐▀█▀▌▄▀▀▄ ▐▀▄▀▌      █ ▄▀▀▀
 * ▀▀▀█ █  █ █▄▄▀ █    █▄▄█ ▀▀ █    █  █ ▀▀▀█  █  █  █ █ ▀ ▌   ▄  █ ▀▀▀█
 * ▀▀▀   ▀▀  ▀  ▀▄ ▀▀▀ █  ▀     ▀▀▀  ▀▀  ▀▀▀   █   ▀▀  █   ▀ ▀ ▀▄▄█ ▀▀▀ 
 * -------------------------------------------------------------------------------------------------
 * Custom JS code specfically written for use on the WSU SURCA website. The code is meant to be
 *   applied to the site via the Custom JavaScript Editor page in the WordPress dashboard.
 *
 * @author Daniel Rieck [daniel.rieck@wsu.edu] (https://github.com/invokeImmediately)
 * @link https://github.com/invokeImmediately/surca.wsu.edu/blob/master/JS/surca-custom.js
 * @license MIT - Copyright (c) 2020 Washington State University
 *   Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 *     and associated documentation files (the “Software”), to deal in the Software without
 *     restriction, including without limitation the rights to use, copy, modify, merge, publish,
 *     distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom
 *     the Software is furnished to do so, subject to the following conditions:
 *   The above copyright notice and this permission notice shall be included in all copies or
 *     substantial portions of the Software.
 *   THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 *     BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 *     NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 *     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 **************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////
// TABLE OF CONTENTS
// -----------------
//   §1: Function declarations................................................................37
//   §2: Main execution section...............................................................81
////////////////////////////////////////////////////////////////////////////////////////////////////

( function ( $ ) {
    "use strict";

////////////////////////////////////////////////////////////////////////////////////////////////////
// §1: Function Declarations

function addPageHeaderOnCalendarPages( params ) {
	let headerMarkup = params.htmlCalendarHeader;
	addCalendarHeaderViaClassUtilization( headerMarkup );
}

/**
 * Add page headers to news pages.
 *
 * @param {String} htmlNewsHeader - The HTML comprising the page header to be added to the DOM.
 */
function addPageHeaderOnNewsPages( params ) {
	var headerMarkup = params.htmlNewsHeader;
	addNewsHeaderViaLocation( headerMarkup );
	addNewsHeaderViaClassUtilization( headerMarkup );
}

/**
 * Inspect the body tag to add a header to news pages when certain classes are in use.
 *
 * @param {String} markup - The HTML comprising the page header to be added to the DOM.
 */
function addNewsHeaderViaClassUtilization( markup ) {
	let $body = $( 'body' ).first();
	if ( $body.hasClass( 'single-post' ) || ( $body.hasClass( 'archive' ) &&
			( $body.hasClass( 'category' ) ||  $body.hasClass( 'tag' ) ) ) ) {
		$body.find( '.column.one' ).first().parent( '.row' ).before( markup );
	}
}

/**
 * Use the browser's location to add a header to news pages, which lack them by default.
 *
 * @param {String} markup - The HTML comprising the page header to be added to the DOM.
 */
function addNewsHeaderViaLocation( markup ) {
	var siteURL = window.location.pathname;
	if ( siteURL == '/news/' ) {
		$( '.column.one' ).first().parent( '.row' ).before( markup );
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// §2: Main execution section

$( function () {
	addPageHeaderOnNewsPages( {
		htmlNewsHeader: '<section class="row single gutter pad-top">\n' +
			'\t<div class="column one">' +
			'\t\t<section class="article-header header-attending mw--80ch" style="padding-top: 0;">' +
			'\t\t\t<div class="header-content">\n' +
			'\t\t\t\t<h1 class="auto-fits-text data-min-fs-28 data-resize-against-article-header">' +
			'<span class="title">News<span class="for-screen-readers">:</span></span> ' +
			'<span class="subtitle auto-fits-text data-min-fs-18 data-resize-against-article-header">' +
			'What We and Our Students Have Accomplished</span></h1>\n' +
			'\t\t\t</div>\n' +
			'\t\t</section>\n' +
			'\t</div>\n' +
			'</section>'
	} );
} );

} )( jQuery );
