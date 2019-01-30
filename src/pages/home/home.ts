import { AuthService } from './../../services/auth.service';
import { CredenciaisDTO } from './../../models/credenciais.dto';
import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  cred: CredenciaisDTO = {
    email: "nelio.cursos@gmail.com",
    senha: "123"
  }

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter() {
    this.auth.refreshToken()      
      .subscribe(response => {
        this.auth.sucessfullLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
      },
      error => {});
  }

  login() {
    this.auth.authenticate(this.cred)      
      .subscribe(response => {
        this.auth.sucessfullLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
      },
      error => {});      
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

}
