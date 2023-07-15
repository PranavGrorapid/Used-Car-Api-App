import {UseInterceptors,NestInterceptor,ExecutionContext,CallHandler} from  '@nestjs/common'
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'
import {plainToClass} from 'class-transformer'
import { UserDto } from 'src/users/dtos/user.dto'


export class serializeInterceptor implements NestInterceptor{

    constructor(private dto:any){}

 intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
     
// Run something before the request is handled by the request handler


console.log('i am running code before the request is handled',context)

return handler.handle().pipe(

    map((data:any)=>{

        // Run something before the data is send out

        console.log(`i am running before the data is send out`,data);

        return plainToClass(this.dto,data,{
            excludeExtraneousValues:true
        })
        

    })
)



 }






}