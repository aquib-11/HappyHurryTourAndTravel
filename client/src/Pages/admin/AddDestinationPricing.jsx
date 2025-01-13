import React, { useState, useEffect } from 'react';
import customFetch from '../../utils/customFetch';

const AddDestinationPricing = () => {
    const [route, setRoute] = useState('');
    const [cabType, setCabType] = useState('');
    const [price, setPrice] = useState('');
    const [cabTypes, setCabTypes] = useState([]); 

    useEffect(() => {
        const fetchCabTypes = async () => {
            const response = await customFetch.get('/cab'); 
            setCabTypes(response.data.cabs); 
        };
        fetchCabTypes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await customFetch.post('/cabPricing', {
                route,
                pricing: [{ cabType, price }]
            });
            // Reset form fields after submission
            setRoute('');
            setCabType('');
            setPrice('');
            alert('Destination pricing added successfully!');
        } catch (error) {
            console.error('Error adding destination pricing:', error);
            alert('Failed to add destination pricing.');
        }
    };

    return (
        <div className="space-y-4">
      <h3 className="text-center">Add Cab Pricing</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Route:</label>
                    <input
                        type="text"
                        value={route}
                        onChange={(e) => setRoute(e.target.value)}
                        required
                        className="inputText"
                    />
                </div>
                <div>
                    <label>Cab Type:</label>
                    <select
                        value={cabType}
                        onChange={(e) => setCabType(e.target.value)}
                        required
                        className="inputText"
                    >
                        <option value="">Select Cab Type</option>
                        {cabTypes.map((cab) => (
                            <option key={cab._id} value={cab._id}>
                                {cab.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="inputText"
                    />
                </div>
                <button type="submit">Add Pricing</button>
            </form>
        </div>
    );
};

export default AddDestinationPricing;