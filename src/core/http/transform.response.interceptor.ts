import {
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NestResponse } from './nest.response';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  private httpAdapter: AbstractHttpAdapter;

  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((responseFromController: NestResponse) => {
        if (responseFromController instanceof NestResponse) {
          const contextHttp = context.switchToHttp();
          const response = contextHttp.getResponse();
          const { status, headers, body } = responseFromController;

          const headersNames = Object.getOwnPropertyNames(headers);
          headersNames.forEach((header) => {
            const value = headers[header];
            this.httpAdapter.setHeader(response, header, value);
          });

          this.httpAdapter.status(response, status);

          return body;
        }
        return responseFromController;
      }),
    );
  }
}
/* 
Pipe vai dar meios para poder trabalhar em cima do retorno de uma resposta que já executou

HttpAdapterHost -> polimorfismos
Definimos Polimorfismo como um princípio a partir do qual as classes derivadas de uma única classe base são capazes de invocar os métodos que, embora apresentem a mesma assinatura, comportam-se de maneira diferente para cada uma das classes derivadas.


HEADER DINAMIC


 const headersNames = Object.getOwnPropertyNames(headers) 
          headersNames.forEach( header => {
            const value = headers[header]; -> headers[X-Owned] = teste
          })
          
          {
            "X-Owned": "teste1",
            "X-version": "teste2"
          }
         ["header1", "header2"]

*/
