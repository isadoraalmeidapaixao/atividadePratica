import { useEffect } from 'react';
import AppRoutes from './src/navigation/AppRoutes';
import { Database } from './src/database/Database';

export default function App() {

  useEffect(() => {
    try {
      Database.initialize();
      console.log('Banco inicializado com sucesso.');
    } catch (error) {
      console.log('Erro ao inicializar banco:', error);
    }
  }, []);

  return (
    <AppRoutes />
  );
}