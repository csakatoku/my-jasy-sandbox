describe('observerable', function() {
    it('should listen to events', function() {
        var o = new r.Observable();
        var count = 0;
        o.listen('test.event', function() {
            count += 1;
        });

        o.invoke('test.event');
        o.invoke('test.event');
        o.invoke('test.event');
        expect(count).toBe(3);
    });

    it('should be unregistered from the event dispatcher by calling `obj.unregister(type)`', function() {
        var o = new r.Observable();
        o.listen('test.event', function() {});
        var events = o.unregister('test.event');

        expect(events).toEqual(['test.event']);
    });

    it('should be unregisted completely from the event dispatcher by calling `obj.unregister()`', function() {
        var o = new r.Observable();
        o.listen('test.event1', function() {});
        o.listen('test.event2', function() {});
        var events = o.unregister();
        expect(events).toEqual(['test.event1', 'test.event2']);
    });
});
