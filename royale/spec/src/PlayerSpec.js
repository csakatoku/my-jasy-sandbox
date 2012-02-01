describe('player', function() {
    it('has initially 100 coins', function() {
        var player = new r.model.Player();
        expect(player.getCoins()).toBe(100);
    });

    it('invokes `player.missions.progress` event', function() {
        var player = new r.model.Player();
        var observer = new r.Observable();
        var progress = null;
        observer.listen('player.missions.progress', function(value) {
            progress = value;
        });
        player.progressMission(1, 10);

        expect(progress).toBe(10);
    });

    it('invokes `player.missions.master` event only once per missions', function() {
        var player = new r.model.Player();
        var observer = new r.Observable();
        var missionId = 0;
        observer.listen('player.missions.master', function(value) {
            missionId += value;
        });

        player.progressMission(1, 100);
        expect(missionId).toBe(1);

        player.progressMission(1, 100);
        expect(missionId).toBe(1);
    });
});
