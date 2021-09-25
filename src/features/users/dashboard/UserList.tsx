import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';
import { User } from '../../../app/models/user';
import { useStore } from '../../../app/stores/store';
import UserListItem from './UserListItem';



export default observer(function ActivityList() { 
    const { userStore } = useStore();
    const { allUsers } = userStore;



    return (


        <Container>
            {allUsers.map((user: User) => <UserListItem key={user.id} user={user} />)}
        </Container>

    )
})
