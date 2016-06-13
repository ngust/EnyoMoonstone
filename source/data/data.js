/**
	For simple applications, you might define all of your models, collections,
	and sources in this file.  For more complex applications, you might choose to separate
	these kind definitions into multiple files under this folder.
*/

enyo.kind({
        name: "flickr.Source",
        kind: "enyo.JsonpSource",
        urlRoot: "https://api.flickr.com/services/rest/",
        fetch: function(rec, opts) {
            opts.callbackName = "jsoncallback";
            opts.params = {};
            opts.params.api_key = "2a21b46e58d207e4888e1ece0cb149a5";
            opts.params.format = "json";
            this.inherited(arguments);
        }
    });

 new flickr.Source({name: "flickr"}); 