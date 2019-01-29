import { CidadeDTO } from './../../models/cidade.dto';
import { EstadoDTO } from './../../models/estado.dto';
import { CidadeEstadoService } from './../../services/domain/cidade_estado.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeEstadoService: CidadeEstadoService
    ) {
      this.formGroup = formBuilder.group({
      nome: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
      tipo : ['1', [Validators.required]],
      cpfOuCnpj : ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha : ['123', [Validators.required]],
      logradouro : ['Rua Via', [Validators.required]],
      numero : ['25', [Validators.required]],
      complemento : ['Apto 3', []],
      bairro : ['Copacabana', []],
      cep : ['10828333', [Validators.required]],
      telefone1 : ['977261827', [Validators.required]],
      telefone2 : ['', []],
      telefone3 : ['', []],
      estadoId : [null, [Validators.required]],
      cidadeId : [null, [Validators.required]]
      });
  }

  ionViewDidLoad() {
    this.cidadeEstadoService.findAllEstados()
      .subscribe(resp => {
        this.estados = resp;
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();
      })
  }

  updateCidades() {
    let estadoId = this.formGroup.value.estadoId;
    this.cidadeEstadoService.findCidadesByEstado(estadoId)
      .subscribe(resp => {
        this.cidades = resp;
        this.formGroup.controls.cidadeId.setValue(null);
      })
  }

  signupUser() {

  }

}
