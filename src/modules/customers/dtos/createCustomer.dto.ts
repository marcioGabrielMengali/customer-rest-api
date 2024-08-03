export class createCustomerDto {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthDate: Date;
  street: string;
  number: number;
  city: string;
  state: string;
  country: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    birthDate: Date,
    street: string,
    number: number,
    city: string,
    state: string,
    country: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.birthDate = birthDate;
    this.street = street;
    this.number = number;
    this.city = city;
    this.state = state;
    this.country = country;
  }
}
