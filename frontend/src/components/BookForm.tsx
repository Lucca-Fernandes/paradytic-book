import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface Detail {
  cycle: string;
  themesPerVolume: string;
}

interface Theme {
  id: number;
  name: string;
  description: string;
  details: Detail[];
}

export function BookForm() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookTitle, setBookTitle] = useState('');
  const [selectedThemeId, setSelectedThemeId] = useState('');
  const [selectedCycle, setSelectedCycle] = useState('');
  const [isSuggesting, setIsSuggesting] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/api/setup')
      .then((res) => res.json())
      .then((data) => {
        setThemes(data.themes);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Erro ao carregar temas.");
        setLoading(false);
      });
  }, []);

  const suggestTitle = () => {
    if (!selectedThemeId || !selectedCycle) {
      toast.warn("Selecione o Tema e o Ciclo primeiro!");
      return;
    }

    setIsSuggesting(true);
    const theme = themes.find(t => t.id === Number(selectedThemeId));
    
    setTimeout(() => {
      const suggestions: Record<string, string[]> = {
        "Educação Financeira": ["Meu Primeiro Cofre", "Moedas Inteligentes"],
        "Socioemocional": ["Coração de Gigante", "O Mapa da Amizade"],
        "Educação Digital": ["Cyber Heróis", "Mundo em Bits"],
      };

      const themeSuggestions = suggestions[theme?.name || ""] || ["Jornada Criativa"];
      const randomTitle = themeSuggestions[Math.floor(Math.random() * themeSuggestions.length)];
      
      setBookTitle(`${randomTitle} - ${selectedCycle}`);
      setIsSuggesting(false);
      toast.success("IA sugeriu um novo título!");
    }, 800);
  };

  const handleSubmit = () => {
    toast.info("Iniciando motor de IA... Gerando conteúdo.");
    console.log("Payload:", { bookTitle, selectedThemeId, selectedCycle });
  };

  if (loading) return (
    <div className="flex justify-center p-10">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );

  const isFormValid = !!(bookTitle && selectedThemeId && selectedCycle);

  return (
    <div className="space-y-6">
      <div className="relative">
        <label className="block text-xs font-black text-slate-500 mb-2 ml-1 uppercase tracking-[0.2em]">
          Título do Livro
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            className="grow bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 focus:border-blue-500 focus:bg-white outline-none transition-all"
            placeholder="Ex: O Pequeno Investidor"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
          />
          <button
            type="button"
            onClick={suggestTitle}
            disabled={isSuggesting}
            className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-5 rounded-2xl border-2 border-blue-100 transition-all flex items-center justify-center"
          >
            <span className={isSuggesting ? 'animate-spin' : ''}>✨</span>
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-black text-slate-500 mb-2 ml-1 uppercase tracking-[0.2em]">
          Tema da Coleção
        </label>
        <select
          className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 focus:border-blue-500 focus:bg-white outline-none appearance-none cursor-pointer"
          value={selectedThemeId}
          onChange={(e) => setSelectedThemeId(e.target.value)}
        >
          <option value="">Selecione um tema...</option>
          {themes.map((t) => (
            <option key={t.id} value={String(t.id)}>{t.name}</option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        <label className="block text-xs font-black text-slate-500 mb-2 ml-1 text-center uppercase tracking-[0.2em]">
          Ciclo de Ensino
        </label>
        <div className="grid grid-cols-2 gap-4">
          {['Fundamental 1', 'Fundamental 2'].map((cycle) => (
            <button
              key={cycle}
              type="button"
              onClick={() => setSelectedCycle(cycle)}
              className={`py-4 rounded-2xl font-bold transition-all border-2 text-xs uppercase tracking-widest ${
                selectedCycle === cycle 
                ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' 
                : 'bg-white border-slate-50 text-slate-400 hover:border-blue-200'
              }`}
            >
              {cycle}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        disabled={!isFormValid}
        onClick={handleSubmit}
        className={`w-full py-5 rounded-2xl font-black text-white tracking-[0.3em] uppercase transition-all mt-6 ${
          isFormValid ? 'bg-slate-900 hover:bg-black shadow-2xl' : 'bg-slate-200 cursor-not-allowed'
        }`}
      >
        Gerar Livro Agora
      </button>
    </div>
  );
}