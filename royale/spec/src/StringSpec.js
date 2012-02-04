describe('util.String', function() {
    it('has snakeToCamel function which convert "snake_case" to "snakeCase"', function() {
        var func = r.util.String.snakeToCamel;
        expect(func("snake_case")).toBe("snakeCase");
        expect(func("snake_case")).toBe("snakeCase"); // test memoize
    });

    it('has snakeToPascal function which convert "snake_case" to "SnakeCase"', function() {
        var func = r.util.String.snakeToPascal;
        expect(func("snake_case")).toBe("SnakeCase");
        expect(func("snake_case")).toBe("SnakeCase"); // test memoize
    });
});
