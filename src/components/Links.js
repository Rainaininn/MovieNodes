import React, { Component } from "react";
import config from './config.js'
import { svg } from 'd3';

const firebase = require('firebase')
var d3 = require('d3');

export class Link extends Component{
  constructor(){
    super();
    this.state = {
      nodes: [],
      links: [],
      movies: [],
    };
  }

  drag = (simulation) => {
    function dragStarted(d){
      if(!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d){
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragEnded(d){
      if(!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return d3.drag()
      .on("start", dragStarted)
      .on("drag", dragged)
      .on("end", dragEnded);

  }

  chart(nodes, links){
    const width = 1920;
    const height = 1080;

    const obj_links = links.map(d => Object.create(d));
    const obj_nodes = nodes.map(d => Object.create(d));

    const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

    const link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(obj_links)
      .join("line")
      .attr("stroke-width", d=>Math.sqrt(d.value));

    var img = svg.append("defs")
    const color = (node) => {
      if(node.group == 1){ //if it's a movie
        img.append('pattern')
          .attr('id', 'img_'+node.index)
          // .attr('patternUnits', 'objectBoundingBox')
          .attr('width', 1)
          .attr('height', 1)
        .append('image')
          .attr('xlink:href', node.poster)
          .attr("width", 270)
          .attr("height", 270)
          .attr("x", -45)
          .attr("y", -20);
        console.log("Hey: ", node, "\n", img)
        return "url(#img_" + node.index+ ")"
      }
      return d3.color("cornflowerblue");
    }

    const radius = (node) => {
      if(node.group == 1){
        return 90;
      }
      return 20;
    }

    const simulation = d3.forceSimulation(obj_nodes)
      .force("link", d3.forceLink().links(links).id(d => {return d.index;}).distance(250))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width/2, height/2));

    var div = d3.select("body").append("div")	
      .attr("class", "tooltip")				
      .style("opacity", 0);

    const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(obj_nodes)
      .join("circle")
      .attr("r", radius)
      .attr("fill", color)
      .on("mouseover", function(d) {		
          div.transition()		
              .duration(200)		
              .style("opacity", .9);		
          div.html(d.name)	
              .style("left", (d3.event.pageX) + "px")		
              .style("top", (d3.event.pageY - 28) + "px");	
          })					
      .on("mouseout", function(d) {		
          div.transition()		
              .duration(500)		
              .style("opacity", 0);	
      })
      .call(this.drag(simulation))

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
    });

    return svg.node();
  }

  componentDidMount(){
    console.log("Component did mount !")
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    let ref = firebase.database().ref("data3");
    ref.on("value", snapshot => {
      const movies = snapshot.val();
      let newState = [];
      let newNodes = [];
      let newLinks = [];
      for (let movie in movies) {
        if(movies[movie].List === "GraphViz"){
          newState.push(movies[movie]);
          newNodes.push({name: movies[movie].Title, poster: movies[movie].Poster, group: 1});
          const name_array = movies[movie].Actors.split(", ");
          console.log("Actors: ", name_array)
          for (let temp_name in name_array){
            let actorFound = false;
            for (let temp_node in newNodes){
              if(name_array[temp_name] == newNodes[temp_node].name){
                actorFound = true;
              }
            }
            if(actorFound === false){
              newNodes.push({name: name_array[temp_name], group: 2});
            }
            var index1 = newNodes.findIndex(obj => obj.name==movies[movie].Title);
            var index2 = newNodes.findIndex(obj => obj.name==name_array[temp_name]);
            newLinks.push({source: index1, target: index2,});
          }
        }
      }
      this.setState({ movies: newState });
      this.setState({ nodes: newNodes });
      this.setState({ links: newLinks });
    });
  }

  componentDidUpdate(){
    if(Object.keys(this.state.nodes).length !== 0 && Object.keys(this.state.links).length !== 0){
      const elem = document.getElementById("mysvg");
      elem.appendChild(this.chart(this.state.nodes, this.state.links));
    }
    console.log("New nodes :" , this.state.nodes);
    console.log("New links :" , this.state.links);
  }

  render(){
    return(
      <div>
        <div id="mysvg">
        </div>
        <div className="descrip-graph">
          You can edit this graph by arranging the GraphViz list in Movies tab.
        </div>
      </div>
      
    );
  }

}export default Link;