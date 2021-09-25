import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Header } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { store, useStore } from '../../app/stores/store';
import * as Yup from 'yup';

export default observer(function RegisterForm() {
    const {userStore} = useStore();
    return (
        <Formik
            initialValues={{name: '',surname:'', email: '', password: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore.register(values).catch()}
            validationSchema={Yup.object({
                name: Yup.string().required(),
                surname: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required(),
            })}
        >
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Sign up to User&Pet APP' color='teal' textAlign='center' />
                    <MyTextInput name='name' placeholder='Name' />
                    <MyTextInput name='surname' placeholder='Surname' />
                    <MyTextInput name='email' placeholder='Email' />
                    <MyTextInput name='password' placeholder='Password' type='password' />
                    <ErrorMessage 
                        name='error' 
                    />
                    <Button.Group>
                    <Button disabled={!isValid || !dirty || isSubmitting} 
                        loading={isSubmitting} positive content='Register' type='submit' fluid />
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