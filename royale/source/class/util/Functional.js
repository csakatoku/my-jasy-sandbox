(function(globals, undef) {
    core.Module('r.util.Functional', {
        memoize: function(func) {
            var memo = {};
            return function(value) {
                if (memo[value] !== undef) {
                    return memo[value];
                }
                return memo[value] = func(value);
            };
        }
    });
}(this));
