import { ProdutoService } from './../../services/domain/produto.service.';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ItemCarrinho } from '../../models/item-carrinho';
import { CarrinhoService } from '../../services/domain/carrinho.service';

@IonicPage()
@Component({
  selector: 'page-carrinho',
  templateUrl: 'carrinho.html',
})
export class CarrinhoPage {

  items: ItemCarrinho[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public carrinhoService: CarrinhoService,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let cart = this.carrinhoService.getCart();
    this.items = cart.items;
    this.loadImageUrls();
  }

  loadImageUrls() {
    this.items.map(item => {
      this.produtoService.getSmallImageFromBucket(item.produto.id)
        .subscribe(response => {
          item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.produto.id}-small.jpg`;
        },
        error => {});

    });
  }

}
