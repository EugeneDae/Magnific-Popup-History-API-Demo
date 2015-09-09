// Parse query string, from http://stackoverflow.com/a/3855394/412240
(function($) {
    $.QueryString = (function(a) {
        if (a == '') return {};
        var b = {};
        for (var i = 0; i < a.length; ++i) {
            var p=a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        
        return b;
    })(window.location.search.substr(1).split('&'))
})(jQuery);

// Actually click the item
$(document).ready(function() {
    if ($.QueryString['item']) {
        $('.gallery__item a[href="?item=' + $.QueryString['item'] + '"]').click();
    }
});
