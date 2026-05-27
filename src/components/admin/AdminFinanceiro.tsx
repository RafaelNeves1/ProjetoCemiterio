import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { manutencoes, getJazigoById } from '@/data/store';
import { AlertTriangle, CheckCircle } from 'lucide-react';

function formatDate(d: string | null) {
  if (!d) return '—';
  return new Date(d + 'T00:00:00').toLocaleDateString('pt-BR');
}

export default function AdminFinanceiro() {
  const today = new Date();

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-display font-semibold text-foreground">Módulo Financeiro</h2>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-display">Manutenções de Jazigos</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Jazigo</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Pagamento</TableHead>
                <TableHead>Próx. Vencimento</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {manutencoes.map(m => {
                const jazigo = getJazigoById(m.id_jazigo);
                const isPago = m.data_pagamento !== null;
                const venc = m.proximo_vencimento ? new Date(m.proximo_vencimento + 'T00:00:00') : null;
                const isAtrasado = !isPago && venc && venc < today;

                return (
                  <TableRow key={m.id_manutencao} className={isAtrasado ? 'bg-destructive/5' : ''}>
                    <TableCell className="font-medium">#{m.id_jazigo}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {jazigo?.endereco
                        ? `${jazigo.endereco.rua}, Q.${jazigo.endereco.quadra}`
                        : '—'}
                    </TableCell>
                    <TableCell>R$ {m.valor?.toFixed(2) ?? '—'}</TableCell>
                    <TableCell>{formatDate(m.data_pagamento)}</TableCell>
                    <TableCell>{formatDate(m.proximo_vencimento)}</TableCell>
                    <TableCell>
                      {isPago ? (
                        <Badge variant="secondary" className="gap-1">
                          <CheckCircle className="w-3 h-3" /> Pago
                        </Badge>
                      ) : isAtrasado ? (
                        <Badge variant="destructive" className="gap-1">
                          <AlertTriangle className="w-3 h-3" /> Atrasado
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="gap-1">Pendente</Badge>
                      )}
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
