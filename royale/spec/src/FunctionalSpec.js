describe('util.Functional', function() {
    it('has a memoize', function() {
        var count = 0;
        var func = r.util.Functional.memoize(function(x) {
            count += 1;
            return x * x;
        });

        var func2 = r.util.Functional.memoize(function(x) {
            count += 1;
            return x * x * x;
        });

        expect(func(3)).toBe(9);
        expect(count).toBe(1);

        expect(func(3)).toBe(9);
        expect(count).toBe(1);

        expect(func2(3)).toBe(27);
        expect(count).toBe(2);

        expect(func2(3)).toBe(27);
        expect(count).toBe(2);
    });
});
