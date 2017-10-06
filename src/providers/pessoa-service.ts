import { Injectable } from '@angular/core';
import { Http ,  Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Pessoa } from '../models/Pessoa';
import 'rxjs/add/operator/catch';
/*
  Generated class for the PessoaService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PessoaService {
   private actionUrl: string;
  private headers: Headers;

  constructor(public http: Http) {
    console.log('Hello PessoaService Provider');

            this.actionUrl = "http://localhost:8080/api/v1/pessoa";
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');

  }

     public listarPessoas = (): Observable<Pessoa[]> => {
        return this.http.get(this.actionUrl + "/")
            .map((response: Response) => 
                <Pessoa[]>response.json())
            .catch(this.handleError);
    }

    public cadastrarPessoa = (Pessoa): Observable<Pessoa> => {
        let PessoaNovo = JSON.stringify(Pessoa);

        return this.http.post(this.actionUrl + "/saveOrUpdate", PessoaNovo, { headers: this.headers })
            .map((response: Response) => <Pessoa>response.json())
            .catch(this.handleError);
    }

    public getSingle = (id: number): Observable<Pessoa> => {
        return this.http.get(this.actionUrl + "/?id=" + id,
        new Headers({'Content-Type' : 'application/json', 'Accept' : 'application/json'}))
            .map((response: Response) => <Pessoa>response.json())
            .catch(this.handleError);
    }

      public delete = (id: number): Observable<Response> => {
        return this.http.delete(this.actionUrl + "/delete?id=" + id,
        )
            .catch(this.handleError);
    }

     private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
