/**
	For simple applications, you might define all of your views in this file.  
	For more complex applications, you might choose to separate these kind definitions 
	into multiple files under this folder.
*/

enyo.kind({
        name: "flickr.MainView",
        classes: "moon enyo-fit",
        components: [
            {kind: "moon.Panels", classes: "enyo-fit", pattern: "alwaysviewing", popOnBack: true, components: [
                 {kind: "flickr.SearchPanel"}  // Use our new flickr.SearchPanel
            ]}
        ]
    });

enyo.kind({
        name: "flickr.SearchPanel",
        kind: "moon.Panel",
        title: "Search Flickr",
        titleBelow: "Enter search term above",
        headerOptions: {inputMode: true, dismissOnEnter: true},
        handlers: {
            onInputHeaderChange: "search"
        },
        components: [
            {kind: "moon.DataGridList", fit: true, name: "resultList", minWidth: 250, minHeight: 300, components: [
                {kind: "moon.GridListImageItem", imageSizing: "cover", useSubCaption: false, centered: false, bindings: [
                    {from: "model.title", to: "caption"},
                    {from: "model.thumbnail", to: "source"}
                ]}
            ]}
        ],
        bindings: [
            {from: "photos", to: "$.resultList.collection"}
        ],
        create: function() {
            this.inherited(arguments);
            this.set("photos", new flickr.SearchCollection());
        },
         search: function(inSender, inEvent) {
            this.$.resultList.collection.set("searchText", inEvent.originator.get("value"));
        }
    });