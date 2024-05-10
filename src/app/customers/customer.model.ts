export interface ICustomer {
  id?: number,
  name: string,
  lastName: string,
  phone: number,
  user: {
    id?: number;
    name: string;
    email: string;
    password: string;
  }
}
