(function(globals, undef) {
    core.Module('r.util.Functional', {
        memoize: function(memo, func) {
            return function(value) {
                if (memo[value] !== undef) {
                    return value;
                }
                return memo[value] = func(value);
            };
        }
    });
}(this));
