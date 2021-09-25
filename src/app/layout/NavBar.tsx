import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Menu, Dropdown } from 'semantic-ui-react';
import { useStore } from '../stores/store';



export default observer(function NavBar() {
    const { userStore: { userTest,logout } } = useStore();



    return (

        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    User&Pet App
                </Menu.Item>
                <Menu.Item as={NavLink} to='/users' name='Users' />
                <Menu.Item>
                    <Button as={NavLink} to='/createPet' positive content='Create Pet' />
                </Menu.Item>
                <Menu.Item as={NavLink} to='/pets' name='My Pets' />
                <Menu.Item position='right'>
                   
                    <Dropdown pointing='top left' text={userTest?.name}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/users/${userTest?.id}`} 
                                text='Edit Profile' icon='edit' />
                            <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
})