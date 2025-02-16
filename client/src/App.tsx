import { BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import './App.css';
import Hero from './components/Homepage/Hero';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import AccountConfirmation from './components/Auth/AccountValidation/AccountValidation';
import ResetPassword from './components/Auth/ResetPassword/ResetPassword';
import CssBaseline from '@mui/material/CssBaseline';
import GenericDialog from './components/Dialog/GenericDialog';
import Divider  from '@mui/material/Divider';
import DashboardLayoutBranding from './components/Dashboard/Dashboard';
import ProtectedRoute from './components/Protected/ProtectedRoute';
import NotFoundPage from './components/NotFound/NotFoundPage';


function App() {
    return (
        <Router>
            <CssBaseline />
            <GenericDialog
                dialogTitle="Your session is about to expire in 40 seconds." 
                dialogSubtitle={'Would you like to extend it?'}
                dialogActions="extend-session">
                <Divider />
            </GenericDialog>
            <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/user/verify-email" element={<AccountConfirmation />} />
                <Route path="/user/forgot-password" element={<ResetPassword />} />
                <Route path="/user/register" element={<Register />} />
                <Route path="/user/login" element={<Login />} />
                <Route path="/" element={<ProtectedRoute />} >
                    <Route path="dashboard" element={<DashboardLayoutBranding />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} /> 
            </Routes>
        </Router>
)};

export default App;