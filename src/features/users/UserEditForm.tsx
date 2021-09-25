import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useStore } from '../../app/stores/store';
import { User, UserEditFormValues } from '../../app/models/user';
import MyTexInput from '../../app/common/form/MyTextInput';




export default observer(function UserEditForm() {
    const history = useHistory();
    const { userStore } = useStore();
    const { updateUser, loadUser} = userStore; // direkt updateUser'ı çağırmanı sağlıyor userStore.updateUser demek yerine
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<Partial<User>>(new UserEditFormValues());

    const validationSchema = Yup.object({
        name: Yup.string().required('The  username required!'),
        surname: Yup.string().required('The surname required!'),

    })


    useEffect(() => {
        if (id) loadUser(parseInt(id)).then(user => setUser(new UserEditFormValues(user)))
    }, [id, loadUser]);


    function handleFormSubmit(user: UserEditFormValues) {

        if (user.name) {
            updateUser(user).then(() => history.push(`/users`))
        }
    }


    console.log(user);

    return (

        <Segment clearing>
            <Header content='User Details' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={user as UserEditFormValues}
                onSubmit={handleFormSubmit}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form'
                        onSubmit={handleSubmit} autoComplete='off'>
                        <MyTexInput name='name' placeholder='Username' />
                        <MyTexInput name='surname' placeholder='Surname' />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting} floated='right' positive type='submit' content='Submit' />
                        <Button as={Link} to='/users' floated='right' type='button' content='Cancel' />
                        <Button floated='right'
                            type="button"
                            onClick={() => { userStore.deleteUser(user.id!) }}
                            style={{ marginLeft: '3px' }}
                            negative content='Delete you account' />
                    </Form>

                )}

            </Formik>

        </Segment>
    )
})