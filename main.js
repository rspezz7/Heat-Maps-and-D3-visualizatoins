//Define data
const crime = d3.csv("us_statewide_crime.csv");

crime.then(function(data) {
  // Convert string values to numbers
  data.forEach(function(d) {
      d.Unemployed = +d.Unemployed;
  });
  data.sort((a, b) => b.Unemployed - a.Unemployed);

// Define the dimensions and margins for the SVG

let width = 600, height = 1200;
let margin = {
    top: 30,
    bottom: 75,
    left: 110,
    right: 30
}

// Create the SVG container

let svg = d3.select('#plot')
.attr('width', width)
.attr('height', height)
.style('background', 'white')

// Set up scales for x and y axes

const colorScale = d3.scaleOrdinal()
  .domain(data.map(d => d.Unemployed))
  .range(d3.schemeCategory10);

// Add scales

let yScale = d3.scaleBand()
  .domain(data.map(d => d.State))
  .range([margin.top, height - margin.bottom])
  .padding(0.25);

let yAxis = svg
  .append('g')
  .attr('transform', `translate(${margin.left}, 0)`)
  .call(d3.axisLeft().scale(yScale))

let xScale = d3.scaleLinear()
  .domain([0, 6.5])
  .range([margin.left, width - margin.right])

let xAxis = svg
  .append('g')
  .attr('transform', `translate(0, ${height - margin.bottom})`)
  .call(d3.axisBottom().scale(xScale))

// Add x-axis label

xAxis.append('text')
  .attr('x', 340)
  .attr('y', 50)
  .style('stroke', 'black')
  .text('Unemployment Rate');

// Draw bars

let bar = svg
  .selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('class', 'bar')
  .attr('x', 110)
  .attr('y', d => yScale(d.State))
  .attr('width', d => xScale(d.Unemployed) - margin.left)
  .attr('height', yScale.bandwidth())
  .attr('fill', 'steelblue')
  .attr('outline', 'white');

bar
  .on('click', function(d){
    d3.select(this)
      .transition()
      .delay(200)
      .style('fill', 'red');

  })

});



