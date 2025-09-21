import {formatCurrency} from '../scripts/money.js';
describe('tests small numbers', ()=>{
  it ('tests this', ()=>{
    expect(formatCurrency(12899)).toEqual('128.99');
    expect(formatCurrency(12869)).toEqual('128.69');
    expect(formatCurrency(1343)).toEqual('13.43');
    expect(formatCurrency(100089)).toEqual('1,000.89');
  })
  it('tests big numbers', ()=>{
    expect(formatCurrency(1000.987)).toEqual('10.01');
  })
});
