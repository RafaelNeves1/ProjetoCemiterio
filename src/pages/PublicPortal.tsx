import { useState, lazy, Suspense } from 'react';
import { Search, MapPin, Calendar, MessageCircle, Map } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { searchDefuntos } from '@/data/store';
import { Defunto } from '@/data/types';
import { Link } from 'react-router-dom';
const CemeteryMap = lazy(() => import('@/components/CemeteryMap'));

function formatDate(dateStr: string | null) {
  if (!dateStr) return '—';
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('pt-BR');
}

export default function PublicPortal() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Defunto[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.trim().length >= 2) {
      try {
        const searchResults = searchDefuntos(value);
        setResults(searchResults);
        setHasSearched(true);
        // Reset selection on new search
        setSelectedId(null);
      } catch (error) {
        console.error("Erro na busca:", error);
        setResults([]);
        setHasSearched(true);
      }
    } else {
      setResults([]);
      setHasSearched(false);
      setSelectedId(null);
    }
  };

  const selectedDefunto = results.find(d => d.id_defunto === selectedId);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-bold">✦</span>
            </div>
            <h1 className="text-xl font-display font-semibold text-foreground">Memorial Eterno</h1>
          </div>
          <Link
            to="/admin"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Área Administrativa
          </Link>
        </div>
      </header>

      {/* Hero / Search */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-3">
            Encontre seu ente querido
          </h2>
          <p className="text-muted-foreground mb-8">
            Pesquise pelo nome para localizar o jazigo e ler a mensagem póstuma.
          </p>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Digite o nome do falecido..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-12 h-14 text-base rounded-lg border-border bg-card shadow-sm focus-visible:ring-accent"
            />
          </div>
        </div>
      </section>

      {/* Map - Only show when a card is selected */}
      {selectedDefunto && (
        <section className="pb-8 px-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Map className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-display font-semibold text-foreground">
                  Localização: <span className="text-accent">{selectedDefunto.nome}</span>
                </h3>
              </div>
              <button 
                onClick={() => setSelectedId(null)}
                className="text-xs text-muted-foreground hover:text-foreground underline"
              >
                Fechar mapa
              </button>
            </div>
            <Suspense fallback={<div className="h-[350px] flex items-center justify-center bg-muted rounded-lg">Carregando mapa...</div>}>
              <CemeteryMap 
                results={[selectedDefunto]} 
                className="h-[350px] rounded-lg overflow-hidden border border-border shadow-md" 
              />
            </Suspense>
          </div>
        </section>
      )}

      {/* Results */}
      <section className="pb-16 px-4">
        <div className="container mx-auto max-w-3xl space-y-4">
          {hasSearched && results.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              Nenhum resultado encontrado para "<span className="text-foreground font-medium">{query}</span>".
            </p>
          )}

          {results.map((d) => (
            <Card 
              key={d.id_defunto} 
              className={`animate-fade-in overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-md ${selectedId === d.id_defunto ? 'ring-2 ring-accent border-accent' : 'hover:border-accent/50'}`}
              onClick={() => setSelectedId(d.id_defunto)}
            >
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  {/* Photo */}
                  <div className="sm:w-40 h-40 sm:h-auto bg-muted flex items-center justify-center shrink-0">
                    {d.foto ? (
                      <img
                        src={d.foto.url_imagem}
                        alt={d.nome}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-4xl text-muted-foreground/40">✦</span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5 flex-1 space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-display font-semibold text-foreground">{d.nome}</h3>
                      <span className="text-[10px] uppercase tracking-wider bg-accent/10 text-accent px-2 py-0.5 rounded font-medium">
                        Ver no mapa
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {formatDate(d.data_nascimento)} — {formatDate(d.data_obito)}
                      </span>
                      {d.jazigo?.endereco && (
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          {d.jazigo.endereco.rua}, Nº {d.jazigo.endereco.numero} — Quadra {d.jazigo.endereco.quadra}, {d.jazigo.endereco.lado}
                        </span>
                      )}
                    </div>

                    {d.mensagem && (
                      <div className="bg-muted rounded-md p-3 mt-2">
                        <div className="flex items-start gap-2">
                          <MessageCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                          <p className="text-sm text-foreground italic leading-relaxed">
                            "{d.mensagem.conteudo}"
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        <p>Memorial Eterno © {new Date().getFullYear()} — Sistema de Gestão Cemiterial</p>
      </footer>
    </div>
  );
}
