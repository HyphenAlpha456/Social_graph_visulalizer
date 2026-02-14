import * as d3 from 'd3';

self.onmessage = function (event) {
    const { nodes, links, type } = event.data;

    if (type === 'START') {
        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id).distance(100))
            .force("charge", d3.forceManyBody().strength(-400))
            .force("center", d3.forceCenter(400, 300))
            .force("collide", d3.forceCollide(30).iterations(2))
            .stop();

        
        for (let i = 0; i < 300; ++i) simulation.tick();

        self.postMessage({ type: 'END', nodes, links });
    }
};