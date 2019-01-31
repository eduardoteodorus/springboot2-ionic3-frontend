import { ProdutoService } from './../../services/domain/produto.service.';
import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';

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
    public produtoService: ProdutoService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let categoriaId = this.navParams.get('categoriaId');

   let loader = this.presentLoading();

   this.produtoService.findByCategoria(categoriaId)
    .subscribe(resp => {
      this.items = resp['content'];
      this.loadImageUrls();
      loader.dismiss();
    }, error => {
      loader.dismiss();
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

  //modal loading...
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  //refresh by pulling
  doRefresh(refresher) {
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

}
