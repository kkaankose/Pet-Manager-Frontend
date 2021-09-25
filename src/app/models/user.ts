export interface User{
    email:string;
    name:string;
    token:string;
    surname:string;
    id:number;
}

export interface UserFormValues{
    email:string;
    password:string;
    name?:string;
    surname?:string;
    id?:number;

}
export class UserEditFormValues{
    id:number=0;
    name: string ='';
    surname: string= '';
 


    constructor(user? : UserEditFormValues){
      if(user){
        this.id=user.id;
        this.name= user.name;
        this.surname=user.surname;
      }
    }
  }