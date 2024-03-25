export default class PuppyDetailsPage {
  get returnButton() { return $('//a[text()="Return to List"]'); }
  get fee() { return $('span.fees'); }
  get adoptMeButton() {
    return $('input.rounded_button[type="submit"][value="Adopt Me!"]');
  }
}
