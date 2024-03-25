export default class OrderPage {
  get nameInput() { return $('#order_name'); }
  get addressTextArea() { return $('#order_address'); }
  get emailInput() { return $('#order_email'); }
  get payTypeSelect() { return $('#order_pay_type'); }
  get placeOrderButton() { return $('.submit [type="submit"]'); }

  async fillForm(formData) {
    const { name, address, email, payType } = formData;
    await this.nameInput.setValue(name);
    await this.addressTextArea.setValue(address);
    await this.emailInput.setValue(email);
    await this.payTypeSelect.selectByVisibleText(payType);
  }
}
