/**
 * #asset(myassets/*)
 */
core.Class('myassets.App', {
    construct: function(settings) {
        var images = [
            'myassets/images/1.jpg',
            'myassets/images/2.jpg',
            'myassets/images/3.jpg',
            'myassets/images/4.jpg',
            'myassets/images/5.jpg'
        ];
        core.io.Asset.load(images, function(data) {
            var content = document.getElementById("content");
            images.forEach(function(key) {
                //console.log(data[key]);
                content.appendChild(data[key].node);
            });
        });
    }
});
