import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import PetStore from "./petStore";
import UserStore from "./userStore";

// hook araştır

interface Store {
    petStore: PetStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    
}

export const store: Store = {
    petStore: new PetStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
} 