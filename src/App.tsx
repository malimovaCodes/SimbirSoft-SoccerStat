import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './router/AppRoutes';
import { MainLayout } from './components/Layout/MainLayout';
import './App.css';

const routerBasename = 
  import.meta.env.BASE_URL !== '/' && import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL.slice(0, -1)
    : import.meta.env.BASE_URL

function App() {
  return (
    <BrowserRouter basename={routerBasename}>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;