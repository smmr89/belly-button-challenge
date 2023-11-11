const URL =
  "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/\
14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(URL).then(function (response) {
  console.log(response);
});

function init() {
  d3.json(URL).then(function (response) {
    let dropdownMenu = d3.select("#selDataset");
    let names = response.names;

    console.log(names);

    names.forEach((id) => {
      console.log(id);
      dropdownMenu.append("option").text(id).property("value", id);
    });

    let defaultSampleID = names[0];

    console.log(defaultSampleID);

    barPlot(defaultSampleID);
    getMeta(defaultSampleID);
    bubblePlot(defaultSampleID);
    gaugePlot(defaultSampleID);
  });
}

function optionChanged(newTestID) {
  // Log selected ID to console
  console.log(`Selected ID No is: ${newTestID}`);

  // Refresh charts/meta
  barPlot(newTestID);
  getMeta(newTestID);
  bubblePlot(newTestID);
  gaugePlot(newTestID);
}

function barPlot(newTestID) {
  let id = newTestID;

  d3.json(URL).then(function (response) {
    let samples = Object.values(response.samples);

    let xVals;
    let yVals;
    let hover_text;

    console.log(id);
    for (i = 0; i < samples.length; i++) {
      if (samples[i].id == id) {
        console.log("The selected Sample ID is: ", samples[i].id);
        xVals = samples[i].sample_values.slice(0, 10).reverse();
        yVals = samples[i].otu_ids
          .slice(0, 10)
          .map((id) => `OTU ${id}`)
          .reverse();
        hover_text = samples[i].otu_labels.slice(0, 10).reverse();
        console.log(hover_text);
      }
    }

    let trace1 = {
      x: xVals,
      y: yVals,
      type: "bar",
      orientation: "h",
      text: hover_text,
    };

    let bar_data = [trace1];

    let layout = {
      title: `Top 10 OTUs for ID = ${id}`,
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar", bar_data, layout);
  });
}

function getMeta(newTestID) {
  let id = newTestID;

  d3.json(URL).then(function (response) {
    let metadata = Object.values(response.metadata);
    // select the correct Div and use .html("") to clear it
    let demographicInfo = d3.select("#sample-metadata").html("");

    for (i = 0; i < metadata.length; i++) {
      if (metadata[i].id == id) {
        console.log("The selected Sample ID is: ", metadata[i].id);
        for (const key in metadata[i]) {
          console.log(`${key}: ${metadata[i][key]}`);
          demographicInfo.append("p").text(`${key}: ${metadata[i][key]}`);
        }
      }
    }
  });
}

function bubblePlot(newTestID) {
  let id = newTestID;

  d3.json(URL).then(function (response) {
    let samples = Object.values(response.samples);

    let xVals;
    let yVals;
    let hover_text;

    for (i = 0; i < samples.length; i++) {
      if (samples[i].id == id) {
        console.log("The selected Sample ID is: ", samples[i].id);

        xVals = samples[i].otu_ids;
        yVals = samples[i].sample_values;

        hover_text = samples[i].otu_labels;
        console.log(hover_text);
      }
    }

    let trace2 = {
      x: xVals,
      y: yVals,
      text: hover_text,
      mode: "markers",
      marker: {
        size: yVals,
        color: xVals,
      }
    };

    let bubble_data = [trace2];

    let layout = {
      title: `Bubble Chart for ID = ${id}`,
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bubble", bubble_data, layout);
  });
}

function gaugePlot(newTestID) {
  // This is a bonus - do not have to do!
}

init();
