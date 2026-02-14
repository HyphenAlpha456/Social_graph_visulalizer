import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FaRoute, FaSearch } from 'react-icons/fa';
import { fetchPath } from '../../services/api'; 
import AnimatedCard from '../ui/AnimatedCard';
import SectionHeader from '../ui/SectionHeader';
import { useGraph } from '../../context/Temp_GraphContext';

const ConnectionTracer = ({ users }) => {
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const { setPathResult, setLoading } = useGraph();

    const handleTrace = async (e) => {
        
        e.preventDefault(); 

        console.log("1. Button Clicked!");
        console.log("Start ID:", start);
        console.log("End ID:", end);

        if (!start || !end) {
            console.warn("STOPPING: You haven't selected both users.");
            alert("Please select both a Start User and a Target User.");
            return;
        }

        console.log("2. Sending API Request...");
        setLoading(true);
        setPathResult(null);

        try {
            const { data } = await fetchPath(start, end);
            console.log("3. API Success! Data received:", data);
            setPathResult(data);
        } catch (error) {
            console.error("3. API Failed:", error);
            alert("No connection found (or Backend Error). Check Console for details.");
            setPathResult(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatedCard>
            <SectionHeader title="Connection Tracer" icon={FaRoute} />
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label className="text-secondary small">Source User</Form.Label>
                   
                    <Form.Select 
                        className="bg-dark text-light border-secondary" 
                        onChange={e => {
                            console.log("Start changed to:", e.target.value);
                            setStart(e.target.value);
                        }}
                    >
                        <option value="">Select Start...</option>
                        {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
                    </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-4">
                     <Form.Label className="text-secondary small">Target User</Form.Label>
                    <Form.Select 
                        className="bg-dark text-light border-secondary" 
                        onChange={e => {
                            console.log("End changed to:", e.target.value);
                            setEnd(e.target.value);
                        }}
                    >
                        <option value="">Select Target...</option>
                        {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
                    </Form.Select>
                </Form.Group>

                
                <Button 
                    variant="info" 
                    className="w-100 fw-bold" 
                    onClick={handleTrace}
                    type="button" 
                >
                    <FaSearch className="me-2" /> Trace Path
                </Button>
            </Form>
        </AnimatedCard>
    );
};

export default ConnectionTracer;