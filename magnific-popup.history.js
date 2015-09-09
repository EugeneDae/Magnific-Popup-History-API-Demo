if (History.enabled) {
    // Save original document.title
    var documentTitle = document.title;
    
    // Back button should close the popup, while Forward should reopen
    History.Adapter.bind(window, 'statechange', function() {
        var query = History.getState().data.query;
        
        if (query) {
            // If Magnific Popup is closed and state data contains "query",
            // open the corresponding item
            if (!$.magnificPopup.instance.currItem) {
                $('.gallery__item a[href="' + query + '"]').click();
            }
        } else {
            $.magnificPopup.close();
        }
    });
    
    $.extend(true, $.magnificPopup.defaults, {
        callbacks: {
            afterClose: function() {
                // Dot removes the entire query string; you may want to rewrite this to
                // remove only necessary parts of the query string
                History.pushState({}, documentTitle, '.');
            },
            
            change: function(item) {
                var state = History.getState();
                var $el = $(item.el);
                var query = $el.find('a').attr('href');
                
                // Optionally, prepend alt contents to <title>
                var title = $el.find('img').attr('alt');
                
                if (title) {
                    title = title + ' | ' + documentTitle;
                } else {
                    title = documentTitle;
                }
                
                // Do not clutter user's history: if user just opened the gallery, 
                // push the new state, otherwise rewrite the state.
                // Also, if user opened the page
                if (state.data.query || query == $(location).attr('search')) {
                    History.replaceState({ query: query }, title, query);   
                } else {
                    History.pushState({ query: query }, title, query);
                }
            } // change
        } // callbacks
    }); // extend
}
