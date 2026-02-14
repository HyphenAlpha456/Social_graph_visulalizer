import React, { createContext, useState, useContext } from 'react';

const GraphContext = createContext();

export const GraphProvider = ({ children }) => {
    const [graphData, setGraphData] = useState({ nodes: [], links: [] });
    const [selectedNode, setSelectedNode] = useState(null);
    const [pathResult, setPathResult] = useState(null);
    const [loading, setLoading] = useState(false);

    return (
        <GraphContext.Provider value={{
            graphData, setGraphData,
            selectedNode, setSelectedNode,
            pathResult, setPathResult,
            loading, setLoading
        }}>
            {children}
        </GraphContext.Provider>
    );
};

export const useGraph = () => useContext(GraphContext);