import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Header, Label } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { store, useStore } from '../../app/stores/store';

//mytextinput'u biz yarattık

export default observer(function LoginForm() {
    const {userStore} = useStore();
    return (
        <Formik
            initialValues={{email: '', password: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore.login(values).catch(error => 
                setErrors({error: 'Invalid email or password'}))}
        >
            {({handleSubmit, isSubmitting, errors}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Login to User&Pet APP' color='teal' textAlign='center' />
                    <MyTextInput name='email' placeholder='Email' /> 
                    <MyTextInput name='password' placeholder='Password' type='password' />
                    <ErrorMessage 
                        name='error' render={() => 
                        <Label style={{marginBottom: 10}} basic color='red' content={errors.error}/>}
                    />
                    <Button.Group>
                    <Button loading={isSubmitting} positive content='Login' type='submit' fluid />
                    <Button 
                    style={{
                        marginLeft: '3px',
                        marginRight:'3px'
                    }}
                    onClick={()=>{
                        store.modalStore.closeModal();
                    }}
                     negative content='Cancel' ></Button>    
                     </Button.Group>
                </Form>
            )}
        </Formik>
    )
}) 