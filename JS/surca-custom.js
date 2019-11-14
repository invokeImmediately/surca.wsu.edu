/*!*************************************************************************************************
 * surca-custom.js
 * -------------------------------------------------------------------------------------------------
 * SUMMARY: Custom JS code used specifically on the WSU SURCA website.
 *
 * AUTHOR: Daniel Rieck [daniel.rieck@wsu.edu] (https://github.com/invokeImmediately)
 *
 * REPOSITORY: https://github.com/invokeImmediately/WSU-UE---JS
 *
 * LICENSE: ISC - Copyright (c) 2019 Daniel C. Rieck.
 *
 *   Permission to use, copy, modify, and/or distribute this software for any purpose with or
 *   without fee is hereby granted, provided that the above copyright notice and this permission
 *   notice appear in all copies.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS" AND DANIEL RIECK DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS
 *   SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL
 *   DANIEL RIECK BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY
 *   DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF
 *   CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 *   PERFORMANCE OF THIS SOFTWARE.
 **************************************************************************************************/

( function ( $ ) {
    "use strict";

	$( function () {
		insertHeaderIntoNewsPages( '<section class="row single gutter pad-top"><div class="column o\
ne"><section class="article-header header-attending mw--80ch" style="padding-top: 0;"><div class="h\
eader-content"><h1 class="auto-fits-text data-min-fs-28 data-resize-against-article-header"><span c\
lass="title">News<span class="for-screen-readers">:</span></span> <span class="subtitle auto-fits-t\
ext data-min-fs-18 data-resize-against-article-header">What We and Our Students Have Accomplished</\
span></h1></div></section>' );
	} );

	function insertHeaderIntoNewsPages( htmlInserted ) {
		var relUrl = window.location.pathname;
		if ( relUrl == '/news/' ) {
			$('div.column.one').first().parent('section').before( htmlInserted );
		} else {
			var $body = $( 'body' ).first();
			if ( $body.hasClass( 'single-post' ) || $body.hasClass( 'archive' ) ) {
				$body.find( '.column.one' ).first().parent( '.row' ).before( htmlInserted );
			}			
		}
	}
} )( jQuery );
