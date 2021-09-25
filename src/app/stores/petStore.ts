import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";
import { history } from "../..";
import agent from "../api/agent";
import { Pet, PetFormModel } from "../models/pet";

export default class PetStore {
  petRegistry = new Map<number, Pet>();
  selectedPet: Pet | undefined = undefined;
  editMode = false;
  isLoaded: boolean = false;
  loading: boolean = false;
  deletingPet: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  createPet = async (pet: PetFormModel) => {
    try {
      await agent.Pets.create(pet).then(this.loadPets);
      history.push("/pets");
      toast.success(`${pet.name!} created successfully!`);
    } catch (error) {
      console.log(error);
    }
  };

  get allPets() {
    return Array.from(this.petRegistry.values());
  }

  updatePet = async (pet: Partial<Pet>) => {
    try {
      this.selectedPet = this.getPet(pet.id!);
      await agent.Pets.update(pet);
      runInAction(() => {
        this.setPetName(pet.name!);
        this.selectedPet = { ...this.selectedPet, ...(pet as Pet) };
      });
    } catch (error) {
      console.log(error);
    }
  };

  loadPets = async () => {
    try {
      const pets = await agent.Pets.list();
      runInAction(() => {
        pets.forEach((pet) => {
          this.setPet(pet);
        });
        this.isLoaded = true;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.isLoaded = true;
      });
    }
  };

  private setPet = (pet: Pet) => {
    this.petRegistry.set(pet.id, pet);
  };

  private setPetName = (name: string) => {
    this.selectedPet!.name = name;
  };

  private getPet = (id: number) => {
    return this.petRegistry.get(id);
  };

  loadPet = async (id: number) => {
    let pet = await agent.Pets.details(id);
    if (pet) {
      this.selectedPet = pet;
      return pet;
    }
  };

  deletePet = async (id: number) => {
    try {
      this.petRegistry.delete(id);
      await agent.Pets.delete(id);
      runInAction(() => {
        toast.info(`Pet deleted!`);
        this.loadPets();
      });
    } catch (error) {
      console.log(error);
    }
  };

  setIsLoaded = (value: boolean) => {
    this.isLoaded = value;
  };

  setEditMode = (value: boolean) => {
    this.editMode = value;
  };
}
