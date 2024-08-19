import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { ThemeProvider } from './components/theme-provider';
import Home from './pages/home/home';

const App = () => {
  return (
    <ThemeProvider defaultTheme='dark'>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
