'use strict';

/* -------------------------------------------------------------------------------------------------
** Variable Declarations
*/

// Gulp task dependencies
var gulpBuilder = require( './WSU-UE---JS/gulpBuilder.js' );

/* -------------------------------------------------------------------------------------------------
** Function declarations
*/

/**
 * Get the settings for a gulp-mediated custom CSS build from Less source files.
 *
 * @return {object} - Instance of gulpBuilder.CssBuildSettings.
 */
function getCssBuildSettings() {
	var commentRemovalNeedle = /^(?:[ \t]*)?\/\*[^!].*$\n(?:^\*\*?[^/].*$\n)*\*\*?\/\n\n?/gm;
	var dependenciesPath = './WSU-UE---CSS/';
	var destFolder = './CSS/';
	var fontImportStr = '@import url(\'https://fonts.googleapis.com/css?family=Roboto+Mono:400,700|\
Roboto+Condensed:400,700|Roboto+Slab|PT+Serif\');\r\n';
	var insertingMediaQuerySectionHeader = {
			'before': /^@media/,
			'lineBefore': '/*! ====================================================================\
============================\r\n*** Media queries section\r\n*** ==================================\
==============================================================\r\n***   SUMMARY: Media queries buil\
t from precompiled CSS written in the Less language extension of\r\n***    CSS. Queries in this sec\
tion are a combination of those designed for use on DAESA websites***\r\n    and those intended spe\
cifically for use on the SURCA website.\r\n***\r\n***   DESCRIPTION: Fully documented, precompiled \
source code from which this section of the custom\r\n***    stylesheet was built is developed and m\
aintained on the following two GitHub projects:\r\n***    https://github.com/invokeImmediately/WSU-\
UE---CSS/\r\n***    https://github.com/invokeImmediately/surca.wsu.edu/\r\n***   AUTHOR: Daniel Rie\
ck [daniel.rieck@wsu.edu] (https://github.com/invokeImmediately)\r\n***\r\n***   LICENSE: ISC - Cop\
yright (c) 2019 Daniel C. Rieck.\r\n***\r\n***     Permission to use, copy, modify, and/or distribu\
te this software for any purpose with or\r\n***     without fee is hereby granted, provided that th\
e above copyright notice and this permission\r\n***     notice appear in all copies.\r\n***\r\n*** \
    THE SOFTWARE IS PROVIDED "AS IS" AND DANIEL RIECK DISCLAIMS ALL WARRANTIES WITH REGARD TO\r\n**\
*     THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT\r\
\n***     SHALL DANIEL RIECK BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES \
OR\r\n***     ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACT\
ION OF\r\n***     CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WI\
TH THE USE\r\n***     OR PERFORMANCE OF THIS SOFTWARE.\r\n*** =====================================\
===========================================================\r\n**/',
			'stopAfterFirstMatch': true
		};
	var minCssFileExtension = '.min.css';
	var minCssFileHeaderStr = '';
 	var sourceFile = './CSS/surca-custom.less';

	return new gulpBuilder.CssBuildSettings(commentRemovalNeedle, dependenciesPath,
 		destFolder, fontImportStr, insertingMediaQuerySectionHeader, minCssFileExtension,
 		minCssFileHeaderStr, sourceFile);
}

/**
 * Get the settings for a gulp-mediated custom JS build.
 *
 * @return {object} - Simple collection of settings for JS builds.
 */
function getJsBuildSettings() {
	return {
		buildDependenciesList: [
			'./WSU-UE---JS/jQuery.oue-custom.js',
			'./WSU-UE---JS/jQuery.css-data.js',
			'./WSU-UE---JS/jQuery.textResize.js',
			'./WSU-UE---JS/jQuery.forms.js',
			'../jQuery.AreYouSure/jquery.are-you-sure.js',
			'./WSU-UE---JS/jQuery.are-you-sure.js',
			'../qTip2/dist/jquery.qtip.min.js',
			'./WSU-UE---JS/jQuery.qTip.js',
			'./WSU-UE---JS/jQuery.cookieObjs.js',
			'./WSU-UE---JS/jquery.media.js',
			'../jQuery.countdown/dist/jquery.countdown.min.js',
//			'./WSU-UE---JS/jQuery.countdown-custom.js',
			'./Local/jQuery.countdown-custom_2017-10-18.prev.js',
			'./JS/surca-custom.js'
		],
		commentNeedle: /^(\/\*)(?!!)/g,
		compiledJsFileName: 'surca-build.js',
		destFolder: './JS/',
		minJsFileExtension: '.min.js',
		replaceCallback: gulpBuilder.fixFileHeaderComments
	};
}

/* -------------------------------------------------------------------------------------------------
** Main execution sequence
*/

gulpBuilder.setUpCssBuildTask( getCssBuildSettings() );
gulpBuilder.setUpJsBuildTask( getJsBuildSettings() );
