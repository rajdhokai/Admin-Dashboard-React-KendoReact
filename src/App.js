import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SignIn } from './pages/SignIn.jsx';
import { SignUp } from './pages/SignUp.jsx';
import { Home } from './pages/Home.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { About } from './pages/About.jsx'
import { Products } from './pages/Products.jsx';
import { Settings } from './pages/Settings.jsx';
import { Account } from './components/settings/Account.jsx';
import Experience from './pages/Experince.jsx';
import Blog from './pages/Blog.jsx';

const App = () => {
    return ( 
        <div className="App">
            <Routes>
               <Route path="/" element={<SignIn/>}/>
               <Route path="/signup" element={<SignUp/>}/>
               <Route path="/home" element={<Home/>}>
               <Route path="/home/dashboard" element={<Dashboard/>}/>
               <Route path="/home/about" element={<About/>}/>
               <Route path="/home/blog" element={<Blog/>}/>
               <Route path="/home/experience" element={<Experience/>}/>
               <Route path="/home/products" element={<Products/>}/>
               <Route path="/home/settings" element={<Settings/>}/>
               <Route path="/home/account" element={<Account/>}/>
              </Route>
            </Routes>

        </div>
    );
}

export default App;
