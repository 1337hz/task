import HomePage from "../pom/homePage.js";
import PuppyDetailsPage from "../pom/puppyDetails.js";
import CartPage from "../pom/cartPage.js"
import OrderPage from "../pom/orderPage.js";
import { generateCustomerData, ADDITIONAL_PRODUCT, PAYMENT_TYPE } from "../utils/data.js";
import { extractPriceValueFromString } from "../utils/helpers.js";

const homePage = new HomePage();
const puppyDetailsPage = new PuppyDetailsPage();
const cartPage = new CartPage();
const orderPage = new OrderPage();


// Note: The code would be organized better if tests were more focused around specific features.
// It would have enabled usage of setup by api-calls and usage of tests hooks like before/beforeEach

describe('Puppy Adoption Scenarios', () => {
  it('1. View details for the puppy Hanna, return to the puppy list @one', async () => {
    await homePage.visit();
    await homePage.openPuppyDetailsByName("Hanna");

    await puppyDetailsPage.returnButton.click();

    await expect(homePage.intro).toBeDisplayed();
  });

  it('2. Verify that the puppy Maggie May is on the first page @two', async () => {
    await homePage.visit();

    await expect(await homePage.url).toMatch(/page=1/);
    await expect(homePage.getPuppyDetailsByName("Maggie Mae")).toBePresent();
  });

  it('3. Verify that the puppy Tipsy is on the second page @three', async () => {
    await homePage.visit(2);

    await expect(await homePage.url).toMatch(/page=2/);
    await expect(homePage.getPuppyDetailsByName("Tipsy")).toBePresent();
  });

  it('4. View the details for Twinky, and verify that their adoption fee is $22.50 @four', async () => {
    await homePage.visit();
    await homePage.openPuppyDetailsByName("Twinkie");

    await expect(puppyDetailsPage.fee).toHaveText(
      expect.stringContaining('£22.50'));
  });

  it('5. View the details for Spud, click the Adopt Me! button, and then click the change your mind button @five', async () => {
    await homePage.visit();
    await homePage.openPuppyDetailsByName("Spud");
    await puppyDetailsPage.adoptMeButton.click();

    await cartPage.changeYourMindButton.click();
    await expect(await homePage.notice).toHaveText('Your cart is currently empty');
  });

  it('6. View the details for Hanna, click the Adopt Me! button, click the Adopt Another Puppy button, and adopt Maggie Mae @six', async () => {
    await homePage.visit();
    await homePage.openPuppyDetailsByName("Hanna");
    await puppyDetailsPage.adoptMeButton.click();
    await cartPage.adoptAnotherPuppyButton.click();

    await homePage.openPuppyDetailsByName("Maggie Mae");
    await puppyDetailsPage.adoptMeButton.click();

    await expect(cartPage.getPuppyInCartByName("Hanna")).toBePresent();
    await expect(cartPage.getPuppyInCartByName("Maggie Mae")).toBePresent();
  });

  it('7. Complete the adoption with credit card, and verify the adoption has been completed @seven', async () => {
    await homePage.visit();
    await homePage.openPuppyDetailsByName("Brook");
    await puppyDetailsPage.adoptMeButton.click();
    await cartPage.completeTheAdoptionButton.click();

    const orderData = generateCustomerData();
    await orderPage.fillForm({ ...orderData, payType: PAYMENT_TYPE.CREDIT_CARD });
    await orderPage.placeOrderButton.click();

    await expect(await homePage.notice).toHaveText('Thank you for adopting a puppy!');
  });

  it('8. Adopt Brook and add a travel carrier, and verify that the total amount has increased by the price of the carrier @eight', async () => {
    await homePage.visit();
    await homePage.openPuppyDetailsByName("Brook");
    await puppyDetailsPage.adoptMeButton.click();
    await cartPage.selectAdditionalProductByPuppyName("Brook", ADDITIONAL_PRODUCT.CARRIER);

    const carrierPriceText = await cartPage.getAdditionalProductPrice(ADDITIONAL_PRODUCT.CARRIER);
    const dogPriceText = await cartPage.getPuppyPriceText();
    const carrierPriceValue = extractPriceValueFromString(carrierPriceText);
    const dogPriceValue = extractPriceValueFromString(dogPriceText);

    const assertionString = `£${(carrierPriceValue + dogPriceValue).toFixed(2)}`;

    await expect(await cartPage.totalPrice).toHaveText(assertionString);
  });

  it('9. Adopt Brook and Maggie Mae. Add a first vet visit and a collar and leash for Brook, and add a travel carrier for Maggie Mae. Complete the adoption with a credit card, and verify the adoption has been completed @nine', async () => {
    await homePage.visit();
    await homePage.openPuppyDetailsByName("Brook");
    await puppyDetailsPage.adoptMeButton.click();
    await cartPage.adoptAnotherPuppyButton.click();
    await homePage.openPuppyDetailsByName("Maggie Mae");
    await puppyDetailsPage.adoptMeButton.click();

    await cartPage.selectAdditionalProductByPuppyName("Brook", ADDITIONAL_PRODUCT.VET);
    await cartPage.selectAdditionalProductByPuppyName("Brook", ADDITIONAL_PRODUCT.COLLAR);
    await cartPage.selectAdditionalProductByPuppyName("Maggie Mae", ADDITIONAL_PRODUCT.CARRIER);

    await cartPage.completeTheAdoptionButton.click();
    const orderData = generateCustomerData();
    await orderPage.fillForm({ ...orderData, payType: PAYMENT_TYPE.CREDIT_CARD });
    await orderPage.placeOrderButton.click();

    await expect(await homePage.notice).toHaveText('Thank you for adopting a puppy!');
  });
});
