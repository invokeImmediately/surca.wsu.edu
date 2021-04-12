/*!*************************************************************************************************
 * ▄▀▀▀ █  █ █▀▀▄ ▄▀▀▀ ▄▀▀▄    ▄▀▀▀ █  █ ▄▀▀▀▐▀█▀▌▄▀▀▄ ▐▀▄▀▌      █ ▄▀▀▀
 * ▀▀▀█ █  █ █▄▄▀ █    █▄▄█ ▀▀ █    █  █ ▀▀▀█  █  █  █ █ ▀ ▌   ▄  █ ▀▀▀█
 * ▀▀▀   ▀▀  ▀  ▀▄ ▀▀▀ █  ▀     ▀▀▀  ▀▀  ▀▀▀   █   ▀▀  █   ▀ ▀ ▀▄▄█ ▀▀▀ 
 *
 * @version 1.1.0
 *
 * Custom JS code specfically written for use on the WSU SURCA website. The code is meant to be
 *   applied to the site via the Custom JavaScript Editor page in the WordPress dashboard.
 *
 * @author Daniel Rieck [daniel.rieck@wsu.edu] (https://github.com/invokeImmediately)
 * @link https://github.com/invokeImmediately/surca.wsu.edu/blob/master/JS/surca-custom.js
 * @license MIT - Copyright (c) 2021 Washington State University
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
//   §1: Class Declarations...................................................................48
//     §1.1: ProjectFinder....................................................................52
//   §2: Function Declarations...............................................................107
//     §2.1: addCalendarHeaderViaClassUtilization............................................110
//     §2.2: addNewsHeaderViaClassUtilization................................................127
//     §2.3: addNewsHeaderViaLocation........................................................143
//     §2.4: addPageHeaderOnCalendarPages....................................................158
//     §2.5: addPageHeaderOnNewsPages........................................................171
//     §2.6: setUpProjectFinder..............................................................185
//   §3: Execution Entry Point...............................................................199
//     §3.1: Document loaded event binding...................................................202
////////////////////////////////////////////////////////////////////////////////////////////////////

( function ( $ ) {
    "use strict";

////////////////////////////////////////////////////////////////////////////////////////////////////
// §1: Class Declarations


//////////////////////////////////////////////////////////////////////////////////////////////////
//// §1.1: ProjectFinder

class ProjectFinder {
	// TODO: Implement the actions below through an object-oriented approach.
	// Check for the project finder interface.
	// If found, add the modal cover element to the page.
	// Set up the dynamic behaviors of the project viewing buttons.

	constructor( params ) {
		this.selIntf = params.selIntf;
		this.modalTrigger = params.modalTrigger;
		this.abstTrigger = params.abstTrigger;
		this.checkForIntf();
	}

	checkForIntf() {
		this.$abstIntf = $( this.selIntf );
		const proceed = this.$abstIntf.length === 1;
		if ( proceed ) {
			this.initialize();
		}
	}

	initialize() {
		// First, obtain a copy of a reference to the instance that will preserve lexical context in
		//   handlers and callbacks.
		const inst = this;

		// Find the column that contains the project finder.
		this.$intfCol = this.$abstIntf.parents( '.column.one' );

		// Create a cover that will be shown when abstract cards are viewed by the user and thus need to
		//   behave like a modal.
		this.$modalCover = $( '<div class="modal-cover"></div>' );
		this.$modalCover.prependTo( this.$intfCol );
		this.$modalCover.on( 'click', function( e ) {
			const $openAbst = $( '.abst-intf .expanded' );
			$openAbst.toggleClass( inst.abstTrigger );
			inst.$modalCover.toggleClass( inst.modalTrigger );
		} );

		// Find all of the title buttons for the project.
		this.$titleBtns = this.$abstIntf.find( '.project-title' );

		// Attach event handlers to the title buttons so the abstract can be viewed.
		this.$abstIntf.on( 'click', '.project-title', function( e ) {
			const $btn = $( this );
			const $abst = $btn.parent().parent();
			$abst.toggleClass( inst.abstTrigger );
			inst.$modalCover.toggleClass( inst.modalTrigger );
		} );
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// §2: Function Declarations

//////////////////////////////////////////////////////////////////////////////////////////////////
//// §2.1: addCalendarHeaderViaClassUtilization

/**
 * Inspect the body tag to add a header to news pages when certain classes are in use.
 *
 * @param {String} markup - The HTML comprising the page header to be added to the DOM.
 */
function addCalendarHeaderViaClassUtilization( markup ) {
	let $body = $( 'body' ).first();
	if ( $body.hasClass( 'single-tribe_events' ) ||
			$body.hasClass( 'post-type-archive-tribe_events' ) ||
			$body.hasClass( 'tribe_venue-template-default' ) ) {
		$body.find( '.column.one' ).first().parent( '.row' ).before( markup );
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////
//// §2.2: addNewsHeaderViaClassUtilization

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

//////////////////////////////////////////////////////////////////////////////////////////////////
//// §2.3: addNewsHeaderViaLocation

/**
 * Use the browser's location to add a header to news pages, which lack them by default.
 *
 * @param {String} markup - The HTML comprising the page header to be added to the DOM.
 */
function addNewsHeaderViaLocation( markup ) {
	let siteURL = window.location.pathname;
	if ( siteURL == '/news/' ) {
		$( '.column.one' ).first().parent( '.row' ).before( markup );
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////
//// §2.4: addPageHeaderOnCalendarPages

/**
 * Add page headers to calendar pages.
 *
 * @param {String} htmlNewsHeader - The HTML comprising the page header to be added to the DOM.
 */
function addPageHeaderOnCalendarPages( params ) {
	let headerMarkup = params.htmlCalendarHeader;
	addCalendarHeaderViaClassUtilization( headerMarkup );
}

//////////////////////////////////////////////////////////////////////////////////////////////////
//// §2.5: addPageHeaderOnNewsPages

/**
 * Add page headers to news pages.
 *
 * @param {String} htmlNewsHeader - The HTML comprising the page header to be added to the DOM.
 */
function addPageHeaderOnNewsPages( params ) {
	let headerMarkup = params.htmlNewsHeader;
	addNewsHeaderViaLocation( headerMarkup );
	addNewsHeaderViaClassUtilization( headerMarkup );
}

//////////////////////////////////////////////////////////////////////////////////////////////////
//// §2.6: setUpProjectFinder

/**
 * Look for and set up the project finder interface on SURCA website pages as needed.
 *
 * @param {object} params - Simple object contained arguments for the function.
 * @param {string} params.selIntf - A selector string that can be used by jQuery to fetch the
 *   element representing the container of the project finder.
 */
function setUpProjectFinder( params ) {
	const projFinder = new ProjectFinder( params );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// §3: Execution Entry Point

//////////////////////////////////////////////////////////////////////////////////////////////////
//// §3.1: Document loaded event binding

$( function () {

	// Add page headers to SURCA web pages in the calendar section of the website, which are missing
	//   by default and cannot be manually added by content creators.
	addPageHeaderOnCalendarPages( {
		htmlCalendarHeader: '<section id="calendar-page-header" class="row single article-header' +
				' article-header--colored h--192px">\n' +
			'\t<div class="column one gray-darker-back">\n' +
			'\t\t<div class="gray-er-text wrapper">\n' +
			'\t\t\t<ol class="breadcrumb-list">\n' +
			'\t\t\t\t<li class="breadcrumb-list__breadcrumb"><a class="breadcrumb-list__link"' +
				' href="/">SURCA Home</a></li>\n' +
			'\t\t\t</ol>\n' +
			'\t\t	<h1 class="tt--uppercase">Calendar</h1>\n' +
			'\t</div>\n' +
			'</section>'
	} );

	// Add page headers to SURCA web pages in the news section of the website, which are missing by
	//   default and cannot be manually added by content creators.
	addPageHeaderOnNewsPages( {
		htmlNewsHeader: '<section id="news-page-header" class="row single article-header' +
				' article-header--colored h--192px">\n' +
			'\t<div class="column one gray-darker-back">\n' +
			'\t\t<div class="gray-er-text wrapper">\n' +
			'\t\t\t<ol class="breadcrumb-list">\n' +
			'\t\t\t\t<li class="breadcrumb-list__breadcrumb"><a class="breadcrumb-list__link"' +
				' href="/">SURCA Home</a></li>\n' +
			'\t\t\t</ol>\n' +
			'\t\t	<h1 class="tt--uppercase">News</h1>\n' +
			'\t</div>\n' +
			'</section>'
	} );

	// Check for a project finder interface on the page and if it is present, set it up
	setUpProjectFinder( {
		selIntf: '.abst-intf',
		modalTrigger: 'engaged',
		abstTrigger: 'expanded'
	} );
} );

} )( jQuery );
