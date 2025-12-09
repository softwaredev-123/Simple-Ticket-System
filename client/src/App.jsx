import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import EventList from './pages/EventList';
import CreateEvent from './pages/CreateEvent';
import MyOrders from './pages/MyOrders';

const Navigation = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                STS
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-700 font-medium">Hello, {user.email}</span>
                <Link to="/my-orders" className="text-gray-600 hover:text-indigo-600 font-medium transition duration-150 ease-in-out">
                  My Orders
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin/create" className="text-indigo-600 hover:text-indigo-800 font-medium transition duration-150 ease-in-out">
                    Create Event
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md transition duration-150 ease-in-out transform hover:scale-105">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navigation />
          <Routes>
            <Route path="/" element={<EventList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/admin/create" element={<CreateEvent />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
