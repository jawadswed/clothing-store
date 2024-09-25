import { Routes, Route } from 'react-router-dom';

import Home from './components/routes/home/home.component.jsx';
import Navigation from './components/routes/navigation/navigation.component.jsx';

const Shop = () => {
  return <h1>Shop Page</h1>
}

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} /> {/** index is used to set the default child route. instead of writing path='home' we can use index */}
        <Route path="shop" element={<Shop />} />
      </Route>
    </Routes>

  );
}

export default App;
