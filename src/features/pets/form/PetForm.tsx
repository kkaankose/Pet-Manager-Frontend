import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Header } from 'semantic-ui-react';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { useStore } from '../../../app/stores/store';
//import ValidationErrors from '../errors/ValidationErrors';

export default observer(function RegisterForm() {
    const {petStore} = useStore();
    return (
        <Formik
            initialValues={{name: '',type:'', error: null}}
            onSubmit={(values, {setErrors}) => petStore.createPet(values).catch()}
            validationSchema={Yup.object({
                name: Yup.string().required(),
                type: Yup.string().required(),
               
            })}
        >
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Create Pet' color='teal' textAlign='center' />
                    <MyTextInput name='name' placeholder='Name' />
                    <MyTextInput name='type' placeholder='Type' />
                    
                    <ErrorMessage 
                        name='error' 
                    />
                    
                    <Button disabled={!isValid || !dirty || isSubmitting} 
                        loading={isSubmitting} positive content='Create' type='submit' fluid />
                   
                 
                </Form>
            )}
        </Formik>
    )
}) 
