export default class CartPage {
  get changeYourMindButton() {
    return $('input.rounded_button[type="submit"][value="Change your mind"]');
  }

  get adoptAnotherPuppyButton() {
    return $('input.rounded_button[type="submit"][value="Adopt Another Puppy"]');
  }

  get completeTheAdoptionButton() {
    return $('input.rounded_button[type="submit"][value="Complete the Adoption"]');
  }

  get puppyPrice() { return $('.item_price'); }
  get totalPrice() { return $('.total_cell'); }

  async getPuppyInCartByName(name) {
    return $(`h2.*=${name}`);
  }

  async getAdditionalProductPrice(product) {
    const checkboxElement = await $(productMap[product]);
    if (!checkboxElement) {
      throw new Error(`Checkbox element "${checkboxName}" not found.`);
    }

    const parentElement = await checkboxElement.$('..');
    if (!parentElement) {
      throw new Error(`Parent element of checkbox "${checkboxName}" not found.`);
    }

    return await parentElement.getText();
  }

  async getPuppyPriceText() {
    return this.puppyPrice.getText();
  }

  async selectAdditionalProductByPuppyName(name, product) {
    const h2WithDog = await $('h2*=' + name);
    const tr = await h2WithDog.$('..').$('..'); // TR with puppy name
    const tr1 = await tr.nextElement(); // Skip additional services header

    // Define checkboxes with corresponding product names
    const checkboxes = {
      ADDI: await tr1.nextElement().$("#collar"),
      toy: await tr1.nextElement().nextElement().$("#toy"),
      carrier: await tr1.nextElement().nextElement().nextElement().$("#carrier"),
      vet: await tr1.nextElement().nextElement().nextElement().nextElement().$("#vet")
    };

    // Check the checkbox corresponding to the product
    if (checkboxes[product]) {
      await checkboxes[product].click();
    }
  }
}

const productMap = Object.freeze({
  'collar': '#collar',
  'toy': '#toy',
  'carrier': 'input[type="checkbox"][name="carrier"]',
  'vet': 'input[type="checkbox"][name="vet"]'
});

