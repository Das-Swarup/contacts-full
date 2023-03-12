import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ContactForm from './Components/ContactForm';
import ContactList from './Components/ContactList';
import Layout from './Components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route index element={<ContactForm/>}/>
          <Route path='all' element={<ContactList/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
