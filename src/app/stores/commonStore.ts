import { makeAutoObservable, reaction } from "mobx";

export default class CommonStore {
  token: string | null = window.localStorage.getItem("jwt");
  id: string | null = window.localStorage.getItem("id");
  appLoaded = false;


  

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.setItem("jwt", token);
        } else {
          window.localStorage.removeItem("jwt");
        }
      }
    );

    reaction(
      () => this.id,
      (id) => {
        if (id) {
          window.localStorage.setItem("id", id);
          //   window.localStorage.setItem('id',id);
        } else {
          window.localStorage.removeItem("id");
          // window.localStorage.removeItem('id');
        }
      }
    );
  }

  setToken = (token: string | null) => {
    this.token = token;
  };
  setId = (id: string | null) => {
    this.id = id;
  };

  setAppLoaded =  () => {
    
    this.appLoaded = true;
  };
  changeAppStatus = (val:boolean) => {
     
    this.appLoaded = val;
  };
}
