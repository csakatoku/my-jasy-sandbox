test('Player initial coins', function() {
    var player = new r.model.Player();
    same(100, player.getCoins(), 'player has 100 coins');
});

test('mission progress event', function() {
    var player = new r.model.Player();
    var observer = new r.Observable();
    var progress = null;
    observer.listen('player.missions.progress', function(value) {
        progress = value;
    });

    player.progressMission(1, 10);
    same(10, progress, 'player.progressMission invokes `player.missions.progress` event');
});

test('mission progress event', function() {
    var player = new r.model.Player();
    var observer = new r.Observable();
    var missionId = 0;
    observer.listen('player.missions.master', function(value) {
        missionId += value;
    });

    player.progressMission(1, 100);
    same(1, missionId, '`player.missions.master` event is invoked when the player mastered a mission');

    player.progressMission(1, 100);
    same(1, missionId, '`player.missions.master` event is invoked only one time');
});
