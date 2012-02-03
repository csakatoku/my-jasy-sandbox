(function(globals, undef) {
    var __snakeToCamelMemo = {};

    core.Module('r.util.String', {
        snakeToCamel: r.util.Functional.memoize(__snakeToCamelMemo, function(str) {
            var seq = str.split('_');
            var result = seq[0];
            var length = seq.length;
            if (length > 1) {
                for (var i = 1; i < length; i++) {
                    var x = seq[i];
                    result += (x.charAt(0).toUpperCase() + x.substr(1));
                }
            }
            return result;
        })
    });
}(this));
