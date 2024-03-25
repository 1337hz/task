import { faker } from '@faker-js/faker';

export function generateCustomerData() {
  return {
    name: faker.person.firstName(),
    address: faker.location.streetAddress(),
    email: faker.internet.email()
  };
}
export const ADDITIONAL_PRODUCT = Object.freeze({
  'COLLAR': "collar",
  'TOY': 'toy',
  'CARRIER': 'carrier',
  'VET': 'vet'
});


export const PAYMENT_TYPE = Object.freeze({
  CREDIT_CARD: "Credit card"
})
