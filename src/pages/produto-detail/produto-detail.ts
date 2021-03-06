import { CarrinhoService } from './../../services/domain/carrinho.service';
import { ProdutoService } from './../../services/domain/produto.service.';
import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item: ProdutoDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public carrinhoService: CarrinhoService) {
  }

  ionViewDidLoad() {
    let produtoId = this.navParams.get('produtoId');
    this.produtoService.findById(produtoId)
      .subscribe(response => {
        this.item = response;
        this.getImageUrlIfExists();
      },
      error => {});
  }

  getImageUrlIfExists() {
    this.produtoService.getImageFromBucket(this.item.id)
      .subscribe(response => {
        this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;
      },
      error => {});
  }

  addToCart(produto: ProdutoDTO) {
    this.carrinhoService.addProduto(produto);
    this.navCtrl.setRoot('CarrinhoPage');
  }
  

}
