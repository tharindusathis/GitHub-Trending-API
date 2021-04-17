import axios from 'axios';
import cheerio from 'cheerio';
import promiseRetry from 'promise-retry';
import { Repository } from './models/Repository';

const request = axios.create({
    timeout: 30 * 1000,
  });

const toNumber = (element: cheerio.Cheerio): number => {
    return  parseInt(element.text().trim().replace(',', '')) || 0 ;
}

const selectors = {
  repo: '.Box-row',
  name: 'h1 a'
}

const scrapeRepository = (element: cheerio.Cheerio): Repository => {
  const name = element ? (element.find(selectors.name).attr('href') || '').replace(/^\//, '') : '';
  return {
    name,
    url: `https://github.com/${name}`,
    description: element.find('p').text().trim(),
    language: element.find('[itemprop=programmingLanguage]').text().trim(),
    starsAdded: toNumber(element.find(`.float-sm-right`)),
    stars: toNumber(element.find(`[href*="/${name}/stargazers"]`)),
    forks: toNumber(element.find(`[href*="/${name}/network/members"]`)),
  };
}

export const scrape = async (url: string): Promise<Repository[]> => {

  let scrapedRepos : Repository[] = [];

  const response = await request(url, {
    headers: {
      Accept: 'text/html'
    }
  });
  
  const $ = cheerio.load(response.data);

  if($ == null){
    throw `Couldn't load DOM`;
  }

  const $repos = $(selectors.repo) || [];

  $repos.each( (idx, repo) => {
    scrapedRepos.push( scrapeRepository($(repo)) );
  });


  return scrapedRepos;
}