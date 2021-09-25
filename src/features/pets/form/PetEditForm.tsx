import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import {  useStore } from '../../../app/stores/store';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTexInput from '../../../app/common/form/MyTextInput';
import { Pet, PetFormValues } from '../../../app/models/pet';



export default observer(function PetEditForm() {
    const history = useHistory();
    const { petStore } = useStore();
    const { updatePet, loadPet } = petStore;
    const { id } = useParams<{ id: string }>();
    const [pet, setPet] = useState<Partial<Pet>>(new PetFormValues());

    const validationSchema = Yup.object({
        name: Yup.string().required('The pet name required!'),

    })

    useEffect(() => {
        if (id) loadPet(parseInt(id)).then(pet => setPet((prevState): PetFormValues => {
            if (!prevState) {
                setPet(prevState)
            }
            return new PetFormValues(pet);

        }))
    }, [id, loadPet]);


    function handleFormSubmit(pet: PetFormValues) {

        if (pet.name) {
            updatePet(pet).then(() => history.push(`/pets`))
        }
    }

  





    return (

        <Segment clearing>
            <Header content='Pet Details' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={pet as PetFormValues}
                onSubmit={handleFormSubmit}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form'
                        onSubmit={handleSubmit} autoComplete='off'>
                        <MyTexInput name='name' placeholder='name' />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}

                            loading={isSubmitting} floated='right' positive type='submit' content='Submit' />
                    
                        <Button as={Link} to='/pets' floated='right' type='button' content='Cancel' />
                        <Button floated='right'
                            onClick={() => { petStore.deletePet(pet.id!) }}
                            style={{ marginLeft: '3px' }}
                            negative content='Delete Pet' />

                    </Form>

                )}

            </Formik>

        </Segment>
    )
})