$(document).ready(function() {

    var AllPagesScripts = function () {
        $('.has-children-js').hover(function () {
            $(this).find('.dropdown-js').stop().slideDown(200);
        }, function () {
            $(this).find('.dropdown-js').stop().slideUp(200);
        });

        $('.open-call-me').click(function () {
            $('.modals__bg-js').addClass('active');
            $('.modals__call-me').addClass('active');
            $('body').addClass('overflow-hidden');
            return false;
        });

        $('.close-modal-js, .modals__bg-js').click(function () {
            $('.modals__bg-js').removeClass('active');
            $('.modal-js').removeClass('active');
            $('body').removeClass('overflow-hidden');
            return false;
        });


        $('.products-3-holder').each(function () {
            var $this_ = $(this);
            var lengthProIt = $this_.find('.product-item').length;
            var diff = 3 - lengthProIt;
            if ( lengthProIt ) {
                for (var i = 0; diff > i; i += 1) {
                    $this_.append('<div class="product-item-blank"></div>');
                }
            }
        });

        (function() {
            var $this_ = $('.about-post');
            var thisLength = $this_.length;
            var diff = 3 - thisLength % 3;
            if ( thisLength ) {
                for (var i = 0; diff > i; i += 1) {
                    $this_.parent().append('<div class="about-post-blank"></div>');
                }
            }
        }());
    };

    var FrontPageScripts = function () {
        var pagerLength = $('.bx-slider li').length;
        $('.bx-slider').bxSlider({
            auto: true,
            autoStart: true,
            controls: false,
            slideWidth: 0
        });
        $('.home-slider .bx-default-pager').width( pagerLength*25 + 'px' );
    };
    
    var CatalogScripts = function () {
        $('.cat-has-children-js > a').click(function () {
            var $this_ = $(this).parent();
            if(!$this_.hasClass('active')) {
                $this_.addClass('active');
                $this_.find('.cat-dropdown-js').slideDown();
            } else {
                $this_.removeClass('active');
                $this_.find('.cat-dropdown-js').slideUp();
            }
            return false;
        });
    };
    
    var addCssLink = function (csslink) {
        var addLink = '<link rel="stylesheet" href="' + csslink + '">';
        var getHead = document.getElementsByTagName('head')[0];
        getHead.innerHTML += addLink;
    };

    
    var GalleryScripts = function (domelement, fancyoptions) {
        addCssLink('css/jquery.fancybox.css');
        jQuery.cachedScript = function( url, options ) {
            options = $.extend( options || {}, {
                dataType: "script",
                cache: true,
                url: url
            });
            return jQuery.ajax( options );
        };
        $.cachedScript( 'js/jquery.fancybox.pack.js' ).done(function() {
            $( domelement ).fancybox( fancyoptions );
        });
    };
    
    var getGoogleMaps = function (id) {
        function init_map(){
            var myOptions = {
                zoom:17,
                center:new google.maps.LatLng(48.527730, 135.173040),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById(id),
                myOptions);
            marker = new google.maps.Marker(
                {
                    map: map,position: new google.maps.LatLng(48.527630, 135.173040),
                    icon: 'http://goodwork-studio.com/wp-content/themes/goodwork/images/map_point.png'
                });
            infowindow = new google.maps.InfoWindow(
                {
                    content:"<b>Кейтеринг</b><br/>Матвеевское шоссе, 26а<br/>Хабаровск"
                });
            google.maps.event.addListener(marker, "click", function(){
                infowindow.open(map,marker);
            });
            infowindow.open(map,marker);
        }
        google.maps.event.addDomListener(window, 'load', init_map);
    };
    
    var contacts2gisMaps = function (id) {
        var map;
        DG.then(function () {
            var coordinates = [[48.527834, 135.169558], [48.526772, 135.171296], [48.528060, 135.173267], [48.527868, 135.173589], [48.527761, 135.173441]],
                coordinatesWrong1 = [[48.528473, 135.171453], [48.528034, 135.171528]],
                coordinatesWrong2 = [[48.528276, 135.171174], [48.528260, 135.171828]],
                coordinatesArrow = [[48.527847, 135.173463], [48.527761, 135.173441], [48.527792, 135.173568]],
                myDivIcon = DG.divIcon({
                    iconSize: [124, 87],
                    html: '<img src="http://localhost:63342/web-alt_w/images/logo.png" width="80"><br>Матвеевское шоссе, <strong>26а</strong>'
                });


            map = DG.map(id, {
                center: [48.527698, 135.171667],
                zoom: 17,
                fullscreenControl: false,
                scrollWheelZoom: false
            });


            polyline = DG.polyline(coordinates, { // путь
                color: '#007bb4',
                weight: 5
            }).addTo(map);

            polylineArrow = DG.polyline(coordinatesArrow, { // стрелка пути
                color: '#007bb4',
                weight: 4
            }).addTo(map);

            polylineWrong1 = DG.polyline(coordinatesWrong1, { // красный крест
                color: '#ed1b24',
                weight: 6,
                opacity: 0.8
            }).addTo(map);

            polylineWrong2 = DG.polyline(coordinatesWrong2, { // красный крест
                color: '#ed1b24',
                weight: 6,
                opacity: 0.8
            }).addTo(map);

            DG.marker([48.527914, 135.173281], {
                icon: myDivIcon
            }).addTo(map).bindPopup('Вы кликнули по мне!');
        });
    };

    AllPagesScripts();
    FrontPageScripts();
    CatalogScripts();

    if ( $('.gallery').length ) {//настройки галлереи, динамическая подгрузка файлов. не работает при открытии страницы через файл
        GalleryScripts('.product-item',
            {
                padding: 0,
                minWidth: 800,
                minHeight: 450
            }
        );
    }

    if ( $('.images-line').length ) {
        GalleryScripts('.images-line a',
            {
                padding: 0,
                minWidth: 800,
                minHeight: 450
            }
        );
    }

    //if ( document.getElementById('gmap_canvas') ) {
    //    getGoogleMaps('gmap_canvas');
    //}

    if (document.getElementById('2gis-map')) {
        contacts2gisMaps('2gis-map');
    }

});