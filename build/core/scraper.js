"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapefromUrl = exports.scrape = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const urls_1 = require("./urls");
const request = axios_1.default.create({
    timeout: 30 * 1000,
});
const toNumber = (element) => {
    return parseInt(element.text().trim().replace(',', '')) || 0;
};
const selectors = {
    repo: '.Box-row',
    name: 'h1 a'
};
const scrapeRepository = (element) => {
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
};
const scrape = async (trendingParams) => {
    return exports.scrapefromUrl(urls_1.generateUrl(trendingParams));
};
exports.scrape = scrape;
const scrapefromUrl = async (url) => {
    let scrapedRepos = [];
    const response = await request(url, {
        headers: {
            Accept: 'text/html'
        }
    });
    const $ = cheerio_1.default.load(response.data);
    if ($ == null) {
        throw `Couldn't load DOM`;
    }
    const $repos = $(selectors.repo) || [];
    $repos.each((idx, repo) => {
        scrapedRepos.push(scrapeRepository($(repo)));
    });
    return scrapedRepos;
};
exports.scrapefromUrl = scrapefromUrl;
