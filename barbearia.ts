// Sistema de Agendamento para Barbearia
interface Servico {
  nome: string;
  duracao: number; // em minutos
  preco: number;
}

interface Agendamento {
  id: string;
  cliente: string;
  telefone: string;
  servico: Servico;
  data: Date;
  barbeiro: string;
}

class Barbearia {
  private agendamentos: Agendamento[] = [];
  private servicos: Servico[] = [
    { nome: 'Corte Simples', duracao: 30, preco: 25.00 },
    { nome: 'Corte + Barba', duracao: 45, preco: 35.00 },
    { nome: 'Corte + Barba + Sobrancelha', duracao: 60, preco: 45.00 },
    { nome: 'Apenas Barba', duracao: 20, preco: 15.00 }
  ];

  listarServicos(): Servico[] {
    return this.servicos;
  }

  agendar(cliente: string, telefone: string, servicoNome: string, data: Date, barbeiro: string): string {
    const servico = this.servicos.find(s => s.nome === servicoNome);
    
    if (!servico) {
      return 'Serviço não encontrado';
    }

    // Verificar se o horário está disponível
    if (this.verificarDisponibilidade(data, barbeiro, servico.duracao)) {
      const id = this.gerarId();
      const novoAgendamento: Agendamento = {
        id,
        cliente,
        telefone,
        servico,
        data,
        barbeiro
      };

      this.agendamentos.push(novoAgendamento);
      return `Agendamento confirmado! ID: ${id}`;
    } else {
      return 'Horário não disponível';
    }
  }

  private verificarDisponibilidade(data: Date, barbeiro: string, duracao: number): boolean {
    const inicioDesejado = data.getTime();
    const fimDesejado = inicioDesejado + (duracao * 60000);

    return !this.agendamentos.some(agendamento => {
      if (agendamento.barbeiro !== barbeiro) return false;
      
      const inicioExistente = agendamento.data.getTime();
      const fimExistente = inicioExistente + (agendamento.servico.duracao * 60000);

      return (inicioDesejado < fimExistente && fimDesejado > inicioExistente);
    });
  }

  listarAgendamentos(barbeiro?: string): Agendamento[] {
    if (barbeiro) {
      return this.agendamentos.filter(a => a.barbeiro === barbeiro);
    }
    return this.agendamentos;
  }

  cancelarAgendamento(id: string): string {
    const index = this.agendamentos.findIndex(a => a.id === id);
    
    if (index !== -1) {
      this.agendamentos.splice(index, 1);
      return 'Agendamento cancelado com sucesso';
    }
    
    return 'Agendamento não encontrado';
  }

  private gerarId(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }
}

// Exemplo de uso
const barbearia = new Barbearia();

console.log('=== BARBEARIA STYLE ===');
console.log('Serviços disponíveis:');
barbearia.listarServicos().forEach(servico => {
  console.log(`- ${servico.nome}: ${servico.duracao}min - R$ ${servico.preco.toFixed(2)}`);
});

// Fazendo alguns agendamentos
const hoje = new Date();
const amanha9h = new Date(hoje.getTime() + 24*60*60*1000);
amanha9h.setHours(9, 0, 0, 0);

const amanha10h = new Date(amanha9h);
amanha10h.setHours(10, 0, 0, 0);

console.log('\n' + barbearia.agendar('João Silva', '11999999999', 'Corte + Barba', amanha9h, 'Carlos'));
console.log(barbearia.agendar('Pedro Santos', '11888888888', 'Corte Simples', amanha10h, 'Carlos'));

console.log('\nAgendamentos do Carlos:');
barbearia.listarAgendamentos('Carlos').forEach(ag => {
  console.log(`${ag.data.toLocaleString('pt-BR')} - ${ag.cliente} - ${ag.servico.nome}`);
});