// Sistema de Pedidos para Lanchonete
interface ItemMenu {
  id: number;
  nome: string;
  preco: number;
  categoria: 'lanche' | 'bebida' | 'sobremesa';
}

interface ItemPedido {
  item: ItemMenu;
  quantidade: number;
}

class Pedido {
  private itens: ItemPedido[] = [];
  private numeroMesa: number;
  
  constructor(numeroMesa: number) {
    this.numeroMesa = numeroMesa;
  }

  adicionarItem(item: ItemMenu, quantidade: number): void {
    const itemExistente = this.itens.find(i => i.item.id === item.id);
    
    if (itemExistente) {
      itemExistente.quantidade += quantidade;
    } else {
      this.itens.push({ item, quantidade });
    }
    
    console.log(`Adicionado: ${quantidade}x ${item.nome}`);
  }

  removerItem(itemId: number): void {
    this.itens = this.itens.filter(item => item.item.id !== itemId);
    console.log(`Item removido do pedido`);
  }

  calcularTotal(): number {
    return this.itens.reduce((total, item) => {
      return total + (item.item.preco * item.quantidade);
    }, 0);
  }

  gerarRecibo(): string {
    let recibo = `\n=== LANCHONETE DO ZÉ ===\n`;
    recibo += `Mesa: ${this.numeroMesa}\n`;
    recibo += `Data: ${new Date().toLocaleDateString('pt-BR')}\n\n`;
    
    this.itens.forEach(item => {
      const subtotal = item.item.preco * item.quantidade;
      recibo += `${item.quantidade}x ${item.item.nome} - R$ ${subtotal.toFixed(2)}\n`;
    });
    
    recibo += `\nTOTAL: R$ ${this.calcularTotal().toFixed(2)}\n`;
    recibo += `========================\n`;
    
    return recibo;
  }
}

// Exemplo de uso
const menu: ItemMenu[] = [
  { id: 1, nome: 'X-Burger', preco: 15.90, categoria: 'lanche' },
  { id: 2, nome: 'X-Salada', preco: 18.50, categoria: 'lanche' },
  { id: 3, nome: 'Coca-Cola', preco: 5.00, categoria: 'bebida' },
  { id: 4, nome: 'Pudim', preco: 8.00, categoria: 'sobremesa' }
];

// Criando um pedido para a mesa 5
const pedidoMesa5 = new Pedido(5);
pedidoMesa5.adicionarItem(menu[0], 2); // 2 X-Burgers
pedidoMesa5.adicionarItem(menu[2], 2); // 2 Coca-Colas
pedidoMesa5.adicionarItem(menu[3], 1); // 1 Pudim

console.log(pedidoMesa5.gerarRecibo());