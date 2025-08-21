// Sistema de Vendas para Padaria
interface Produto {
  codigo: string;
  nome: string;
  categoria: 'paes' | 'doces' | 'salgados' | 'bebidas';
  preco: number;
  quantidadeDisponivel: number;
}

interface ItemVenda {
  produto: Produto;
  quantidade: number;
  peso?: number; // para produtos vendidos por peso (kg)
}

interface Venda {
  id: string;
  data: Date;
  itens: ItemVenda[];
  total: number;
  formaPagamento: 'dinheiro' | 'cartao' | 'pix';
}

class Padaria {
  private produtos: Map<string, Produto> = new Map();
  private vendas: Venda[] = [];
  private contadorVendas = 1;

  constructor() {
    this.inicializarProdutos();
  }

  private inicializarProdutos(): void {
    const produtosIniciais: Produto[] = [
      { codigo: 'P001', nome: 'Pão Francês', categoria: 'paes', preco: 0.80, quantidadeDisponivel: 200 },
      { codigo: 'P002', nome: 'Pão Doce', categoria: 'paes', preco: 1.50, quantidadeDisponivel: 50 },
      { codigo: 'D001', nome: 'Brigadeiro', categoria: 'doces', preco: 2.50, quantidadeDisponivel: 30 },
      { codigo: 'D002', nome: 'Bem Casado', categoria: 'doces', preco: 3.00, quantidadeDisponivel: 20 },
      { codigo: 'S001', nome: 'Coxinha', categoria: 'salgados', preco: 4.50, quantidadeDisponivel: 25 },
      { codigo: 'S002', nome: 'Pastel de Queijo', categoria: 'salgados', preco: 5.00, quantidadeDisponivel: 15 },
      { codigo: 'B001', nome: 'Café Expresso', categoria: 'bebidas', preco: 3.50, quantidadeDisponivel: 100 },
      { codigo: 'B002', nome: 'Suco de Laranja', categoria: 'bebidas', preco: 6.00, quantidadeDisponivel: 20 }
    ];

    produtosIniciais.forEach(produto => {
      this.produtos.set(produto.codigo, produto);
    });
  }

  listarProdutos(categoria?: string): Produto[] {
    const todosProdutos = Array.from(this.produtos.values());
    
    if (categoria) {
      return todosProdutos.filter(p => p.categoria === categoria);
    }
    
    return todosProdutos;
  }

  iniciarVenda(): CarrinhoVenda {
    return new CarrinhoVenda(this);
  }

  finalizarVenda(carrinho: CarrinhoVenda, formaPagamento: 'dinheiro' | 'cartao' | 'pix'): string {
    const itens = carrinho.obterItens();
    
    if (itens.length === 0) {
      return 'Carrinho vazio';
    }

    // Verificar disponibilidade e atualizar estoque
    for (const item of itens) {
      const produto = this.produtos.get(item.produto.codigo);
      if (!produto || produto.quantidadeDisponivel < item.quantidade) {
        return `Produto "${item.produto.nome}" indisponível na quantidade solicitada`;
      }
    }

    // Atualizar estoque
    itens.forEach(item => {
      const produto = this.produtos.get(item.produto.codigo)!;
      produto.quantidadeDisponivel -= item.quantidade;
    });

    const venda: Venda = {
      id: this.contadorVendas.toString().padStart(6, '0'),
      data: new Date(),
      itens,
      total: carrinho.calcularTotal(),
      formaPagamento
    };

    this.vendas.push(venda);
    this.contadorVendas++;

    return this.gerarCupomFiscal(venda);
  }

  private gerarCupomFiscal(venda: Venda): string {
    let cupom = `\n====== PADARIA BOM DIA ======\n`;
    cupom += `Cupom: ${venda.id}\n`;
    cupom += `Data: ${venda.data.toLocaleDateString('pt-BR')} ${venda.data.toLocaleTimeString('pt-BR')}\n`;
    cupom += `============================\n`;

    venda.itens.forEach(item => {
      const subtotal = item.quantidade * item.produto.preco;
      cupom += `${item.quantidade}x ${item.produto.nome}\n`;
      cupom += `   R$ ${item.produto.preco.toFixed(2)} = R$ ${subtotal.toFixed(2)}\n`;
    });

    cupom += `============================\n`;
    cupom += `TOTAL: R$ ${venda.total.toFixed(2)}\n`;
    cupom += `Forma de Pagamento: ${venda.formaPagamento.toUpperCase()}\n`;
    cupom += `============================\n`;
    cupom += `Obrigado pela preferência!\n`;

    return cupom;
  }

  relatorioVendasDia(): void {
    const hoje = new Date().toDateString();
    const vendasHoje = this.vendas.filter(v => v.data.toDateString() === hoje);
    
    const totalVendas = vendasHoje.reduce((total, venda) => total + venda.total, 0);
    
    console.log('\n=== RELATÓRIO DE VENDAS DO DIA ===');
    console.log(`Total de vendas: ${vendasHoje.length}`);
    console.log(`Faturamento: R$ ${totalVendas.toFixed(2)}`);
    
    if (vendasHoje.length > 0) {
      console.log('\nVendas realizadas:');
      vendasHoje.forEach(venda => {
        console.log(`${venda.id} - R$ ${venda.total.toFixed(2)} (${venda.formaPagamento})`);
      });
    }
  }
}

class CarrinhoVenda {
  private itens: ItemVenda[] = [];
  
  constructor(private padaria: Padaria) {}

  adicionarItem(codigo: string, quantidade: number): string {
    const produto = this.padaria['produtos'].get(codigo);
    
    if (!produto) {
      return 'Produto não encontrado';
    }

    if (produto.quantidadeDisponivel < quantidade) {
      return `Quantidade indisponível. Disponível: ${produto.quantidadeDisponivel}`;
    }

    const itemExistente = this.itens.find(i => i.produto.codigo === codigo);
    
    if (itemExistente) {
      itemExistente.quantidade += quantidade;
    } else {
      this.itens.push({ produto, quantidade });
    }

    return `Adicionado: ${quantidade}x ${produto.nome}`;
  }

  removerItem(codigo: string): string {
    const index = this.itens.findIndex(i => i.produto.codigo === codigo);
    
    if (index !== -1) {
      const item = this.itens[index];
      this.itens.splice(index, 1);
      return `Removido: ${item.produto.nome}`;
    }
    
    return 'Item não encontrado no carrinho';
  }

  calcularTotal(): number {
    return this.itens.reduce((total, item) => {
      return total + (item.produto.preco * item.quantidade);
    }, 0);
  }

  obterItens(): ItemVenda[] {
    return [...this.itens];
  }

  listarItens(): void {
    console.log('\n=== CARRINHO ===');
    if (this.itens.length === 0) {
      console.log('Carrinho vazio');
      return;
    }

    this.itens.forEach(item => {
      const subtotal = item.produto.preco * item.quantidade;
      console.log(`${item.quantidade}x ${item.produto.nome} - R$ ${subtotal.toFixed(2)}`);
    });
    
    console.log(`\nTOTAL: R$ ${this.calcularTotal().toFixed(2)}`);
  }
}

// Exemplo de uso
const padaria = new Padaria();

console.log('=== BEM-VINDO À PADARIA BOM DIA ===');

// Listar produtos disponíveis
console.log('\nProdutos disponíveis:');
padaria.listarProdutos().forEach(produto => {
  console.log(`${produto.codigo} - ${produto.nome} - R$ ${produto.preco.toFixed(2)} (${produto.quantidadeDisponivel} disponíveis)`);
});

// Simulando uma venda
const carrinho = padaria.iniciarVenda();

console.log('\n' + carrinho.adicionarItem('P001', 10)); // 10 pães franceses
console.log(carrinho.adicionarItem('D001', 3));  // 3 brigadeiros
console.log(carrinho.adicionarItem('B001', 2));  // 2 cafés

carrinho.listarItens();

// Finalizando a venda
console.log(padaria.finalizarVenda(carrinho, 'pix'));

// Relatório do dia
padaria.relatorioVendasDia();