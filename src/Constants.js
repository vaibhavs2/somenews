/* @flow strict-local */
import type {DomainObject} from './types';
export const DOMAINS: Array<{text: string, domain: string}> = [
  {text: 'Bloomberg', domain: 'bloomberg.com'},
  {text: 'Techcrunch', domain: 'techcrunch.com'},
  {text: 'The Hindu', domain: 'thehindu.com'},
  {text: 'NDTV', domain: 'ndtv.com'},
  {text: 'BBC', domain: 'bbc.com'},
  {text: 'The New Your Times', domain: 'nytimes.com '},
  {text: 'Forbes', domain: 'forbes.com'},
  {text: 'Money Magzine', domain: 'money.com'},
  {text: 'Aljazeera', domain: 'aljazeera.com'},
  {text: 'The Wall Street Journal', domain: 'wsj.com'},
  {text: 'The Washington Post', domain: 'washingtonpost.com'},
  {text: 'The Economist', domain: 'economist.com'},
  {text: 'The Wire', domain: 'thewire.in'},
].sort(() => Math.random() - 0.5);
