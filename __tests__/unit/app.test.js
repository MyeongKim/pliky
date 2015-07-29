// __tests__/sum-test.js
// mypage react component test
// case1 -- click, change, keydown..
// case2 -- text check
// todo If owner is accessed component changes
// todo After uploading image recentHistory box color is changed(green)
// todo After uploading image imageBox array changes
// todo After uploading image reactAct array changes
// todo After follow user the number changes
// todo Current align name is same with images property

jest.dontMock('./sum');

describe('sum', function() {
    it('adds 1 + 2 to equal 3', function() {
        var sum = require('./sum');
        expect(sum(1, 2)).toBe(3);
    });
});

