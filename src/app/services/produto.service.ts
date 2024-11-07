// src/app/services/produto.service.ts
export interface Produto {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
}
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private storageKey = 'produtos';

  constructor() {}

  listarProdutos(): Produto[] {
    const produtos = localStorage.getItem(this.storageKey);
    return produtos ? JSON.parse(produtos) : [];
  }

  adicionarProduto(produto: Produto) {
    const produtos = this.listarProdutos();
    produtos.push(produto);
    localStorage.setItem(this.storageKey, JSON.stringify(produtos));
  }

  editarProduto(produtoEditado: Produto) {
    const produtos = this.listarProdutos().map((produto) =>
      produto.id === produtoEditado.id ? produtoEditado : produto
    );
    localStorage.setItem(this.storageKey, JSON.stringify(produtos));
  }

  removerProduto(id: number) {
    const produtos = this.listarProdutos().filter((produto) => produto.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(produtos));
  }
}
