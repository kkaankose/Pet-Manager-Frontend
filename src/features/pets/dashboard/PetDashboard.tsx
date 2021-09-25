import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import PetList from './PetList';



export default observer(function PetDashboard() {

    const { petStore } = useStore();
    const { loadPets, petRegistry } = petStore;

    useEffect(() => {
        if(petRegistry.size <=1) loadPets();
    }, [petRegistry.size,loadPets])

    if (!petStore.isLoaded)
        return <LoadingComponent content='Loading Pets' />
    return (
        <Grid>
            <Grid.Column
                width='16'>
                {petRegistry.size > 0 ? <PetList
                /> : <div>
                    <h1>You have not any pet,yet</h1>
                </div>
                }

            </Grid.Column>

        </Grid>
    )
})