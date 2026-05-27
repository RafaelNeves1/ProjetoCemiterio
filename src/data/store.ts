import { Endereco, Jazigo, Foto, Mensagem, Responsavel, Defunto, Concessao, Manutencao, Parceiro, OrdemServico, SalaVelorio, ReservaVelorio } from './types';

// Mock data based on the SQL schema

export const enderecos: Endereco[] = [
  { id_endereco: 1, quadra: 'A', rua: 'Alameda das Acácias', lado: 'Esquerdo', numero: 10, latitude: -20.748882420149734, longitude: -48.915706903325955},
  { id_endereco: 2, quadra: 'A', rua: 'Alameda das Acácias', lado: 'Direito', numero: 12, latitude: -20.748882420149734, longitude: -48.915706903325955 },
  { id_endereco: 3, quadra: 'B', rua: 'Rua dos Lírios', lado: 'Esquerdo', numero: 5, latitude: -20.748882420149734, longitude: -48.915706903325955 },
  { id_endereco: 4, quadra: 'B', rua: 'Rua dos Lírios', lado: 'Direito', numero: 8, latitude: -20.748882420149734, longitude: -48.915706903325955 },
  { id_endereco: 5, quadra: 'C', rua: 'Alameda da Saudade', lado: 'Esquerdo', numero: 1, latitude: -20.748882420149734, longitude: -48.915706903325955 },
  { id_endereco: 6, quadra: 'C', rua: 'Alameda da Saudade', lado: 'Direito', numero: 3, latitude: -20.748882420149734, longitude: -48.915706903325955 },
];


export const jazigos: Jazigo[] = [
  { id_jazigo: 1, id_endereco: 1, status: 'ocupado' },
  { id_jazigo: 2, id_endereco: 2, status: 'reservado' },
  { id_jazigo: 3, id_endereco: 3, status: 'ocupado' },
  { id_jazigo: 4, id_endereco: 4, status: 'disponivel' },
  { id_jazigo: 5, id_endereco: 5, status: 'ocupado' },
  { id_jazigo: 6, id_endereco: 6, status: 'disponivel' },
];

export const fotos: Foto[] = [
  { id_foto: 1, url_imagem: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face' },
  { id_foto: 2, url_imagem: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face' },
  {id_foto: 3, url_imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEvkmAZ8QApuqRDxzli84E7mbQwXmTSjHhRQ&s' },
];

export const mensagens: Mensagem[] = [
  { id_mensagem: 1, conteudo: 'Sempre em nossos corações. Seu legado de amor e sabedoria vive em cada um de nós. Descanse em paz.' },
  { id_mensagem: 2, conteudo: 'Uma vida dedicada ao próximo. Sua bondade tocou todos que tiveram a honra de conhecê-la.' },
  { id_mensagem: 3, conteudo: 'Saudades eternas. O senhor nos ensinou o verdadeiro significado de família.' },
];

export const responsaveis: Responsavel[] = [
  { id_responsavel: 1, nome: 'Carlos Eduardo Silva', cpf: '12345678901', telefone: '17999998888', endereco_residencial: 'Rua da FATEC, 100, Olímpia' },
  { id_responsavel: 2, nome: 'Maria Aparecida Santos', cpf: '98765432100', telefone: '17988887777', endereco_residencial: 'Av. Brasil, 500, Olímpia' },
  { id_responsavel: 3, nome: 'João Paulo Ferreira', cpf: '11122233344', telefone: '17977776666', endereco_residencial: 'Rua São Paulo, 200, Olímpia' },
];

export const defuntos: Defunto[] = [
  { id_defunto: 1, nome: 'José da Silva', data_nascimento: '1950-05-20', data_obito: '2026-04-02', id_jazigo: 1, id_foto: 1, id_mensagem: 1 },
  { id_defunto: 2, nome: 'Ana Maria Oliveira', data_nascimento: '1935-11-15', data_obito: '2025-12-10', id_jazigo: 3, id_foto: 2, id_mensagem: 2 },
  { id_defunto: 3, nome: 'Francisco Pereira', data_nascimento: '1942-03-08', data_obito: '2026-01-20', id_jazigo: 5, id_foto: 3, id_mensagem: 3 },
];

export const concessoes: Concessao[] = [
  { id_concessao: 1, id_responsavel: 1, id_jazigo: 1, data_inicio: '2026-04-03', tipo_concessao: 'perpetua' },
  { id_concessao: 2, id_responsavel: 2, id_jazigo: 2, data_inicio: '2025-06-15', tipo_concessao: 'temporaria' },
  { id_concessao: 3, id_responsavel: 2, id_jazigo: 3, data_inicio: '2025-12-10', tipo_concessao: 'perpetua' },
  { id_concessao: 4, id_responsavel: 3, id_jazigo: 5, data_inicio: '2026-01-20', tipo_concessao: 'perpetua' },
];

export const manutencoes: Manutencao[] = [
  { id_manutencao: 1, id_jazigo: 1, data_pagamento: '2026-04-03', valor: 250.00, proximo_vencimento: '2027-04-03' },
  { id_manutencao: 2, id_jazigo: 3, data_pagamento: null, valor: 250.00, proximo_vencimento: '2026-06-10' },
  { id_manutencao: 3, id_jazigo: 5, data_pagamento: null, valor: 300.00, proximo_vencimento: '2026-03-20' },
];

export const parceiros: Parceiro[] = [
  { id_parceiro: 1, nome_fantasia: 'Marmoraria Rocha Eterna', cnpj: '12345678000199', categoria: 'Marmoraria', contato_nome: 'Ricardo', telefone: '1733334444' },
  { id_parceiro: 2, nome_fantasia: 'Floricultura Sempre Viva', cnpj: '98765432000188', categoria: 'Floricultura', contato_nome: 'Helena', telefone: '1722223333' },
  { id_parceiro: 3, nome_fantasia: 'Funerária Paz Celestial', cnpj: '55566677000100', categoria: 'Funeraria', contato_nome: 'Marcos', telefone: '1711112222' },
];

export const ordensServico: OrdemServico[] = [
  { id_os: 1, id_jazigo: 1, id_parceiro: 1, descricao_servico: 'Instalação de lápide de granito preto com gravação', data_servico: '2026-04-04', valor_custo: 1200.00 },
  { id_os: 2, id_jazigo: 3, id_parceiro: 2, descricao_servico: 'Arranjo floral permanente', data_servico: '2025-12-15', valor_custo: 350.00 },
];

export const salasVelorio: SalaVelorio[] = [
  { id_sala: 1, nome_sala: 'Sala Diamante', capacidade_maxima: 50, valor_aluguel_hora: 150.00 },
  { id_sala: 2, nome_sala: 'Sala Esmeralda', capacidade_maxima: 30, valor_aluguel_hora: 100.00 },
  { id_sala: 3, nome_sala: 'Sala Safira', capacidade_maxima: 80, valor_aluguel_hora: 200.00 },
];

export const reservasVelorio: ReservaVelorio[] = [
  { id_reserva: 1, id_sala: 1, id_defunto: 1, id_responsavel: 1, inicio_previsto: '2026-04-03T08:00:00', fim_previsto: '2026-04-03T16:00:00', status: 'finalizado' },
  { id_reserva: 2, id_sala: 2, id_defunto: 3, id_responsavel: 3, inicio_previsto: '2026-04-06T10:00:00', fim_previsto: '2026-04-06T18:00:00', status: 'agendado' },
];

// Helper functions to resolve relations
export function getEnderecoById(id: number) {
  return enderecos.find(e => e.id_endereco === id);
}

export function getJazigoById(id: number) {
  const j = jazigos.find(j => j.id_jazigo === id);
  if (j) return { ...j, endereco: getEnderecoById(j.id_endereco) };
  return undefined;
}

export function getFotoById(id: number | null) {
  if (!id) return undefined;
  return fotos.find(f => f.id_foto === id);
}

export function getMensagemById(id: number | null) {
  if (!id) return undefined;
  return mensagens.find(m => m.id_mensagem === id);
}

export function getDefuntoCompleto(d: Defunto): Defunto {
  return {
    ...d,
    jazigo: d.id_jazigo ? getJazigoById(d.id_jazigo) : undefined,
    foto: getFotoById(d.id_foto),
    mensagem: getMensagemById(d.id_mensagem),
  };
}

export function searchDefuntos(query: string): Defunto[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return defuntos
    .filter(d => d.nome && d.nome.toLowerCase().includes(q))
    .map(getDefuntoCompleto);
}

export function getResponsavelById(id: number) {
  return responsaveis.find(r => r.id_responsavel === id);
}

export function getParceiroBydId(id: number) {
  return parceiros.find(p => p.id_parceiro === id);
}
