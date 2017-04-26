(function(document, window) {
    'use strict';

    var apiKey = '45d041d972bf26f08aaa28da1dff428f';
    var apiURL = 'https://api.flickr.com/services/rest/?&method=flickr.photos.search&';
    var imgURL = 'https://farm2.staticflickr.com/';

    var search = document.getElementById("query");
    var images = document.getElementById("images");

    var selectedImages = 0;
    var pages = 300;

    document.getElementById("reset").onclick = function () {
        location.reload();
    };

    document.getElementById("button").onclick = function(event) {
        event.preventDefault();
        var url = buildUrl();

        var r = new XMLHttpRequest();
        r.open("GET", url, true);
        r.onreadystatechange = function () {
            if (r.readyState != 4 || r.status != 200) return;

            var data = JSON.parse(r.responseText);

            for (var i = 0; i < pages; i++) {
                var button = document.createElement('button');

                button.onclick = function () {
                    var img = this.querySelector("img");
                    if(img.className == "img") {
                        selectedImages++;
                        img.className = "img btn btn-info";
                        img.id = selectedImages;
                        document.getElementById('album-button').style.display = "inline";
                    }
                    else {
                        img.className = "img";
                        img.removeAttribute('id');
                        selectedImages--;
                        if(selectedImages == 0) {
                            document.getElementById('album-button').style.display = "none";
                      }
                    }
                };

                var img = document.createElement('img');
                img.src = imgURL + data.photos.photo[i].server + '/' + data.photos.photo[i].id + '_' + data.photos.photo[i].secret + '.jpg';
                img.className = "img";
                button.append(img);
                document.getElementById("images").appendChild(button);
            }
        };
        r.send(url);
    };

    document.getElementById("album-button").onclick = function () {
        var images = document.getElementById('images').getElementsByTagName('img');
        var gallery = document.getElementById('gallery');
        var thumbnails = document.getElementById('thumbnails');
        var bigImage = document.getElementById('bigImage');

        for( var i = 0; i < pages; i++ )
        {
            var id = parseInt(i + 1);

            var image = document.getElementById(id);

            if(image) {
                image.className = "img-gallery";

                image.onclick = function (event) {
                    var switchImg = document.getElementById(event.currentTarget.id);
                    var clone = switchImg.cloneNode(true);
                    clone.removeAttribute('class');
                    bigImage.innerHTML = "";
                    bigImage.appendChild(clone);
                };

                thumbnails.appendChild(image);

            }

        }
        var image = document.getElementById(1);
        var clone = image.cloneNode(true);
        clone.removeAttribute('class');

        bigImage.appendChild(clone);
        document.getElementById('images').style.display = "none";
        gallery.style.display = "inline";
    };

    function buildUrl() {
        return apiURL+ "api_key="+ apiKey + "&text=" + search.value + "&per_page=" + pages + "&format=json&nojsoncallback=?";
    }




})(document, window);