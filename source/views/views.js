/**
	For simple applications, you might define all of your views in this file.  
	For more complex applications, you might choose to separate these kind definitions 
	into multiple files under this folder.
*/

enyo.kind({
        name: "flickr.MainView",
        classes: "moon enyo-fit",
        handlers: {
            onRequestPushPanel: "pushPanel"
        },
         pushPanel: function(inSender, inEvent) {
            this.$.panels.pushPanel(inEvent.panel);
        },
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
        headerComponents: [
            {kind: "moon.Spinner", content: "Loading...", name: "spinner"}
        ],
        handlers: {
            onInputHeaderChange: "search"
        },
        components: [
            {kind: "moon.DataGridList", fit: true, name: "resultList", minWidth: 250, minHeight: 300, ontap: "itemSelected", components: [
                {kind: "moon.GridListImageItem", imageSizing: "cover", useSubCaption: false, centered: false, bindings: [
                    {from: "model.title", to: "caption"},
                    {from: "model.thumbnail", to: "source"}
                ]}
            ]}
        ],
        itemSelected: function(inSender, inEvent) {
            this.doRequestPushPanel({panel: {kind: "flickr.DetailPanel", model: inEvent.model}});
        },
        bindings: [
            {from: "photos", to: "$.resultList.collection"},
            {from: "photos.status", to:"$.spinner.showing", transform: function(value) {
                return this.photos.isBusy();
            }}
        ],
        create: function() {
            this.inherited(arguments);
            this.set("photos", new flickr.SearchCollection());
        },
         search: function(inSender, inEvent) {
            this.$.resultList.collection.set("searchText", inEvent.originator.get("value"));
        }
    });

   enyo.kind({
        name: "flickr.DetailPanel",
        kind: "moon.Panel",
        layoutKind: "FittableColumnsLayout",
        components: [
            {kind: "moon.Image", fit: true, sizing: "contain", name: "image"}
        ],
        bindings: [
            {from: "model.title", to: "title"},
            {from: "model.original", to: "$.image.src"}
        ]
    });