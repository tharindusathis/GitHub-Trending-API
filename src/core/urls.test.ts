import * as urls from './urls';

test('url: weekly c++ english', () => {
    const url = urls.generateUrl(
        {
            language: 'c++',
            since: 'weekly',
            spoken_language_code: 'en'
        }
    );

    expect(url).toBe('https://github.com/trending/c++?since=weekly&spoken_language_code=en');
});