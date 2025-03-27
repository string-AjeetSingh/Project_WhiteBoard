


function add(x, y) {
    return x + y;
}

test('new test', () => {
    console.log("the new test is here");
    expect(add(5, 6)).toEqual(11);
})



