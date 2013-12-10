MediaViewer.UI
==============

A media content management and sharing web application.

MediaViewer.UI, provides the front end website UI to present data from the [MediaViewer.UI](https://github.com/mtimmermann/MediaViewer.App) application.

This application uses the following core components: 
    Backbone.js, Backbone.Marionette, Bootstrap 3


## Prerequisites ##
[Node.js](http://nodejs.org/) must be installed in order to build this site.

To run this site, the [MediaViewer.App](https://github.com/mtimmermann/MediaViewer.App) must first be setup and running ([see the README for that project](https://github.com/mtimmermann/MediaViewer.App)). I am also using NGINX to serve up the static content of this site, and handle proxy passes to the [MediaViewer.App](https://github.com/mtimmermann/MediaViewer.App) NodeJS app, the configuration can be found there.


## Updating dependencies ##
Using node package manager:

**npm install**


## Build ##
**grunt**

optionally run "**grunt watch**" if you want rebuilds when files are modified, deleted, added.
