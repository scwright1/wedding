$(document).ready(function() {
	countdown('10/03/2015 0:0 AM', 'countdown');
    $('#scroll-to-top').click(function() {
        $('html,body').animate({ scrollTop: 0 }, 'slow');
        return false; 
    });
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
        $('#us-section > .content > .counter-panel > .countdown > b > span').html(days);
    }

    timer = setInterval(showRemaining, 1000);
}