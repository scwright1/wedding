$(document).ready(function() {
	countdown('10/03/2015 0:0 AM', 'countdown');
    initMap();
});

function initMap() {
    var mapOptions = {
        center: new google.maps.LatLng(50.989042,-0.923452),
        zoom: 11,
        styles: [
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    }
]
        //50.97743,-0.918268
    };
    
    var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
    var venueImage = 'img/marker.png';
    var venue = new google.maps.LatLng(50.97743,-0.918268);
    var marker = new google.maps.Marker({
        icon: venueImage,
        position: venue,
        map: map,
        title: 'Wedding Venue: Tithe Barn - Petersfield'
    });
    
    google.maps.event.addListener(marker, 'click', function() {
        var infowindow = new google.maps.InfoWindow({
            content: marker.title
        });
        infowindow.open(map,marker);
    });

    layer = new google.maps.FusionTablesLayer({
        query: {
            select: '\'Geocoding Address\'',
            from: '1OVcql7BYneaxTTOrcELOM-vkw7qXayl28_TrtEVz'
        }
    });
    layer.setMap(map);
    google.maps.event.addDomListener(window, 'load', initialize);
}

function countdown(dt, id) {
	var end = new Date(dt);

    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;
    var timer;

    function showRemaining() {
        var now = new Date();
        var distance = end - now;
        if (distance < 0) {

            clearInterval(timer);
            document.getElementById(id).innerHTML = 'WEDDING DAY!';

            return;
        }
        var days = Math.floor(distance / _day);
        var hours = Math.floor((distance % _day) / _hour);
        var minutes = Math.floor((distance % _hour) / _minute);
        var seconds = Math.floor((distance % _minute) / _second);
        var dayend = 'days', hourend = 'hours', minend = 'mins', secend = 'secs';

        if(days === 1) {
        	dayend = 'day';
        }
        if(hours === 1) {
        	hourend = 'hour';
        }
        if(minutes === 1) {
            minend = 'min';
        }
        if(seconds === 1) {
            secend = 'sec';
        }
        $('#countdown > #days').html(days);
        $('#countdown > #days-text').html(dayend);
        //$('#countdown > #hours').html(hours);
        //$('#countdown > #hours-text').html(hourend);
        //$('#countdown > #minutes').html(minutes);
        //$('#countdown > #minutes-text').html(minend);
        //$('#countdown > #seconds').html(seconds);
        //$('#countdown > #seconds-text').html(secend);
    }

    timer = setInterval(showRemaining, 1000);
}