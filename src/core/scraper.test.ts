import { Repository } from './models/Repository';
import * as scraper from './scraper';

test('scrape weekly trending repos', async() => {
    let repos: Repository[] = [];
    await scraper.scrapefromUrl('https://github.com/trending?since=weekly&spoken_language_code=en')
    .then(r => {
        console.log(r);
        repos = r;
    })
    .catch(e => console.log(e));

    expect(repos.length).toBeGreaterThan(0);
});