import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";

export default class UserStore {
  loggedUser: User | undefined = undefined;
  userTest: User | null = null;
  userRegistry = new Map<number, User>();
  editMode = false;
  isLoaded: boolean = false;
  loading: boolean = false;
  loadingInitial: boolean = false;

  // mobx bak
  
  constructor() {
    makeAutoObservable(this);
  }
  setLoggedUser = (user: User) => {
    this.loggedUser = user;
  };

  deleteUser = async (id: number) => {
    try {
      this.userRegistry.delete(id);
      await agent.Users.delete(id).then(this.logout);
    } catch (error) {
      console.log(error);
    }
  };

  loadUser = async (id: number) => {
    let user = await agent.Users.details(id);
    if (user) {
      runInAction(() => {
        if (user.id === this.userTest!.id) {
          this.userTest = user;
        }else{
          history.push('/users');
        }
      });
      return user;
    }
  };

  get allUsers() {
    return Array.from(this.userRegistry.values());
  }

  get isLoggedIn() {
    return !!this.userTest;
  }
  private setUsername = (username: string) => {
    this.userTest!.name = username;
  };
  private setSurname = (surname: string) => {
    this.userTest!.surname = surname;
  };
  login = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.login(creds);
      store.commonStore.setToken(user.token);
      store.commonStore.setId(user.id.toString());
      runInAction(() => (this.userTest = user));
      history.push("/users");
      store.modalStore.closeModal();
    } catch (error) {
      console.log(error);
    }
  };
  logout = () => {
    store.commonStore.setToken(null);
    store.commonStore.setId(null);
    window.localStorage.removeItem("jwt");
    window.localStorage.removeItem("id");
    this.userTest = null;
    history.push("/");
  };

  getUser = async (id: number) => {
    try {
      const user = await agent.Account.current(id);
      runInAction(() => (this.userTest = user));
    } catch (error) {
      console.log(error);
    }
  };
  register = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.register(creds);
      runInAction(() => {
        this.loggedUser = user;
        this.isLoaded = true;
        this.setUser(user);
      });
      history.push("/");
      store.modalStore.closeModal();

      console.log(this.userRegistry);
    } catch (error) {
      console.log(error);
    }
  };

  loadUsers = async () => {
    this.loadingInitial = true;
    try {
      const users = await agent.Users.list();

      users.forEach((user) => {
        this.setUser(user);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  private setUser = (user: User) => {
    this.userRegistry.set(user.id, user);
  };

  updateUser = async (user: Partial<User>) => {
    this.loading = true;
    try {
      await agent.Users.update(user);
      runInAction(() => {
        this.setUsername(user.name!);
        this.setSurname(user.surname!);
        this.userTest = { ...this.userTest, ...(user as User) };
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
