import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Grid} from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import UserList from './UserList';


export default observer (function UserDashboard(){ // userStore'u observerliyor orada bir şey değişirse burada da değişiyor observer design model
    const {userStore} = useStore(); // userstore userservice gibi, 
    const {loadUsers,userRegistry} = userStore;
 
    useEffect(() => { // size değişirse tekrar alıyor
        if(userRegistry.size <=1) loadUsers();
    }, [userRegistry.size,loadUsers])
    
    if(userStore.loadingInitial || userStore.loading)  // f5 atınca loading users getiriyo
   return  <LoadingComponent content='Loading Users' />
    return(
        <Grid>
            <Grid.Column
            width='16'>
                <UserList 
                />
               
            </Grid.Column>
           
        </Grid>
    )
})