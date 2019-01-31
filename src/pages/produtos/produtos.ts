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

  items: ProdutoDTO[] = [];
  page: number = 0;

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

   this.produtoService.findByCategoria(categoriaId, this.page, 10)
    .subscribe(resp => {
      let inicio = this.items.length;
      this.items = this.items.concat(resp['content']);
      let fim = this.items.length - 1;
      this.loadImageUrls(inicio, fim);
      loader.dismiss();
    }, error => {
      loader.dismiss();
    });
  }

  loadImageUrls(inicio: number, fim : number) {

    for (var i=inicio; i<=fim; i++) {
      let item = this.items[i];
      
      this.produtoService.getSmallImageFromBucket(item.id)
      .subscribe(response => {
        item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
      },
      error => {});
    }      
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
  doRefresh(eventRefresher) {
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      eventRefresher.complete();
    }, 2000);
  }

  doInfinite(eventInfiniteScroll) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      eventInfiniteScroll.complete();
    }, 2000);
  }

}
