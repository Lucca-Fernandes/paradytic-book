import { BookForm } from './components/BookForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './App.css';

function App() {
  return (
   <div className="min-h-screen bg-[#FFFDF5] flex items-center justify-center p-6 font-sans">
  {/* O fundo amarelado bem suave (Papel) ajuda no clima educativo */}
  <div className="w-full max-w-xl">
    <h1 className="text-center mb-8 text-3xl font-black text-purple-900 italic">
      🎒 Paradytic <span className="text-amber-500">Bookshelf</span>
    </h1>
    <main className="bg-white rounded-[40px] shadow-[0_20px_50px_rgba(255,191,0,0.1)] p-10 border-2 border-amber-50">
       <BookForm />
    </main>
  
        
        <ToastContainer 
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        <footer className="text-center mt-10 text-slate-300 text-[10px] font-bold tracking-[0.3em] uppercase">
          Build 2026 • Paradytic Editora
        </footer>
      </div>
    </div>
  );
}

export default App;