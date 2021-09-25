import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Pet, PetFormModel } from "../models/pet";
import { User, UserFormValues } from "../models/user";
import { store } from "../stores/store";
import { history } from "../..";
const sleep = (delay:number)=>{
  return new Promise((resolve)=>{
      setTimeout(resolve,delay);
  })
}

axios.defaults.baseURL = "http://localhost:8080";
axios.interceptors.response.use(
  async (response) => {
    await sleep(500);
    return response;
  },
  (error: AxiosError) => {
    const { status } = error.response!;
    switch (status) {
      case 401:
        toast.error("Unauthorized");
        break;
      case 404:
        history.push("/not-found");
        break;
      case 400:
        toast.error("Invalid email or password");
        break;
    }
    return Promise.reject(error);
  }
);

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;
const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Account = {
  current: (id: number) => requests.get<User>(`user/${id}`),
  login: (user: UserFormValues) => requests.post<User>("/auth/login", user),
  register: (user: UserFormValues) =>
    requests.post<User>("/auth/register", user),
};

//Available end points

//list --> allpets
// details -> for pet with given id
// create-update-delete
const Pets = {
  list: () => requests.get<Pet[]>("/pet"),
  details: (id: number) => requests.get<Pet>(`/pet/${id}`),
  create: (pet: PetFormModel) => requests.post<void>("/pet", pet),
  update: (pet: Partial<Pet>) => requests.put<void>(`/pet/${pet.id}`, pet),
  delete: (id: number) => requests.del<void>(`/pet/${id}`),
};

//list --> allusers
// details -> for pet with given id
// create-update-delete
const Users = {
  list: () => requests.get<User[]>("/user"),
  details: (id: number) => requests.get<User>(`/user/${id}`),
  create: (user: UserFormValues) => requests.post<void>("/user", user),
  update: (user: Partial<User>) => requests.put<void>(`/user/${user.id}`, user),
  delete: (id: number) => requests.del<void>(`/user/${id}`),
};

const agent = {
  Pets,
  Account,
  Users,
};
export default agent;
