/* NODE.JS - Build Production JavaScript File */
var concat = require('../../../../AppData/Roaming/npm/node_modules/concat-files');
concat([
 './surca-custom.js',
 '../WSU-UE---JS/jQuery.oue-custom.js',
 '../WSU-UE---JS/jQuery.textResize.js',
 '../WSU-UE---JS/jQuery.forms.js',
 '../../jquery.AreYouSure/jquery.are-you-sure.js',
 '../WSU-UE---JS/jquery.are-you-sure.js',
 '../../qTip2/dist/jquery.qtip.min.js',
 '../WSU-UE---JS/jQuery.qTip.js',
 '../WSU-UE---JS/jQuery.cookieObjs.js',
 '../WSU-UE---JS/jquery.media.js',
 '../../jQuery.countdown/dist/jquery.countdown.min.js',
 '../WSU-UE---JS/jQuery.countdown-custom.js'
 ], './wp-custom-js-source.js', function() {
    console.log('Concatenation complete.');     
 });
 