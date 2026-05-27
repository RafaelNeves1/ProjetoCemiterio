import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { defuntos, jazigos, getJazigoById, getFotoById, getMensagemById, enderecos } from '@/data/store';
import { Plus, Pencil, Trash2 } from 'lucide-react';

function formatDate(d: string | null) {
  if (!d) return '—';
  return new Date(d + 'T00:00:00').toLocaleDateString('pt-BR');
}

export default function AdminDefuntos() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const jazigoDisponiveis = jazigos.filter(j => j.status !== 'ocupado' || true);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-semibold text-foreground">Gestão de Sepultamentos</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="w-4 h-4 mr-1" /> Novo Registro</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-display">Cadastrar Defunto</DialogTitle>
            </DialogHeader>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setDialogOpen(false); }}>
              <div className="space-y-2">
                <Label>Nome completo</Label>
                <Input placeholder="Nome do falecido" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Data de Nascimento</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Data de Óbito</Label>
                  <Input type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Jazigo</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Selecione o jazigo" /></SelectTrigger>
                  <SelectContent>
                    {jazigos.map(j => {
                      const end = enderecos.find(e => e.id_endereco === j.id_endereco);
                      return (
                        <SelectItem key={j.id_jazigo} value={String(j.id_jazigo)}>
                          Jazigo #{j.id_jazigo} — {end?.rua}, Q.{end?.quadra} ({j.status})
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              <p className="text-xs text-muted-foreground">
                Ao vincular um defunto, o status do jazigo será atualizado para "ocupado" automaticamente.
              </p>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" type="button" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                <Button type="submit">Cadastrar</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden sm:table-cell">Nascimento</TableHead>
                <TableHead>Óbito</TableHead>
                <TableHead className="hidden md:table-cell">Localização</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-20">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {defuntos.map(d => {
                const jazigo = d.id_jazigo ? getJazigoById(d.id_jazigo) : null;
                return (
                  <TableRow key={d.id_defunto}>
                    <TableCell className="font-medium">{d.nome}</TableCell>
                    <TableCell className="hidden sm:table-cell">{formatDate(d.data_nascimento)}</TableCell>
                    <TableCell>{formatDate(d.data_obito)}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                      {jazigo?.endereco
                        ? `${jazigo.endereco.rua}, Nº${jazigo.endereco.numero} — Q.${jazigo.endereco.quadra}`
                        : '—'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={jazigo ? 'default' : 'secondary'}>
                        {jazigo ? 'Sepultado' : 'Sem jazigo'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </TableCell>
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
