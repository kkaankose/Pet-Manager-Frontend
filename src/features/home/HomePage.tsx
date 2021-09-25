import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Header, Segment } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';

export default observer(function HomePage() {
    const { userStore, modalStore } = useStore();
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    User&Pet App
                </Header>
                {userStore.isLoggedIn ? (
                    <>

                        <Header as='h2' inverted content=' User&Pet App' />

                        <Button as={Link} to='/users' size='huge' inverted>
                            Go to Users!
                        </Button>
                    </>

                ) : (
                    <>
                        <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted>
                            Login!
                        </Button>
                        <Button onClick={() => modalStore.openModal(<RegisterForm />)} size='huge' inverted>
                            Register!
                        </Button>

                    </>
                )}

            </Container>
        </Segment>
    )
})