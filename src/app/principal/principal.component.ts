import { Component, OnInit } from '@angular/core';
import { Cliente } from '../modelo/Cliente';
import { ClienteService } from '../servico/cliente.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {

  cliente = new Cliente();

  btnCadastro:boolean = true;

  tabela:boolean = true;

  clientes:Cliente[] = [];

  constructor(private servico:ClienteService) { }
  
  selecionar():void{
      this.servico.selecionar()
      .subscribe(retorno => this.clientes = retorno);
  }

  cadastrar():void {
    this.servico.cadastrar(this.cliente)
    .subscribe(retorno => { 
      this.clientes.push(retorno); 
      this.cliente = new Cliente();
      alert('Cliente cadastrado com sucesso!');
    });
  }

  selecionarCliente(posicao:number):void {
    this.cliente = this.clientes[posicao];
    this.btnCadastro = false;
    this.tabela = false;
  }
  
  editar():void {
    this.servico.editar(this.cliente)
    .subscribe(retorno => {
      let posicao = this.clientes.findIndex(obj => {
        return obj.codigo == retorno.codigo;
      });

      this.cliente = new Cliente();

      this.clientes[posicao] = retorno;
      this.btnCadastro = true;
      this.tabela = true;
      alert('Cliente alterado com sucesso!');
    });
  }

  remover():void {
    this.servico.remover(this.cliente.codigo)
    .subscribe(retorno => {
      let posicao = this.clientes.findIndex(obj => {
        return obj.codigo == this.cliente.codigo;
      });

      this.cliente = new Cliente();

      this.clientes.splice(posicao, 1);
      this.btnCadastro = true;
      this.tabela = true;
      alert('Cliente removido com sucesso!');
    });
  }

  cancelar():void {
    this.cliente = new Cliente();
    this.btnCadastro = true;
    this.tabela = true;
  }

  ngOnInit() {
    this.selecionar();
  }

}
