import './styles.css';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, Switch } from 'react-router';
import HomePage from '../../features/home/HomePage';
import { ToastContainer } from 'react-toastify';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import RegisterForm from '../../features/users/RegisterForm';
import ModalContainer from '../common/modals/ModalContainer';
import UserDashboard from '../../features/users/dashboard/UserDashboard';
import PetForm from '../../features/pets/form/PetForm';
import PetDashboard from '../../features/pets/dashboard/PetDashboard';
import LoadingComponent from './LoadingComponent';
import PetEditForm from '../../features/pets/form/PetEditForm';
import UserEditForm from '../../features/users/UserEditForm';

// react route'a bak

export default observer (function App() {
  const {commonStore,userStore} = useStore();
  useEffect(()=>{
    if (commonStore.token) {
      userStore.getUser(parseInt(commonStore.id!)).finally(()=> commonStore.setAppLoaded());

    }else{
      commonStore.setAppLoaded();
    }
  },[commonStore,userStore])

  if(!commonStore.appLoaded && !userStore.isLoggedIn) return<LoadingComponent 
  content='Loading App...'/>
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        theme="colored"
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ModalContainer />

      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{
              marginTop: '7em'
            }}>
              <Switch>
                
                <Route exact path='/users' component={UserDashboard} />
                <Route path='/login' component={LoginForm} />
                <Route path='/createPet' component={PetForm} />
                <Route path='/register' component={RegisterForm} />
                <Route exact path='/pets' component={PetDashboard} />
                <Route path='/pets/:id' component={PetEditForm} />
                <Route path='/users/:id' component={UserEditForm} />



              </Switch>
            </Container>
          </>
        )}
      />



    </>
  );
})

