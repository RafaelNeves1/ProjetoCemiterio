import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { concessoes, responsaveis, jazigos, enderecos, defuntos } from '@/data/store';

function formatDate(d: string | null) {
  if (!d) return '—';
  return new Date(d + 'T00:00:00').toLocaleDateString('pt-BR');
}

export default function AdminConcessoes() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-display font-semibold text-foreground">Concessões</h2>
      <p className="text-sm text-muted-foreground -mt-3">
        Jazigos podem ter responsáveis via concessão mesmo sem defuntos vinculados (compra preventiva).
      </p>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Responsável</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Jazigo</TableHead>
                <TableHead className="hidden md:table-cell">Localização</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Início</TableHead>
                <TableHead>Sepultado?</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {concessoes.map(c => {
                const resp = responsaveis.find(r => r.id_responsavel === c.id_responsavel);
                const jazigo = jazigos.find(j => j.id_jazigo === c.id_jazigo);
                const end = jazigo ? enderecos.find(e => e.id_endereco === jazigo.id_endereco) : null;
                const temDefunto = defuntos.some(d => d.id_jazigo === c.id_jazigo);

                return (
                  <TableRow key={c.id_concessao}>
                    <TableCell className="font-medium">{resp?.nome ?? '—'}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{resp?.cpf}</TableCell>
                    <TableCell>#{c.id_jazigo}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      {end ? `${end.rua}, Q.${end.quadra}` : '—'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={c.tipo_concessao === 'perpetua' ? 'default' : 'outline'}>
                        {c.tipo_concessao}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(c.data_inicio)}</TableCell>
                    <TableCell>
                      <Badge variant={temDefunto ? 'secondary' : 'outline'}>
                        {temDefunto ? 'Sim' : 'Vazio'}
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
