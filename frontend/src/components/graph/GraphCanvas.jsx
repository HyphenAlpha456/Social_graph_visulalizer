import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useGraph } from '../../context/Temp_GraphContext';

const GraphCanvas = () => {
    const svgRef = useRef();
    const { graphData, setSelectedNode, pathResult } = useGraph();

    useEffect(() => {
        if (!graphData.nodes.length) return;

        
        const worker = new Worker(new URL('../../workers/simulation.worker.js', import.meta.url), {
            type: 'module'
        });

        const width = 800; 
        const height = 600;
        const svg = d3.select(svgRef.current);
        
        
        svg.selectAll("*").remove(); 

        
        worker.postMessage({
            type: 'START',
            nodes: JSON.parse(JSON.stringify(graphData.nodes)), 
            links: JSON.parse(JSON.stringify(graphData.links))
        });

        worker.onmessage = (event) => {
            const { nodes, links } = event.data;
            
            
            svg.append("g")
                .selectAll("line")
                .data(links)
                .enter().append("line")
                .attr("stroke", d => {
                    
                    if (pathResult) {
                       
                        const sourceInPath = pathResult.find(u => u._id === d.source.id);
                        const targetInPath = pathResult.find(u => u._id === d.target.id);
                        if (sourceInPath && targetInPath) return "#facc15"; // Yellow for path
                    }
                    return "#475569"; 
                })
                .attr("stroke-width", d => pathResult && pathResult.find(u => u._id === d.source.id) && pathResult.find(u => u._id === d.target.id) ? 3 : 1)
                .attr("opacity", d => pathResult ? 0.2 : 0.6) // Fade others if path active
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            
            const nodeGroup = svg.append("g")
                .selectAll("g")
                .data(nodes)
                .enter().append("g")
                .attr("transform", d => `translate(${d.x},${d.y})`)
                .attr("cursor", "pointer")
                .on("click", (e, d) => setSelectedNode(d));

           
            nodeGroup.append("circle")
                .attr("r", d => d.friendCount > 5 ? 12 : 8) 
                .attr("fill", d => {
                    if (pathResult && pathResult.find(p => p._id === d._id)) return "#facc15"; 
                    return "#38bdf8"; 
                })
                .attr("stroke", "#fff")
                .attr("stroke-width", 1.5);

           
            nodeGroup.append("text")
                .text(d => d.name)
                .attr("x", 12)
                .attr("y", 4)
                .attr("fill", "#e2e8f0")
                .style("font-size", "10px")
                .style("pointer-events", "none")
                .style("opacity", d => d.friendCount > 3 ? 1 : 0.5);
        };

        return () => worker.terminate();

    }, [graphData, setSelectedNode, pathResult]);

    return (
        <svg 
            ref={svgRef} 
            viewBox="0 0 800 600" 
            className="w-100 h-100" 
            preserveAspectRatio="xMidYMid meet"
        ></svg>
    );
};

export default GraphCanvas;