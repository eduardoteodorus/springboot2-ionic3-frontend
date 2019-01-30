import { ProdutoService } from './../../services/domain/produto.service.';
import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';

/**
 * Generated class for the ProdutosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
   let categoriaId = this.navParams.get('categoriaId');
   this.produtoService.findByCategoria(categoriaId)
    .subscribe(resp => {
      this.items = resp['content'];
      this.loadImageUrls();
    });
  }

  loadImageUrls() {
    this.items.map(item => {
      this.produtoService.getSmallImageFromBucket(item.id)
      .subscribe(response => {
        item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
      },
      error => {});
    });    
  } 
  
  showDetail(produto: ProdutoDTO) {
    this.navCtrl.push('ProdutoDetailPage', { produtoId: produto.id });
  }

}
