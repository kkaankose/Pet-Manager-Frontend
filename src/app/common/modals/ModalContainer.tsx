import { observer } from 'mobx-react-lite';
import React from 'react';
import { Modal } from 'semantic-ui-react';
import { useStore } from '../../stores/store';

// Modal'lara bak

export default observer(function ModalContainer() {
    const { modalStore : {modal,closeModal} } = useStore();
    return (
        <Modal
            open={modal.open}
            close={closeModal}
            size='mini'>
            <Modal.Content>
                {modal.body}
            </Modal.Content>
        </Modal>
    )
})