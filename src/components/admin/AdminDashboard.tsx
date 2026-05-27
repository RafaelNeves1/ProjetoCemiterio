import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { jazigos, defuntos, manutencoes, reservasVelorio, salasVelorio } from '@/data/store';
import { Landmark, Users, AlertTriangle, CalendarClock } from 'lucide-react';

export default function AdminDashboard() {
  const totalJazigos = jazigos.length;
  const ocupados = jazigos.filter(j => j.status === 'ocupado').length;
  const disponiveis = jazigos.filter(j => j.status === 'disponivel').length;
  const reservados = jazigos.filter(j => j.status === 'reservado').length;
  const atrasos = manutencoes.filter(m => m.data_pagamento === null).length;
  const reservasAtivas = reservasVelorio.filter(r => r.status === 'agendado' || r.status === 'em_curso').length;

  const stats = [
    { label: 'Jazigos Ocupados', value: `${ocupados}/${totalJazigos}`, icon: Landmark, pct: Math.round((ocupados / totalJazigos) * 100) },
    { label: 'Total de Sepultados', value: defuntos.length, icon: Users },
    { label: 'Manutenções em Atraso', value: atrasos, icon: AlertTriangle, alert: atrasos > 0 },
    { label: 'Reservas de Velório', value: reservasAtivas, icon: CalendarClock },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-display font-semibold text-foreground">Painel de Gestão</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className={`text-2xl font-semibold mt-1 ${s.alert ? 'text-destructive' : 'text-foreground'}`}>
                    {s.value}
                  </p>
                  {s.pct !== undefined && (
                    <p className="text-xs text-muted-foreground mt-1">{s.pct}% de ocupação</p>
                  )}
                </div>
                <div className={`p-2 rounded-md ${s.alert ? 'bg-destructive/10' : 'bg-muted'}`}>
                  <s.icon className={`w-5 h-5 ${s.alert ? 'text-destructive' : 'text-muted-foreground'}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Occupancy breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-display">Ocupação de Jazigos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-3">
            <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden flex">
              <div className="bg-primary h-full" style={{ width: `${(ocupados / totalJazigos) * 100}%` }} />
              <div className="bg-accent h-full" style={{ width: `${(reservados / totalJazigos) * 100}%` }} />
            </div>
          </div>
          <div className="flex gap-4 text-sm">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-primary" /> Ocupados ({ocupados})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-accent" /> Reservados ({reservados})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-muted border" /> Disponíveis ({disponiveis})
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Wake rooms */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-display">Salas de Velório</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {salasVelorio.map(sala => {
              const reserva = reservasVelorio.find(
                r => r.id_sala === sala.id_sala && (r.status === 'agendado' || r.status === 'em_curso')
              );
              return (
                <div key={sala.id_sala} className="border rounded-md p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{sala.nome_sala}</span>
                    <Badge variant={reserva ? 'default' : 'secondary'}>
                      {reserva ? reserva.status === 'em_curso' ? 'Em uso' : 'Reservada' : 'Livre'}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Cap. {sala.capacidade_maxima} · R$ {sala.valor_aluguel_hora?.toFixed(2)}/h
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
