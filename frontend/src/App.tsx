import { Header } from './components/Header';
import { BookForm } from './components/BookForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-xl">
        <Header />
        <main className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-8">
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