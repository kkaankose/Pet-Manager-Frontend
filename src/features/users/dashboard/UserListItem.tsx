import { Card, Icon } from 'semantic-ui-react';
import { User } from '../../../app/models/user';


interface Props { // güvenlik için user dışında bir şey vermeni engelliyor.
    user: User;
}
export default function UserListItem({ user }: Props) {

    return (
     // çift tırnak olması lazım tek olursa anlamıyor.
     // semantic ui kullanıyoruz card
        <Card style={{width:'100%'}}> 
        <Card.Content>
            <Card.Header>{user.name} {user.surname}</Card.Header>
            
        </Card.Content>
        <Card.Content extra>
            <Icon name='mail' />
           {user.email} 
        </Card.Content>
        


    </Card>
           
          
    
    )

}
