(function(){
    var width = 500,
    height = 500;

    var svg = d3.select("#chart")
        .append(svg)
        .attr("height",height)
        .attr("width",width)
        .append("g")
        .attr("transform","translate(0,0)")

    d3.queue()
        .defer(d3.csv,"#")
        .await(ready)

    function ready(error, datapoints){
        var circles =svg.selectAll(".emoji")
            .data(datapoints)
            .enter().append("circle")
            .attr("class","emoji")
            .attr("r",10)
            .attr("fill",blue)
            .attr("cx",100)
            .attr("cy",300)
    }
})();