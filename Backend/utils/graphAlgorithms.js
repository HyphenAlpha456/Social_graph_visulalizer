const User = require('../models/User');


async function biDirectionalBFS(startId, endId) {
    
    const allUsers = await User.find().select('_id friends').lean();
    

    const graph = {};
    allUsers.forEach(user => {
        graph[user._id.toString()] = user.friends.map(f => f.toString());
    });

    if (!graph[startId] || !graph[endId]) return null;
    if (startId === endId) return [startId];

   
    let queueA = [startId];
    let queueB = [endId];

    let visitedA = new Set([startId]);
    let visitedB = new Set([endId]);

    let parentsA = {}; 
    let parentsB = {}; 

    
    while (queueA.length > 0 && queueB.length > 0) {
        
        let collision = expandLevel(queueA, visitedA, visitedB, parentsA, graph);
        if (collision) return buildPath(collision, parentsA, parentsB);

       
        collision = expandLevel(queueB, visitedB, visitedA, parentsB, graph);
        if (collision) return buildPath(collision, parentsA, parentsB);
    }

    return null;
}



function expandLevel(queue, myVisited, otherVisited, parents, graph) {
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
        const currentNode = queue.shift();
        const neighbors = graph[currentNode] || [];

        for (const neighbor of neighbors) {
            
            if (otherVisited.has(neighbor)) {
                
                parents[neighbor] = currentNode; 
                return neighbor; 
            }

            
            if (!myVisited.has(neighbor)) {
                myVisited.add(neighbor);
                parents[neighbor] = currentNode;
                queue.push(neighbor);
            }
        }
    }
    return null;
}

function buildPath(meetingNode, parentsA, parentsB) {

    let pathA = [meetingNode];
    let curr = parentsA[meetingNode];
    while (curr) {
        pathA.unshift(curr);
        curr = parentsA[curr];
    }

    
    let pathB = [];
    curr = parentsB[meetingNode]; 
    while (curr) {
        pathB.push(curr);
        curr = parentsB[curr];
    }

    
    return [...pathA, ...pathB];
}

module.exports = { biDirectionalBFS };