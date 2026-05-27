import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { reservasVelorio, salasVelorio, defuntos, responsaveis } from '@/data/store';
import { Plus, CalendarClock } from 'lucide-react';

function formatDateTime(d: string) {
  return new Date(d).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
}

const statusColors: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  agendado: 'default',
  em_curso: 'outline',
  finalizado: 'secondary',
  cancelado: 'destructive',
};

export default function AdminVelorio() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-semibold text-foreground">Reserva de Velório</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="w-4 h-4 mr-1" /> Nova Reserva</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-display">Agendar Velório</DialogTitle>
            </DialogHeader>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setDialogOpen(false); }}>
              <div className="space-y-2">
                <Label>Sala</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Selecione a sala" /></SelectTrigger>
                  <SelectContent>
                    {salasVelorio.map(s => (
                      <SelectItem key={s.id_sala} value={String(s.id_sala)}>
                        {s.nome_sala} (Cap. {s.capacidade_maxima})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Início Previsto</Label>
                  <Input type="datetime-local" />
                </div>
                <div className="space-y-2">
                  <Label>Fim Previsto</Label>
                  <Input type="datetime-local" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                O sistema validará conflitos de horário na mesma sala automaticamente.
              </p>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" type="button" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                <Button type="submit">Reservar</Button>
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
                <TableHead>Sala</TableHead>
                <TableHead>Início</TableHead>
                <TableHead>Fim</TableHead>
                <TableHead>Defunto</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservasVelorio.map(r => {
                const sala = salasVelorio.find(s => s.id_sala === r.id_sala);
                const defunto = defuntos.find(d => d.id_defunto === r.id_defunto);
                return (
                  <TableRow key={r.id_reserva}>
                    <TableCell className="font-medium">{sala?.nome_sala ?? '—'}</TableCell>
                    <TableCell>{formatDateTime(r.inicio_previsto)}</TableCell>
                    <TableCell>{formatDateTime(r.fim_previsto)}</TableCell>
                    <TableCell>{defunto?.nome ?? '—'}</TableCell>
                    <TableCell>
                      <Badge variant={statusColors[r.status] ?? 'secondary'}>
                        {r.status.replace('_', ' ')}
                      </Badge>
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
