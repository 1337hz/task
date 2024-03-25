export default class HomePage {

  async visit(page = 1) {
    await browser.url(`agency?page=${page}`);
    await this.intro.waitForDisplayed({ timeout: 3000 });
  }

  get url() { return browser.getUrl(); }
  get intro() { return $("#intro") }
  get notice() { return $("#notice") }

  //To be honest I would replace it with API call to retrieve id of puppy
  //And then generate url to speed up test execution
  async openPuppyDetailsByName(name) {
    let puppyFound = false;

    while (!puppyFound) {
      // Call the smaller function to retrieve the item with the desired puppy details
      const item = await this.getPuppyDetailsByName(name);

      // If the item is found, click the details button and set puppyFound to true
      if (item) {
        const detailsButton = await item.$('.view input[type="submit"]');
        await detailsButton.click();
        puppyFound = true;
      } else {
        // Check if there's a next page
        const nextPageLink = await $('.pagination .next_page');
        if (nextPageLink.isExisting()) {
          await nextPageLink.click();
        } else {
          throw new Error("Puppy not found, check your test data!");
        }
      }
    }
  }

  async getPuppyDetailsByName(name) {
    const puppyListItems = await $$('.puppy_list');

    for (const item of puppyListItems) {
      const puppyName = await item.$('.name h3').getText();
      // Check if the puppy name matches the desired name
      if (puppyName === name) {
        return item;
      }
    }
  }
}
