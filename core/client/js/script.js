$(document).ready(function() {
	countdown('10/03/2015 0:0 AM', 'countdown');
});

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