import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, Events } from 'ionic-angular';
import {Toast} from "ionic-native";
import { Pessoa } from '../../models/Pessoa';
import {PessoaPage} from '../pessoa/pessoa';
import {DataBaseProvider} from '../../providers/data-base-provider';

/*
  Generated class for the ListaPessoa page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-lista-pessoa',
  templateUrl: 'lista-pessoa.html', 
  providers: [DataBaseProvider]
}) 
export class ListaPessoaPage {

listaPessoas: Array<{nome?: string, foto?: string}>;
listaPessoasKeys : String[];


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingController: LoadingController,
    public toastCtrl: ToastController,
    private dataBP : DataBaseProvider,
    public events: Events
  ) {}
  ngOnInit() {

    let loading = this.loadingController.create({
      content: "Aguarde"
       //dismissOnPageChange: true
    });
    loading.present();

    this.listaPessoas = new Array();

          this.dataBP.listarPessoas(). then((res) =>{
            console.log('listarPessoas: ' + res);
            if(res.rows.length > 0){
 
                  for(let i = 0; i < res.rows.length; i ++){
                        let p =  new Pessoa();
                        p.nome =  res.rows.item(i).nome;
                        p.telefone = res.rows.item(i).telefone;
                        p.bairro = res.rows.item(i).bairro;
                        p.idade = res.rows.item(i).idade;
                        p.email = res.rows.item(i).email;
                        this.listaPessoas.push(p);
                  }
                  this.listaPessoasKeys = Object.keys(this.listaPessoas);
            }

        }).catch(exception =>{
          console.log('listarPessoas error' + exception);
        });

    setTimeout(() => {
        loading.dismiss();
    });
    

  }

  carregarListaLocalPessoas(){

        this.dataBP.listarPessoas(). then((res) =>{
            console.log('listarPessoas: ' + res);
             this.listaPessoas = new Array();
            if(res.rows.length > 0){

                  for(let i = 0; i < res.rows.length; i ++){
                        let p =  new Pessoa();
                        p.nome =  res.rows.item(i).nome;
                        p.telefone = res.rows.item(i).telefone;
                        p.bairro = res.rows.item(i).bairro;
                        p.idade = res.rows.item(i).idade;
                        p.email = res.rows.item(i).email;
                        this.listaPessoas.push(p);
                  }
                  this.listaPessoasKeys = Object.keys(this.listaPessoas);
            }

        }).catch(exception =>{
          console.log('listarPessoas error' + exception);
        });
  }


  adicionarPessoa(){
    console.log('adicionarPessoa');
    this.navCtrl.push(PessoaPage).then().catch(exception =>{
        console.log('erro ao abrir pagina para adicionar pessoa: ' + exception);
    });
  }
  detalhePessoa(id : number){
    console.log('detalhe pessoa: ' + id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaPessoaPage');
        this.events.subscribe('user:created', (user) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
          console.log('usuario adicionado : ' + user);
          this.listaPessoas.push(user);
          this.listaPessoasKeys = Object.keys(this.listaPessoas);
    });
  }

  

}