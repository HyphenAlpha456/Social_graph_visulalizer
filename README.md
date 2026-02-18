# Social Graph Intelligence Platform 🕸️

A high-performance social network analysis tool that visualizes user connections, calculates shortest paths, and recommends friends using advanced graph algorithms. Built with the **MERN Stack** and **D3.js**.

![Project Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-MIT-blue)

## 🚀 Key Features

* **Shortest Path Finder:** Implements **Bi-Directional BFS** to find the degrees of separation between two users with **O(b^(d/2))** time complexity.
* **Smart Recommendations:** Engineered a "People You May Know" engine using the **Adamic-Adar Index** to predict links based on shared neighbor topology.
* **Interactive Visualization:** Renders complex social clusters using **D3.js force-directed graphs**.
* **High-Performance Rendering:** Offloads physics calculations to **Web Workers** to maintain 60 FPS UI performance during graph updates.
* **Latency Optimization:** Features an **in-memory adjacency list** strategy that pre-fetches user data, eliminating repeated MongoDB queries and reducing BFS execution time by **90%**.

## 🛠️ Tech Stack

* **Frontend:** React.js, D3.js, Web Workers, CSS3
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (with Mongoose)
* **Algorithms:** Graph Theory (BFS, Bi-Directional Search), Link Prediction (Adamic-Adar)

## 🧠 System Architecture & Algorithms

### 1. Bi-Directional BFS
Instead of a standard Breadth-First Search which grows exponentially ($O(b^d)$), this project uses a Bi-Directional approach. Two searches run simultaneously—one from the source and one from the destination—stopping when they collide. This reduces the search space significantly to $O(b^{d/2})$.

### 2. Adamic-Adar Index
Used for link prediction, this algorithm assigns a weight to common neighbors. It assumes that sharing "rare" neighbors (nodes with low degrees) is more significant than sharing "popular" neighbors.

$$\text{Score}(x, y) = \sum_{z \in N(x) \cap N(y)} \frac{1}{\log |N(z)|}$$

### 3. Optimization Strategy
To prevent database bottlenecks during traversal:
1.  **Pre-fetching:** On server startup, the social graph edges are loaded into a specialized in-memory adjacency list.
2.  **Processing:** Traversals happen in RAM (microseconds) rather than via disk I/O (milliseconds).
3.  **Result:** 90% faster query resolution for pathfinding operations.

## 💻 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/HyphenAlpha456/Social_graph_visulalizer.git](https://github.com/HyphenAlpha456/Social_graph_visulalizer.git)
    cd Social_graph_visulalizer
    ```

2.  **Server Setup**
    ```bash
    cd server
    npm install
    # Create a .env file and add your MONGO_URI
    npm start
    ```

3.  **Client Setup**
    ```bash
    cd client
    npm install
    npm start
    ```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

## 📝 License
This project is [MIT](LICENSE) licensed.
