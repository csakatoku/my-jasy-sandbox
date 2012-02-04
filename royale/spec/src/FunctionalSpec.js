describe('util.Functional', function() {
    it('has a memoize', function() {
        var count = 0;
        var memo = {};
        var func = r.util.Functional.memoize(memo, function(x) {
            count += 1;
            return x * x;
        });

        expect(func(3)).toBe(9);
        expect(count).toBe(1);

        expect(func(3)).toBe(9);
        expect(count).toBe(1);
    });
});
