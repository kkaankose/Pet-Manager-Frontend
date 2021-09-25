export interface Pet{
    id:number;
    name:string;
    type:string;
    
}
export interface PetFormModel{
    name:string;
    type:string;
}

export interface EditPetFormModel{
    name:string;
}

export class PetFormValues{
    id:number=0;
    name: string ='';
    type: string= '';
 


    constructor(pet? : PetFormValues){
      if(pet){
        this.id=pet.id;
        this.name= pet.name;
        this.type=pet.type;
      }
    }
  }
