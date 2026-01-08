import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Reports from './components/Reports';
import Profile from './components/Profile';
import Insights from './components/Insights';
import Journal from './components/Journal';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Home from './components/Home';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path='/' element={ <Home /> } />
                    <Route path='/dashboard' element={ <Dashboard /> } />
                    <Route path='/journal' element={ <Journal /> } />
                    <Route path='/reports' element={ <Reports /> } />
                    <Route path='/insights' element={ <Insights /> } />
                    <Route path='/profile' element={ <Profile /> } />
                    <Route path='/signup' element={ <Signup /> } />
                    <Route path='/signin' element={ <Signin /> } />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
