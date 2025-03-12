import { BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import './App.css';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import AccountConfirmation from './components/Auth/AccountValidation/AccountValidation';
import ResetPassword from './components/Auth/ResetPassword/ResetPassword';
import CssBaseline from '@mui/material/CssBaseline';
import SessionModal from './components/Modals/SessionModal';
import Dashboard from './components/Dashboard/Dashboard';
import ProtectedRoute from './components/Protected/ProtectedRoute';
import NotFoundPage from './components/NotFound/NotFoundPage';
import Home from './components/Homepage/Homepage';

function App() {
    return (
        <Router>
            <CssBaseline />
            <SessionModal />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user/verify-email" element={<AccountConfirmation />} />
                <Route path="/user/forgot-password" element={<ResetPassword />} />
                <Route path="/user/register" element={<Register />} />
                <Route path="/user/login" element={<Login />} />
                
                {/* Protected Routes */}
                <Route path="/" element={<ProtectedRoute />}>
                    <Route path="dashboard/*" element={<Dashboard />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} /> 
            </Routes>
        </Router>
)};

export default App;