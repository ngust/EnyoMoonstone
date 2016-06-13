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
            opts.params = enyo.clone(rec.params);
            opts.params.api_key = "2a21b46e58d207e4888e1ece0cb149a5";
            opts.params.format = "json";
            this.inherited(arguments);
        }
    });

enyo.kind({
    name: "flickr.SearchCollection",
    kind: "enyo.Collection",
    model: "flickr.ImageModel",
    source: "flickr",
    options: { parse: true },
    published: {
        searchText: null,
    },
    searchTextChanged: function() {
        this.empty({destroy: true});
        this.fetch();
    },
    fetch: function(opts) {
        this.params = {
            method: "flickr.photos.search",
            sort: "interestingness-desc",
            per_page: 50,
            text: this.searchText
        };
        return this.inherited(arguments);
    },
    parse: function(data) {
    return data && data.photos && data.photos.photo;
  }
});

enyo.kind({
        name: "flickr.ImageModel",
        kind: "enyo.Model",
        computed: [
            {method: "thumbnail", path: ["farm", "server", "id", "secret"]},
            {method: "original", path: ["farm", "server", "id", "secret"]}
        ],
        thumbnail: function() {
            return "https://farm" + this.get("farm") +
                ".static.flickr.com/" + this.get("server") +
                "/" + this.get("id") + "_" + this.get("secret") + "_m.jpg";
        },
        original: function() {
            return "https://farm" + this.get("farm") +
                ".static.flickr.com/" + this.get("server") +
                "/" + this.get("id") + "_" + this.get("secret") + ".jpg";
        }
    });

 new flickr.Source({name: "flickr"}); 