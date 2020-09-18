d3.json("/data").then(function (data) {
    // console.log(data);
    latest_year_data = data.filter(data => data.Year == 2019);
    // console.log(latest_year_data);
    var countries_score_2019 = []
    latest_year_data.forEach(item => {
        country = item.Country;
        score = item.Score
        countries_score_2019.push({ 'name': country, 'value': score });
    });
    // console.log(countries_score_2019);

    data.forEach(function(data) {
        data.country = data.Country;
        data.rank = data.Rank;
        data.score = +data.Score;
        data.economy = +data.Economy;
        data.family = +data.Family;
        data.health = +data.Health;
        data.freedom = +data.Freedom;
        data.generosity = +data.Generosity;
        data.trust = +data.Trust;
        data.year = +data.Year;
        data.lat = +data.Lat;
        data.long = +data.Long;
      });
      // xLinearScale function 
      var xLinearScale = xScale(data, chosenXAxis);
      // Create y scale function
      var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.score+ 0.5)])
        .range([height, 0]);
      // Create initial axis functions
      var bottomAxis = d3.axisBottom(xLinearScale);
      var leftAxis = d3.axisLeft(yLinearScale);
      // append x axis
      var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
      // append y axis
      chartGroup.append("g")
        .call(leftAxis);
      // append initial circles
      var circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d[chosenXAxis]))
        .attr("cy", d => yLinearScale(d.score))
        .attr("r", 5.5)
        .attr("fill", "dodgerblue")
        .attr("opacity", ".5");
      // Create group for three x-axis labels
      var labelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20})`);
      var healthLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "health") // value to grab for event listener
        .classed("active", true)
        .text("Health");
      var freedomLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "freedom") // value to grab for event listener
        .classed("inactive", true)
        .text("Freedom");
      var generosityLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 60)
        .attr("value", "generosity") // value to grab for event listener
        .classed("inactive", true)
        .text("Generosity");
      var familyLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 80)
        .attr("value", "family") // value to grab for event listener
        .classed("inactive", true)
        .text("Family");
      var trustLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 100)
        .attr("value", "trust") // value to grab for event listener
        .classed("inactive", true)
        .text("Trust");
      var economyLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 120)
        .attr("value", "economy") // value to grab for event listener
        .classed("inactive", true)
        .text("Economy");
      // append y axis
      chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .classed("axis-text", true)
        .classed("active", true)
        .text("Happiness Score");
      // updateToolTip function above csv import
      var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
      // x axis labels event listener
      labelsGroup.selectAll("text")
        .on("click", function() {
          // get value of selection
          var value = d3.select(this).attr("value");
          if (value !== chosenXAxis) {
            // replaces chosenXAxis with value
            chosenXAxis = value;
            // console.log(chosenXAxis);
            // updates x scale for new data
            xLinearScale = xScale(data, chosenXAxis);
            // updates x axis with transition
            xAxis = renderAxes(xLinearScale, xAxis);
            // updates circles with new x values
            circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);
            // updates tooltips with new info
            circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
            // changes classes to change bold text
            if (chosenXAxis === "health") {
              healthLabel
                .classed("active", true)
                .classed("inactive", false);
              freedomLabel
                .classed("active", false)
                .classed("inactive", true);
              generosityLabel
                .classed("active", false)
                .classed("inactive", true);
              familyLabel
                .classed("active", false)
                .classed("inactive", true);
              trustLabel
                .classed("active", false)
                .classed("inactive", true);
              economyLabel
                .classed("active", false)
                .classed("inactive", true);
            }
            else if (chosenXAxis === "generosity"){
              healthLabel
                .classed("active", false)
                .classed("inactive", true);
              freedomLabel
                .classed("active", false)
                .classed("inactive", true);
              generosityLabel
                .classed("active", true)
                .classed("inactive", false);
              familyLabel
                .classed("active", false)
                .classed("inactive", true);
              trustLabel
                .classed("active", false)
                .classed("inactive", true);
              economyLabel
                .classed("active", false)
                .classed("inactive", true);
            }
            else if (chosenXAxis === "freedom"){
              healthLabel
                .classed("active", false)
                .classed("inactive", true);
              freedomLabel
                .classed("active", true)
                .classed("inactive", false);
              generosityLabel
                .classed("active", false)
                .classed("inactive", true);
              familyLabel
                .classed("active", false)
                .classed("inactive", true);
              trustLabel
                .classed("active", false)
                .classed("inactive", true);
              economyLabel
                .classed("active", false)
                .classed("inactive", true);
            }
            else if (chosenXAxis === "family"){
              healthLabel
                .classed("active", false)
                .classed("inactive", true);
              freedomLabel
                .classed("active", false)
                .classed("inactive", true);
              generosityLabel
                .classed("active", false)
                .classed("inactive", true);
              familyLabel
                .classed("active", true)
                .classed("inactive", false);
              trustLabel
                .classed("active", false)
                .classed("inactive", true);
              economyLabel
                .classed("active", false)
                .classed("inactive", true);
            }
            else if (chosenXAxis === "trust"){
              healthLabel
                .classed("active", false)
                .classed("inactive", true);
              freedomLabel
                .classed("active", false)
                .classed("inactive", true);
              generosityLabel
                .classed("active", false)
                .classed("inactive", true);
              familyLabel
                .classed("active", false)
                .classed("inactive", true);
              trustLabel
                .classed("active", true)
                .classed("inactive", false);
              economyLabel
                .classed("active", false)
                .classed("inactive", true);
            }
            else {
              healthLabel
                .classed("active", false)
                .classed("inactive", true);
              freedomLabel
                .classed("active", false)
                .classed("inactive", true);
              generosityLabel
                .classed("active", false)
                .classed("inactive", true);
              familyLabel
                .classed("active", false)
                .classed("inactive", true);
              trustLabel
                .classed("active", false)
                .classed("inactive", true);
              economyLabel
                .classed("active", true)
                .classed("inactive", false);
            }
          }
        });
    
});

// Creating map object
// Creating map object

  

var svgWidth = 960;
var svgHeight = 600;
var margin = {
  top: 20,
  right: 40,
  bottom: 200,
  left: 100
};
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);
// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
// Initial Params
var chosenXAxis = "health";
// function used for updating x-scale var upon click on axis label
function xScale(data, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => d[chosenXAxis] *.8),
      d3.max(data, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);
  return xLinearScale;
}
// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);
  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);
  return xAxis;
}
// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis) {
  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));
  return circlesGroup;
}
//function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {
  var label;
  if (chosenXAxis === "health") {
    label = "Health Score:";
  } else if (chosenXAxis === "freedom") {
    label = "Freedom Score:";
  } else if (chosenXAxis === "generosity") {
    label = "Generosity Score:";
  } else if (chosenXAxis === "family") {
    label = "Family Score:";
  } else {
    label = "Trust Score:"
  }
  var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .style("background", "black")
    .style("color", "white")
    .offset([80, -20])
    .html(function(d) {
      return (`${d.country}<br>${label} ${d[chosenXAxis]}`);
    });
  circlesGroup.call(toolTip);
  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });
  return circlesGroup;
}
function init() {
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    
    d3.json("/data").then(function(data){
    
        data.forEach(function(d) {
            
            dropdownMenu.append("option").text(d.Country).property("value");	
        
        });

        barPlot(data[0].Country);
        // demInfo(data.samples[0].id);
        // bubbleChart(data.samples[0].id);
	});
}

function barPlot(Country) {
		
		
    d3.json("/data").then(function(data){
        var sample_data = data.filter(s => s.Country === Country);
        // console.log(sample_data);
        
        var years = [];
        var scores = [];

        sample_data.forEach(function(d){
            year = d.Year;
            score = d.Score;

            years.push(year);
            scores.push(score);
        })
        
        // console.log(years);
        // console.log(scores);

        var trace = {
            x: years,
            y: scores,
            type: "line",
        };

        var data = [trace];
        var title = `${Country}'s Score Over The Years`;

        var layout = {
            title: title
            
        };

        Plotly.newPlot("bar", data, layout);
    });
};

//initializing with a standin value 
init();

d3.selectAll("#selDataset").on("change", updatePlotly);

function updatePlotly(){
    var dropID = d3.select("#selDataset");
    var Country = dropID.node().value;

    //the other functions are called anytime there is a change to update the graphics
    barPlot(Country);

};

const lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: 'pk.eyJ1IjoicmluZ290bSIsImEiOiJja2VhbHQycDkwMDNpMnhyeTF2bXkzNHdsIn0.0z2sYcvbh0t_X0uFobRNvA'
});
const layers = {
    layer2015: new L.LayerGroup(),
    layer2016: new L.LayerGroup(),
    layer2017: new L.LayerGroup(),
    layer2018: new L.LayerGroup(), 
    layer2019: new L.LayerGroup(),
}
const map = L.map("map", {
    center: [41, 12],
    zoom: 2,
    layers: [layers.layer2019]
});
lightmap.addTo(map);
const overlays = {
    '2015': layers.layer2015,
    '2016': layers.layer2016,
    '2017': layers.layer2017,
    '2018': layers.layer2018,
    '2019': layers.layer2019
};
const icons = {
    Happy: L.ExtraMarkers.icon({
        icon: "fa-smile",
        iconColor: 'green',
        markerColor: 'green',
        prefix: 'fa',
    }),
    Content: L.ExtraMarkers.icon({
        icon: "fa-meh",
        iconColor: 'yellow',
        markerColor: 'yellow',
        prefix: 'fa'
    }),
    Unhappy: L.ExtraMarkers.icon({
        icon: "fa-frown",
        iconColor: 'red',
        markerColor: 'red',
        prefix: 'fa'
    })
};

var legend = L.control({ position: "bottomright" });
legend.onAdd = function (map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h3>Happiness Level</h3>";
    div.innerHTML += '<i style="background: green"></i><span> Very Happy</span><br>';
    div.innerHTML += '<i style="background: yellow"></i><span>Moderately Happy</span><br>';
    div.innerHTML += '<i style="background: red"></i><span>Unhappy</span><br>';
    return div;
};
legend.addTo(map);


L.control.layers(overlays, null, { collapsed: false }).addTo(map);


// Create a legend to display information about our map
const info = L.control({
    position: "bottomright"
});
// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function () {
    const div = L.DomUtil.create("div", "legend");
    return div;
};
// Add the info legend to the map
info.addTo(map);
d3.json("/data").then(function (data) {
    console.log(data);
    latest_year_data = data.filter(data => data.Year == 2019);
    console.log(latest_year_data);
    var countries_score_2019 = []
    let happinessCategory;
    latest_year_data.forEach(item => {
        country = item.Country;
        score = item.Score
        countries_score_2019.push({ 'name': country, 'value': score });
        if (item.Score >= 7) {
            happinessCategory = 'Happy'
        }
        else if (item.Score >= 4.5) {
            happinessCategory = 'Content'
        }
        else {
            happinessCategory = 'Unhappy'
        }
        if (item.Lat != null) {
            const newMarker = L.marker([item.Lat, item.Long], {
                icon: icons[happinessCategory]
            })
            newMarker.addTo(layers["layer2019"]);
            newMarker.bindPopup(item.Country + "<br> Happiness Score: " + item.Score);
        }
    });
    data_2015 = data.filter(data => data.Year == 2015);
    // let happinessCategory;
    data_2015.forEach(item => {
        if (item.Score >= 7) {
            happinessCategory = 'Happy'
        }
        else if (item.Score >= 4.5) {
            happinessCategory = 'Content'
        }
        else {
            happinessCategory = 'Unhappy'
        }
        if (item.Lat != null) {
            const newMarker = L.marker([item.Lat, item.Long], {
                icon: icons[happinessCategory]
            })
            newMarker.addTo(layers["layer2015"]);
            newMarker.bindPopup(item.Country + "<br> Happiness Score: " + item.Score);
        }
    });
    data_2016 = data.filter(data => data.Year == 2016);
    //let happinessCategory;
    data_2016.forEach(item => {
        if (item.Score >= 7) {
            happinessCategory = 'Happy'
        }
        else if (item.Score >= 4.5) {
            happinessCategory = 'Content'
        }
        else {
            happinessCategory = 'Unhappy'
        }
        if (item.Lat != null) {
            const newMarker = L.marker([item.Lat, item.Long], {
                icon: icons[happinessCategory]
            })
            newMarker.addTo(layers["layer2016"]);
            newMarker.bindPopup(item.Country + "<br> Happiness Score: " + item.Score);
        }
    });
    data_2017 = data.filter(data => data.Year == 2017);
    //let happinessCategory;
    data_2017.forEach(item => {
        if (item.Score >= 7) {
            happinessCategory = 'Happy'
        }
        else if (item.Score >= 4.5) {
            happinessCategory = 'Content'
        }
        else {
            happinessCategory = 'Unhappy'
        }
        if (item.Lat != null) {
            const newMarker = L.marker([item.Lat, item.Long], {
                icon: icons[happinessCategory]
            })
            newMarker.addTo(layers["layer2017"]);
            newMarker.bindPopup(item.Country + "<br> Happiness Score: " + item.Score);
        }
    });
    data_2018 = data.filter(data => data.Year == 2018);
    //let happinessCategory;
    data_2018.forEach(item => {
        if (item.Score >= 7) {
            happinessCategory = 'Happy'
        }
        else if (item.Score >= 4.5) {
            happinessCategory = 'Content'
        }
        else {
            happinessCategory = 'Unhappy'
        }
        if (item.Lat != null) {
            const newMarker = L.marker([item.Lat, item.Long], {
                icon: icons[happinessCategory]
            })
            newMarker.addTo(layers["layer2018"]);
            newMarker.bindPopup(item.Country + "<br> Happiness Score: " + item.Score);
        }
    });
    anychart.onDocumentReady(function () {
        var tree_data = [
            { name: "Country Happiness", children: countries_score_2019 }
        ];
        console.log(tree_data);
        var chart = anychart.treeMap(tree_data, "as-tree");
        var customColorScale = anychart.scales.ordinalColor();
        customColorScale.ranges([
            { less: 4 },
            { from: 4, to: 5.5 },
            { from: 5.5, to: 7 },
            { greater: 7 }
        ]);
        customColorScale.colors(["#FF0000", "#FAA106", "#84FA06", "#0CBA0F"]);
        // set the color scale as the color scale of the chart
        chart.colorScale(customColorScale);
        // add a color range
        chart.colorRange().enabled(true);
        chart.colorRange().length("100%");
        chart.container('container');
        chart.draw();
    }
    )
});