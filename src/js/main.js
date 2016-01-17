$(document).ready(function() {
/*----------------------------------------------
            IF IOS LOAD FASTCLICK.JS
-----------------------------------------------*/
    
    var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
    if(iOS) $.getScript('js/fastclick.js');

});