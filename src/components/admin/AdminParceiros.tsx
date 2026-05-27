import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { parceiros, ordensServico, jazigos, enderecos } from '@/data/store';
import { Plus, Pencil } from 'lucide-react';

const catColors: Record<string, 'default' | 'secondary' | 'outline'> = {
  Marmoraria: 'default',
  Floricultura: 'secondary',
  Funeraria: 'outline',
  Seguradora: 'secondary',
  Outros: 'outline',
};

export default function AdminParceiros() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-semibold text-foreground">Parceiros & Ordens de Serviço</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="w-4 h-4 mr-1" /> Novo Parceiro</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-display">Cadastrar Parceiro</DialogTitle>
            </DialogHeader>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setDialogOpen(false); }}>
              <div className="space-y-2">
                <Label>Nome Fantasia</Label>
                <Input placeholder="Nome da empresa" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>CNPJ</Label>
                  <Input placeholder="00.000.000/0000-00" />
                </div>
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Categoria" /></SelectTrigger>
                    <SelectContent>
                      {['Floricultura', 'Marmoraria', 'Funeraria', 'Seguradora', 'Outros'].map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Contato</Label>
                  <Input placeholder="Nome do contato" />
                </div>
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input placeholder="(00) 00000-0000" />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" type="button" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                <Button type="submit">Cadastrar</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Partners list */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {parceiros.map(p => (
          <Card key={p.id_parceiro}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-sm">{p.nome_fantasia}</h3>
                <Badge variant={catColors[p.categoria] ?? 'secondary'}>{p.categoria}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">{p.contato_nome} · {p.telefone}</p>
              <p className="text-xs text-muted-foreground mt-1">CNPJ: {p.cnpj}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Service orders */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>OS #</TableHead>
                <TableHead>Parceiro</TableHead>
                <TableHead className="hidden sm:table-cell">Descrição</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ordensServico.map(os => {
                const parceiro = parceiros.find(p => p.id_parceiro === os.id_parceiro);
                return (
                  <TableRow key={os.id_os}>
                    <TableCell className="font-medium">#{os.id_os}</TableCell>
                    <TableCell>{parceiro?.nome_fantasia ?? '—'}</TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground max-w-xs truncate">
                      {os.descricao_servico}
                    </TableCell>
                    <TableCell>{os.data_servico ? new Date(os.data_servico + 'T00:00:00').toLocaleDateString('pt-BR') : '—'}</TableCell>
                    <TableCell>R$ {os.valor_custo?.toFixed(2) ?? '—'}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
