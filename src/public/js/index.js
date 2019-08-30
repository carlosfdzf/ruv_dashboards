function initViz() {
    var containerDiv = document.getElementById("vizContainer"),
        url = urlext,
        options = {
            hideTabs: true,
            onFirstInteractive: function() {
                console.log("Run this code when the viz has finished loading.");
            }
        };
    var viz = new tableau.Viz(containerDiv, url, options);
    // Create a viz object and embed it in the container div.
}
window.onload = initViz;


// reference to iframe with id 'ifrm'
var ifrm = document.getElementById('ifrm');
ifrm.style.width = '400px'; // set width

