import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface Theme {
  id: number;
  name: string;
}

export function BookForm() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Estados do formulário
  const [bookTitle, setBookTitle] = useState('');
  const [selectedThemeId, setSelectedThemeId] = useState('');
  const [selectedCycle, setSelectedCycle] = useState('');
  const [isSuggesting, setIsSuggesting] = useState(false);

  // Carregamento de dados com tratamento de erro real
  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3001/api/setup')
      .then((res) => {
        if (!res.ok) throw new Error("Erro na rede");
        return res.json();
      })
      .then((data) => {
        if (data.themes) {
          setThemes(data.themes);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar:", err);
        toast.error("Erro ao conectar com o servidor. Verifique se o backend está on.");
        setLoading(false);
      });
  }, []);

  const suggestTitle = () => {
    if (!selectedThemeId || !selectedCycle) {
      toast.warn("Escolha um tema e ciclo primeiro!");
      return;
    }
    setIsSuggesting(true);
    // Simula a IA
    setTimeout(() => {
      const themeName = themes.find(t => String(t.id) === selectedThemeId)?.name || "Aventura";
      setBookTitle(`${themeName}: Jornada do Saber - ${selectedCycle}`);
      setIsSuggesting(false);
      toast.success("Título sugerido!");
    }, 600);
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-12 space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p className="text-slate-500 font-medium animate-pulse">Carregando temas...</p>
    </div>
  );

  const isFormValid = bookTitle !== '' && selectedThemeId !== '' && selectedCycle !== '';

  return (
    <div className="space-y-6">
      {/* Título do Livro */}
      <div className="space-y-2">
        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
          Título da Obra
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            className="grow bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-700 font-medium"
            placeholder="Ex: O Pequeno Explorador"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
          />
          <button
            type="button"
            onClick={suggestTitle}
            disabled={isSuggesting}
            className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-5 rounded-2xl border-2 border-blue-100 transition-all flex items-center justify-center active:scale-95"
          >
            <span className={isSuggesting ? 'animate-spin' : ''}>✨</span>
          </button>
        </div>
      </div>

      {/* Select de Temas (Garantindo o carregamento) */}
      <div className="space-y-2">
        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
          Tema Paradidático
        </label>
        <div className="relative">
          <select
            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 focus:border-blue-500 focus:bg-white outline-none appearance-none cursor-pointer text-slate-600 font-medium"
            value={selectedThemeId}
            onChange={(e) => setSelectedThemeId(e.target.value)}
          >
            <option value="">Selecione um tema...</option>
            {themes.map((t) => (
              <option key={t.id} value={String(t.id)}>{t.name}</option>
            ))}
          </select>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">▼</div>
        </div>
      </div>

      {/* Ciclos */}
      <div className="space-y-4">
        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">
          Público-Alvo
        </label>
        <div className="grid grid-cols-2 gap-4">
          {['Fundamental 1', 'Fundamental 2'].map((cycle) => (
            <button
              key={cycle}
              type="button"
              onClick={() => setSelectedCycle(cycle)}
              className={`py-4 rounded-2xl font-bold transition-all border-2 text-[11px] uppercase tracking-wider ${
                selectedCycle === cycle 
                ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100' 
                : 'bg-white border-slate-100 text-slate-400 hover:border-blue-200'
              }`}
            >
              {cycle}
            </button>
          ))}
        </div>
      </div>

      {/* Botão de Geração */}
      <button
        type="button"
        disabled={!isFormValid}
        className={`w-full py-5 rounded-2xl font-black text-white tracking-[0.2em] text-sm uppercase transition-all mt-6 ${
          isFormValid 
          ? 'bg-[#0f172a] hover:bg-black shadow-xl active:scale-[0.98]' 
          : 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none'
        }`}
      >
        Gerar Livro Agora
      </button>
    </div>
  );
}