(function(globals, undef) {
    var __snakeToCamelMemo = {};
    var __snakeToPascalMemo = {};

    var snakeToPascal = function(str) {
        var i, x,
            seq = str.split('_'),
            result = '',
            length = seq.length;
        for (i = 0; i < length; i++) {
            x = seq[i];
            result += (x.charAt(0).toUpperCase() + x.substr(1));
        }
        return result;
    };

    core.Module('r.util.String', {
        snakeToCamel: r.util.Functional.memoize(__snakeToCamelMemo, function(str) {
            var pascal = snakeToPascal(str);
            return pascal.charAt(0).toLowerCase() + pascal.substr(1);
        }),

        snakeToPascal: r.util.Functional.memoize(__snakeToPascalMemo, snakeToPascal)
    });
}(this));
