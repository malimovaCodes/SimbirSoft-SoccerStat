import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './router/AppRoutes';
import { MainLayout } from './components/Layout/MainLayout';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;