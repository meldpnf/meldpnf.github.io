import { test, expect } from '@playwright/test' ;
import instagramPosts from '../src/data/instagram.json' with { type: 'json' };
const categories = [
    { name: 'ASTROLOGY', hashtag :'#meily_astrology' },
    { name: 'COLLABS', hashtag: '#meily_collab' }
];

test('TC-001 - Classement MAIN', async ({ page }) => {
    await page.goto('https://meldpnf.github.io/visuals/');
    const mainHeading = page.getByRole('heading', { name: 'MAIN', exact: true });
    await expect(mainHeading).toBeVisible();
    const mainGallery = mainHeading.locator('xpath=following-sibling::div[1]');
    await expect(mainGallery).toBeVisible();
    const mainCards = mainGallery.locator('.card');
    await expect(mainCards.first()).toBeVisible();
    const mainPostId = await mainCards.first().getAttribute('data-id');
    expect(mainPostId).not.toBeNull();
    console.log(mainPostId);
    console.log('Nombre de cartes MAIN :', await mainCards.count());
    const mainPostIds = await mainCards.evaluateAll((cards) => cards.map((card) => card.getAttribute('data-id')));
    console.log('IDs MAIN :', mainPostIds);
    expect(mainPostIds).not.toContain(null);
    const expectedMainIds = instagramPosts.filter((post) => post.caption.includes('#meily_main')).map((post) => post.id);
    console.log('IDs MAIN attendus :', expectedMainIds);
    mainPostIds.sort();
    expectedMainIds.sort();
    expect(mainPostIds).toEqual(expectedMainIds); 
});

for (const category of categories) {
  test(`Classement ${category.name}`, async ({ page }) => {
    await page.goto('https://meldpnf.github.io/visuals/');
    const heading = page.getByRole('heading', { name: category.name, exact:true});
    await expect(heading).toBeVisible();
    const gallery = heading.locator('xpath=following-sibling::div[1]');
    const cards = gallery.locator('.card');
    await expect(cards.first()).toBeVisible();
    const displayedIds = await cards.evaluateAll((elements) => elements.map((element) => element.getAttribute('data-id')));
    const expectedIds = instagramPosts.filter((post) => post.caption.includes(category.hashtag)).map((post) => post.id);
    const idsToCheck = category.name === 'COLLABS'
     ? displayedIds.filter((id) => !id?.startsWith('collab-'))
     : displayedIds;

    idsToCheck.sort();
    expectedIds.sort();
    expect(idsToCheck).toEqual(expectedIds);
    console.log('Catégorie :', category.name, 'Hashtag :', category.hashtag, 'IDs attendus :', expectedIds.length);
  });
}
