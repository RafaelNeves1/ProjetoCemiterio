export interface Endereco {
  id_endereco: number;
  quadra: string;
  rua: string;
  lado: string | null;
  numero: number | null;
  latitude?: number;
  longitude?: number;
}

export interface Jazigo {
  id_jazigo: number;
  id_endereco: number;
  status: 'disponivel' | 'ocupado' | 'reservado';
  endereco?: Endereco;
}

export interface Foto {
  id_foto: number;
  url_imagem: string;
}

export interface Mensagem {
  id_mensagem: number;
  conteudo: string;
}

export interface Responsavel {
  id_responsavel: number;
  nome: string;
  cpf: string;
  telefone: string | null;
  endereco_residencial: string | null;
}

export interface Defunto {
  id_defunto: number;
  nome: string;
  data_nascimento: string | null;
  data_obito: string;
  id_jazigo: number | null;
  id_foto: number | null;
  id_mensagem: number | null;
  jazigo?: Jazigo;
  foto?: Foto;
  mensagem?: Mensagem;
}

export interface Concessao {
  id_concessao: number;
  id_responsavel: number;
  id_jazigo: number;
  data_inicio: string;
  tipo_concessao: 'perpetua' | 'temporaria';
  responsavel?: Responsavel;
  jazigo?: Jazigo;
}

export interface Manutencao {
  id_manutencao: number;
  id_jazigo: number;
  data_pagamento: string | null;
  valor: number | null;
  proximo_vencimento: string | null;
  jazigo?: Jazigo;
}

export interface Parceiro {
  id_parceiro: number;
  nome_fantasia: string;
  cnpj: string | null;
  categoria: 'Floricultura' | 'Marmoraria' | 'Funeraria' | 'Seguradora' | 'Outros';
  contato_nome: string | null;
  telefone: string | null;
}

export interface OrdemServico {
  id_os: number;
  id_jazigo: number;
  id_parceiro: number;
  descricao_servico: string | null;
  data_servico: string | null;
  valor_custo: number | null;
  parceiro?: Parceiro;
  jazigo?: Jazigo;
}

export interface SalaVelorio {
  id_sala: number;
  nome_sala: string;
  capacidade_maxima: number | null;
  valor_aluguel_hora: number | null;
}

export interface ReservaVelorio {
  id_reserva: number;
  id_sala: number;
  id_defunto: number;
  id_responsavel: number;
  inicio_previsto: string;
  fim_previsto: string;
  status: 'agendado' | 'em_curso' | 'finalizado' | 'cancelado';
  sala?: SalaVelorio;
  defunto?: Defunto;
  responsavel?: Responsavel;
}
