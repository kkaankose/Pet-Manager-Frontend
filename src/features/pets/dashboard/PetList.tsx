import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';
import { Pet } from '../../../app/models/pet';
import { useStore } from '../../../app/stores/store';
import PetListItem from './PetListItem';



export default observer(function ActivityList() {
    const { petStore } = useStore();
    const { allPets } = petStore;
    return (
        <Container>
            {allPets.map((pet: Pet) => <PetListItem key={pet.id} pet={pet} />)}
        </Container>
    )
})
