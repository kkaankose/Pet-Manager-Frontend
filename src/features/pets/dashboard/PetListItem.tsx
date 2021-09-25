import { Link } from 'react-router-dom';
import { Button, Card } from 'semantic-ui-react';
import { Pet } from '../../../app/models/pet';

interface Props {
    pet: Pet;
}
export default function PetListItem({ pet }: Props) {


    return (
     
        <Card  
        
        style={{width:'100%'}}>
        <Card.Content>
            <h3>Pet Name:<b>{pet.name}</b></h3> 
            <br />
            <h3>Pet Type:<b>{pet.type}</b></h3>
            
        </Card.Content>
        <Card.Content extra>
            <Button.Group
            floated='right'>
            <Button as={Link}to={`pets/${pet.id}`} 
            style={{marginLeft:'3px'}}
            positive content='Edit Pet' />
             
           
      
            </Button.Group>
        </Card.Content>
        


    </Card>
           
          
    
    )

}
