import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Events } from 'ionic-angular';

import {PessoaService} from '../../providers/pessoa-service';
import {DataBaseProvider} from '../../providers/data-base-provider';
import { Pessoa } from '../../models/Pessoa';
import { Toast } from "ionic-native";
/*
  Generated class for the Pessoa page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pessoa',
  templateUrl: 'pessoa.html', 
  providers : [PessoaService, DataBaseProvider]
})
export class PessoaPage {

 pessoaModel: Pessoa = {};

 presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso',
      message: 'Cadastro realizado com sucesso'
    });
    alert.present();
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataBP : DataBaseProvider,
   public loadingController: LoadingController,
     public alertCtrl: AlertController,
     public events : Events) {}

  salvarPessoa(){
    console.log('salvar pessoa');

    this.dataBP.inserirPessoa(this.pessoaModel).then((res) =>{
        this.presentAlert();
        this.events.publish('user:created', this.pessoaModel, this.pessoaModel);
        this.pessoaModel = new Pessoa();
    }).catch(err =>{
        console.log('erro ao inserir pessoa: ' + err);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PessoaPage');
  }

onDidDismiss(){
      console.log('back button');
}



}
