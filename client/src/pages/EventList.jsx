import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    const fetchEvents = async () => {
        try {
            const response = await api.get('/events');
            // Fix: API returns { data: [...], message: ... }
            setEvents(response.data.data || []);
        } catch (error) {
            console.error("Error fetching events", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleBuyTicket = async (eventId) => {
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            await api.post('/orders', {
                eventId,
                quantity: 1
            });
            alert('Ticket Purchased Successfully!');
            fetchEvents();
        } catch (error) {
            console.error("Error buying ticket", error);
            alert(error.response?.data?.message || 'Failed to purchase ticket');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                        Upcoming <span className="text-indigo-600">Events</span>
                    </h1>
                    <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
                        Discover and book the best experiences in your city.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
                        >
                            <div className="flex-1 p-6 flex flex-col justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-indigo-600">
                                            {new Date(event.date_time).toLocaleDateString(undefined, {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${event.capacity > (event.tickets_sold || 0)
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                            }`}>
                                            {event.capacity > (event.tickets_sold || 0) ? 'Available' : 'Sold Out'}
                                        </span>
                                    </div>
                                    <a href="#" className="block mt-2">
                                        <p className="text-xl font-semibold text-gray-900">{event.title}</p>
                                        <p className="mt-3 text-base text-gray-500">{event.location}</p>
                                    </a>
                                </div>
                                <div className="mt-6 flex items-center justify-between">
                                    <div className="text-sm text-gray-500">
                                        <span className="font-medium text-gray-900">
                                            {event.capacity - (event.tickets_sold || 0)}
                                        </span>{' '}
                                        tickets left
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 bg-gray-50 border-t border-gray-100">
                                <button
                                    onClick={() => handleBuyTicket(event.id)}
                                    disabled={event.capacity <= (event.tickets_sold || 0)}
                                    className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                    ${event.capacity <= (event.tickets_sold || 0)
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                        } transition-colors duration-200`}
                                >
                                    {event.capacity <= (event.tickets_sold || 0) ? 'Sold Out' : 'Buy Ticket'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventList;
