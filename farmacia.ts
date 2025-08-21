// Sistema de Controle de Estoque para Farmácia
interface Medicamento {
  codigo: string;
  nome: string;
  fabricante: string;
  preco: number;
  quantidade: number;
  dataValidade: Date;
  prescricaoObrigatoria: boolean;
}

class Farmacia {
  private estoque: Map<string, Medicamento> = new Map();

  adicionarMedicamento(medicamento: Medicamento): void {
    if (this.estoque.has(medicamento.codigo)) {
      // Se já existe, atualiza a quantidade
      const existente = this.estoque.get(medicamento.codigo)!;
      existente.quantidade += medicamento.quantidade;
      console.log(`Estoque atualizado: ${medicamento.nome} - Total: ${existente.quantidade}`);
    } else {
      this.estoque.set(medicamento.codigo, medicamento);
      console.log(`Medicamento adicionado: ${medicamento.nome}`);
    }
  }

  buscarMedicamento(codigo: string): Medicamento | undefined {
    return this.estoque.get(codigo);
  }

  buscarPorNome(nome: string): Medicamento[] {
    return Array.from(this.estoque.values())
      .filter(med => med.nome.toLowerCase().includes(nome.toLowerCase()));
  }

  venderMedicamento(codigo: string, quantidade: number): string {
    const medicamento = this.estoque.get(codigo);
    
    if (!medicamento) {
      return 'Medicamento não encontrado';
    }

    if (medicamento.quantidade < quantidade) {
      return `Estoque insuficiente. Disponível: ${medicamento.quantidade}`;
    }

    // Verificar validade
    if (this.estaVencido(medicamento)) {
      return 'ATENÇÃO: Medicamento vencido!';
    }

    medicamento.quantidade -= quantidade;
    const total = medicamento.preco * quantidade;

    let recibo = `\n=== FARMÁCIA SAÚDE ===\n`;
    recibo += `${quantidade}x ${medicamento.nome}\n`;
    recibo += `Preço unitário: R$ ${medicamento.preco.toFixed(2)}\n`;
    recibo += `TOTAL: R$ ${total.toFixed(2)}\n`;
    
    if (medicamento.prescricaoObrigatoria) {
      recibo += `\n⚠️  RETENÇÃO DE RECEITA OBRIGATÓRIA\n`;
    }
    
    recibo += `==================\n`;
    
    return recibo;
  }

  verificarEstoqueBaixo(limite: number = 10): Medicamento[] {
    return Array.from(this.estoque.values())
      .filter(med => med.quantidade <= limite);
  }

  verificarMedicamentosVencidos(): Medicamento[] {
    return Array.from(this.estoque.values())
      .filter(med => this.estaVencido(med));
  }

  verificarMedicamentosProximosVencimento(dias: number = 30): Medicamento[] {
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() + dias);
    
    return Array.from(this.estoque.values())
      .filter(med => med.dataValidade <= dataLimite && !this.estaVencido(med));
  }

  private estaVencido(medicamento: Medicamento): boolean {
    return medicamento.dataValidade < new Date();
  }

  relatorioEstoque(): void {
    console.log('\n=== RELATÓRIO DE ESTOQUE ===');
    console.log(`Total de medicamentos: ${this.estoque.size}`);
    
    const estoqueBaixo = this.verificarEstoqueBaixo();
    if (estoqueBaixo.length > 0) {
      console.log('\n⚠️  ESTOQUE BAIXO:');
      estoqueBaixo.forEach(med => {
        console.log(`- ${med.nome}: ${med.quantidade} unidades`);
      });
    }

    const vencidos = this.verificarMedicamentosVencidos();
    if (vencidos.length > 0) {
      console.log('\n🚫 MEDICAMENTOS VENCIDOS:');
      vencidos.forEach(med => {
        console.log(`- ${med.nome}: Vencido em ${med.dataValidade.toLocaleDateString('pt-BR')}`);
      });
    }

    const proximosVencimento = this.verificarMedicamentosProximosVencimento();
    if (proximosVencimento.length > 0) {
      console.log('\n⏰ PRÓXIMOS DO VENCIMENTO (30 dias):');
      proximosVencimento.forEach(med => {
        console.log(`- ${med.nome}: Vence em ${med.dataValidade.toLocaleDateString('pt-BR')}`);
      });
    }
  }
}

// Exemplo de uso
const farmacia = new Farmacia();

// Adicionando medicamentos
farmacia.adicionarMedicamento({
  codigo: 'DIP001',
  nome: 'Dipirona 500mg',
  fabricante: 'Genérico',
  preco: 12.50,
  quantidade: 50,
  dataValidade: new Date('2025-12-31'),
  prescricaoObrigatoria: false
});

farmacia.adicionarMedicamento({
  codigo: 'AMO001', 
  nome: 'Amoxicilina 875mg',
  fabricante: 'EMS',
  preco: 25.80,
  quantidade: 8, // Estoque baixo
  dataValidade: new Date('2025-03-15'),
  prescricaoObrigatoria: true
});

farmacia.adicionarMedicamento({
  codigo: 'PAR001',
  nome: 'Paracetamol 750mg',
  fabricante: 'Medley',
  preco: 8.90,
  quantidade: 30,
  dataValidade: new Date('2024-10-10'), // Vencido
  prescricaoObrigatoria: false
});

// Simulando vendas
console.log(farmacia.venderMedicamento('DIP001', 2));
console.log(farmacia.venderMedicamento('AMO001', 1));

// Relatório
farmacia.relatorioEstoque();