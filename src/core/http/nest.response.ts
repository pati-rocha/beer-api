//MODELO DE RESPOSTA PADRÃO QUE REPRESENTA UMA RESPOSTA HTTP
export class NestResponse {
  status: number;
  headers: any;
  body: any;

  constructor(response: NestResponse) {
    Object.assign(this, response);
  }
}
//Object.assign fará this.status = response.status para cada propriedade, facilita a contrução de obj mais complexos.
//Em um objeto grande não para chamar as propriedade uma a uma, o Object.assign faz isso.
