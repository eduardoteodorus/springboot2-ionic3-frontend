import { StorageService } from './../storage.service';
import { CarrinhoDTO } from '../../models/carrinho.dto';
import { ProdutoDTO } from './../../models/produto.dto';
import { Injectable } from '@angular/core';

@Injectable()
export class CarrinhoService {

    constructor(public storage: StorageService) {
    }

    createOrClearCart() : CarrinhoDTO {
        let cart: CarrinhoDTO = {items: []};
        this.storage.setCart(cart);
        return cart;
    }

    getCart() : CarrinhoDTO {
        let cart: CarrinhoDTO = this.storage.getCart();
        if (cart == null) {
            cart = this.createOrClearCart();
        }
        return cart;
    }

    addProduto(produto: ProdutoDTO) : CarrinhoDTO {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position == -1) {
            cart.items.push({quantidade: 1, produto: produto});
        }
        this.storage.setCart(cart);
        return cart;
    }
}