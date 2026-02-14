import React, { useEffect, useState } from 'react';
import { Badge, Button } from 'react-bootstrap';
import { FaUserPlus, FaLightbulb } from 'react-icons/fa';
import { fetchRecommendations, addFriend } from '../../services/api';
import AnimatedCard from '../ui/AnimatedCard';
import SectionHeader from '../ui/SectionHeader';
import Loader from '../ui/Loader';

const RecommendationList = ({ selectedUser }) => {
    const [recs, setRecs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedUser) {
            setLoading(true);
            fetchRecommendations(selectedUser._id)
                .then(res => setRecs(res.data))
                .finally(() => setLoading(false));
        }
    }, [selectedUser]);

    const handleAdd = async (friendId) => {
        await addFriend(selectedUser._id, friendId);
       
        setRecs(prev => prev.filter(r => r._id !== friendId));
    };

    if (!selectedUser) {
        return (
            <AnimatedCard>
                <div className="text-center text-muted py-4">
                    <FaLightbulb className="mb-2 fs-3" />
                    <p>Select a node on the graph to see friend recommendations.</p>
                </div>
            </AnimatedCard>
        );
    }

    return (
        <AnimatedCard delay={0.2}>
            <SectionHeader title={`Suggestions for ${selectedUser.name}`} icon={FaUserPlus} />
            <p className="text-muted small mb-4">Ranked by <strong>Adamic-Adar Index</strong>.</p>
            
            {loading ? <Loader /> : (
                <div className="d-flex flex-column gap-3">
                    {recs.length === 0 && <p className="text-muted text-center">No new recommendations.</p>}
                    
                    {recs.map((user, idx) => (
                        <div key={user._id} className="d-flex align-items-center justify-content-between p-2 border-bottom border-secondary">
                            <div>
                                <h6 className="mb-0 text-light">{user.name}</h6>
                                <small className="text-info">{user.role}</small>
                            </div>
                            <div className="text-end">
                                <Badge bg="warning" text="dark" className="mb-2 d-block">Score: {user.score.toFixed(2)}</Badge>
                                <Button size="sm" variant="outline-light" onClick={() => handleAdd(user._id)}>
                                    <FaUserPlus />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AnimatedCard>
    );
};

export default RecommendationList;