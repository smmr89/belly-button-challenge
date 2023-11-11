// --------------------------------
// ||||||||||||||||||||||||||||||||
// ================================
// Belly Button Diversity Challenge
// ================================
// ||||||||||||||||||||||||||||||||
// --------------------------------

// Steps To Develop
// 1. Use d3 to get data
// 2. Define init() function to plot/populate defaults
//   i. Test Subject ID list selection
//   ii. Bar Plot of OTU ID = 940
//   iii. Metadata demographic info
//   iv. Bubble Plot
//   v. Gauge Chart plot (bonus)
// 3. Define optionChanged() function to refresh defaults above (ii-v)
// 4. Define barPlot()
// 5. Define getMeta()
// 6. Define bubblePlot()
// 7. [bonus] Define gaugePlot()

// Publish to GitHub Pages.
// GitHub Pages URL: https://smmr89.github.io/belly-button-challenge/

// URL for data
const URL =
  "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/\
14-Interactive-Web-Visualizations/02-Homework/samples.json";

// d3.json(URL).then(function(response) {
//   console.log(response);
// });

// define initial function, which defines dropdown and calls the rest of the functions

function init() {
  d3.json(URL).then(function (response) {
    let dropdownMenu = d3.select("#selDataset");
    let names = response.names;
    
    // console.log(response);
    // console.log(names);
    // console.log(names[0]);

    for (i=0; i<names.length; i++) {
      dropdownMenu.append("option").text(names[i]).property("value", names[i]);
    }

    let defaultSampleID = names[0];

    console.log('The default Sample ID is: ', defaultSampleID);

    barPlot(defaultSampleID);
    getMeta(defaultSampleID);
    bubblePlot(defaultSampleID);
    gaugePlot(defaultSampleID);
  });
}

// function to refresh data when selecting dataset
function optionChanged(newTestID) {
  // Log selected ID to console
  console.log(`Newly selected sample ID is: ${newTestID}`);

  // Refresh charts/meta
  barPlot(newTestID);
  getMeta(newTestID);
  bubblePlot(newTestID);
  gaugePlot(newTestID);
}

// plot bar chart function
function barPlot(newTestID) {
  let id = newTestID;

  d3.json(URL).then(function (response) {
    let samples = Object.values(response.samples);

    let xVals;
    let yVals;
    let hover_text;

    // console.log(id);
    for (i = 0; i < samples.length; i++) {
      if (samples[i].id == id) {
        console.log("BAR PLOT Sample ID is: ", samples[i].id);
        xVals = samples[i].sample_values.slice(0, 10).reverse();
        yVals = samples[i].otu_ids
          .slice(0, 10)
          .map((id) => `OTU ${id}`)
          .reverse();
        hover_text = samples[i].otu_labels.slice(0, 10).reverse();
        // console.log(hover_text);
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

    // Render the plot to the div tag with id "bar"
    Plotly.newPlot("bar", bar_data, layout);
  });
}

// define meta function for demographicInfo
function getMeta(newTestID) {
  let id = newTestID;

  d3.json(URL).then(function (response) {
    let metadata = Object.values(response.metadata);
    // select the metadata Div and use .html("") to clear it
    let demographicInfo = d3.select("#sample-metadata").html("");

    for (i = 0; i < metadata.length; i++) {
      if (metadata[i].id == id) {
        console.log("METADATA Sample ID is: ", metadata[i].id);
        for (const key in metadata[i]) {
          // console.log(`${key}: ${metadata[i][key]}`);
          demographicInfo.append("p").text(`${key}: ${metadata[i][key]}`);
        }
      }
    }
  });
}

// define bubble chart function
function bubblePlot(newTestID) {
  let id = newTestID;

  d3.json(URL).then(function (response) {
    let samples = Object.values(response.samples);

    let xVals;
    let yVals;
    let hover_text;

    for (i = 0; i < samples.length; i++) {
      if (samples[i].id == id) {
        console.log("BUBBLE PLOT Sample ID is: ", samples[i].id);

        xVals = samples[i].otu_ids;
        yVals = samples[i].sample_values;

        hover_text = samples[i].otu_labels;
        // console.log(hover_text);
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

    // Render the plot to the div tag with id "bubble"
    Plotly.newPlot("bubble", bubble_data, layout);
  });
}

// Bonus function
function gaugePlot(newTestID) {
  // This is a bonus / no marks. Left blank for now
}

init();
