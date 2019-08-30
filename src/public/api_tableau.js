

function initViz(variable) {
    var containerDiv = document.getElementById("vizContainer"),
        url = "http://public.tableau.com/views/RegionalSampleWorkbook/Storms",
        options = {
            hideTabs: true,
            onFirstInteractive: function() {
                console.log("Run this code when the viz has finished loading.");

            }
        };
    var viz = new tableau.Viz(containerDiv, url, options);
    var variable = viz;
    return variable
}


nuevavariable = initViz();
console.log(nuevavariable)