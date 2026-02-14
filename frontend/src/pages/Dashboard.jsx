import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useGraph } from '../context/Temp_GraphContext';
import { fetchUsers } from '../services/api';
import AppNavbar from '../components/layout/AppNavbar';
import Footer from '../components/layout/Footer';
import GraphCanvas from '../components/graph/GraphCanvas';
import ConnectionTracer from '../components/panels/ConnectionTracer';
import RecommendationList from '../components/panels/RecommendationList';
import AnimatedCard from '../components/ui/AnimatedCard';
import SectionHeader from '../components/ui/SectionHeader';
import { FaNetworkWired } from 'react-icons/fa';

const Dashboard = () => {
    const { setGraphData, selectedNode, pathResult } = useGraph();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        
        fetchUsers().then(res => {
            const rawUsers = res.data;
            setUsers(rawUsers);
            
           
            const nodes = rawUsers.map(u => ({ ...u, id: u._id }));
            const links = [];
            
            
            rawUsers.forEach(u => {
                if (u.friends) {
                    u.friends.forEach(fId => {
                        
                        if (u._id < fId) { 
                            links.push({ source: u._id, target: fId });
                        }
                    });
                }
            });

            setGraphData({ nodes, links });
        });
    }, [setGraphData]);

    return (
        <div className="d-flex flex-column min-vh-100">
            <AppNavbar />
            
            <Container fluid className="px-4 flex-grow-1">
                <Row>
                    
                    <Col lg={3} className="mb-4">
                        <ConnectionTracer users={users} />
                        
                        
                        {pathResult && (
                            <AnimatedCard delay={0.2} className="border-warning">
                                <h6 className="text-warning mb-3">Path Found!</h6>
                                <div className="d-flex flex-wrap gap-2">
                                    {pathResult.map((u, i) => (
                                        <span key={u._id} className="text-light small">
                                            {i > 0 && <span className="text-muted mx-1">→</span>}
                                            {u.name}
                                        </span>
                                    ))}
                                </div>
                            </AnimatedCard>
                        )}
                    </Col>

                    
                    <Col lg={6} className="mb-4">
                        <AnimatedCard className="p-0 overflow-hidden h-100" delay={0.1}>
                             <div className="p-3 border-bottom border-secondary d-flex justify-content-between align-items-center">
                                <SectionHeader title="Network Visualization" icon={FaNetworkWired} />
                                <small className="text-muted">Interactive Force-Directed Graph</small>
                             </div>
                            <div className="graph-container" style={{ height: '65vh' }}>
                                <GraphCanvas />
                            </div>
                        </AnimatedCard>
                    </Col>

                    
                    <Col lg={3} className="mb-4">
                        <RecommendationList selectedUser={selectedNode} />
                        
                        <AnimatedCard delay={0.3}>
                            <h6 className="text-secondary">System Metrics</h6>
                            <div className="d-flex justify-content-between mb-1">
                                <small>Total Users</small>
                                <strong className="text-info">{users.length}</strong>
                            </div>
                            <div className="d-flex justify-content-between">
                                <small>Active Connections</small>
                                <strong className="text-info">
                                    {users.reduce((acc, u) => acc + (u.friends?.length || 0), 0) / 2}
                                </strong>
                            </div>
                        </AnimatedCard>
                    </Col>
                </Row>
            </Container>

            <Footer />
        </div>
    );
};

export default Dashboard;