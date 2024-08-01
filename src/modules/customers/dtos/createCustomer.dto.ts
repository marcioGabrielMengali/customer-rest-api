export class createCustomerDto {
  id?: string;
  firstName: string;

  constructor(firstName: string) {
    this.firstName = firstName;
  }
}
