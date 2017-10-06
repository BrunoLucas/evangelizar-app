import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
// import { Storage, SqlStorage } from '@ionic/ionic-angular';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import { Pessoa } from '../models/Pessoa';
declare var window: any;

/*
  Generated class for the DataBaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataBaseProvider {

  public db: SQLiteObject;
	public dbname: string = 'data.db';
    

  constructor(public database: SQLite) {


  }

  init(): Promise<any> {
	
    return new Promise(resolve => {
         this.database = new SQLite();
        
          this.database.create({name: "data.db", location: "default"}).then((db : SQLiteObject) => {
              this.db = db;
              this.load();
            }, (error) => {
                console.log("ERROR: ", error);
            });

		});
	
}

query(q: string, params?: any): Promise<any> {

		return new Promise((resolve, reject) => {
			params = params || [];
			this.db.transaction((tx) => {
				tx.executeSql(q, params, (tx, res) => {
					resolve(res);
				}, (tx, err) => {
					reject(err);
				});
			});
		});

	}
 
  load(){
    
    this.db.executeSql(
            "CREATE TABLE IF NOT EXISTS pessoa "
                + "(id INTEGER PRIMARY KEY AUTOINCREMENT, "
                + " nome TEXT, "
                + " idade INTEGER, "
                + " bairro TEXT,   "
                + " telefone TEXT, "
                + " email    TEXT, "
                + " facebook TEXT, "
                + " datacaptura TIMESTAMP, "
                + " datasincronismo TIMESTAMP ) ", {}

    ).then(res => {
        console.log('Resultado: ' + res);
    }).catch(err => {
      console.log('Erro ao criar tabela.' + err)
    });

  }




  inserirPessoa(pessoaModel : Pessoa){
         this.database = new SQLite();
         this.database.create({name: "data.db", location: "default"}).then((db : SQLiteObject) => {
            db.executeSql("INSERT INTO pessoa (nome, idade, bairro, telefone, email) "
                        + " VALUES "
                        +"('"+pessoaModel.nome
                        +"',"+pessoaModel.idade
                        +",'"+pessoaModel.bairro
                        +"','"+pessoaModel.telefone
                        +"','"+pessoaModel.email
                        +"')", []).then((data) => {
                    console.log("INSERTED: " + JSON.stringify(data));
                    return Promise.resolve();
                }, (error) => {
                    console.log("ERROR: " + JSON.stringify(error.err));
                });  

            }, (error) => {
                console.log("ERROR: ", error);
            });
          return Promise.resolve();
              

  }


init2(): Promise<any> {
	
    return new Promise(resolve => {
         this.database = new SQLite();
        
          this.database.create({name: "data.db", location: "default"}).then((db : SQLiteObject) => {
              this.db = db;
              this.load();
            }, (error) => {
                console.log("ERROR: ", error);
            });

		});
	
}

  listarPessoas(): Promise<any>{
         
         console.log('db' + this.db);
    
    return new Promise(resolve => {
            this.database.create({
                name: 'data.db',
                location: 'default'
                })
                .then((db: SQLiteObject) => {
                        
                        db.executeSql('select nome, idade, bairro, telefone, email from pessoa', {})
                        .then((res) => {
                        
                        console.log('Executed SQL' + res );


                        resolve(res);
                })
                        .catch(e =>{console.log('erro no executeSql. ' + e); resolve();});
            })
            .catch(e => { console.log('erro no create: ' + e); resolve()});

    });
  }

}
