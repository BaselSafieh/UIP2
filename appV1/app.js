/**
 * Created by Basel on 5/16/2017.
 */


var tmax_optionsGlobal = {
    repeat: -1,
    repeatDelay: 0.65,
    yoyo: true
};

var tl = new TimelineMax(tmax_optionsGlobal),
    path = 'svg *',
    stagger_val = 0.0125,
    duration = 0.75;



var stagger_opts_to = {
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1,
    rotation: 0,
    ease: Power4.easeInOut
};


function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}




function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function Expression(option) {
    this.a = getRandomInt(-6, 7);
    while (this.a == 0)
    this.a = getRandomInt(-6, 7);
    this.c = getRandomInt(1, 11);
    this.x = getRandomInt(1, 6);
    this.b = this.c - this.a * this.x;
    this.step = 0;
    this.choice = 0;

    this.print = function () {

        return "" + ((this.a == 1)? "": this.a) + "X" + ((this.b > 0) ? " + " + this.b + " = " + this.c : ((this.b < 0) ? " - " + Math.abs(this.b) : "") + " = " + this.c)

    };
    this.subtract = function (num) {
        this.b -= num;
        this.c -= num
    };
    this.add = function (num) {
        this.b += num;
        this.c += num
    };
    this.divide = function (num) {
        this.a /= num;
        this.b /= num;
        this.c /= num
    };
    this.getOptions = function () {
        if (this.b != 0) {
            return shuffleArray([this.c, -this.b, this.b, this.a])
        }
        else if (this.b == 0) {
            return shuffleArray([this.a, -this.a, this.c, -this.c])
        }
    }
}

$(document).ready(function () {

    //demo.initChartist();
//
//        $.notify({
//            icon: 'pe-7s-gift',
//            message: "Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for every web developer."
//
//        },{
//            type: 'info',
//            timer: 4000
//        });

    $.each($(path), function(i, el) {
        tl.set($(this), {
            x: '+=' + getRandom(-500, 500),
            y: '+=' + getRandom(-500, 500),
            rotation: '+=' + getRandom(-720, 720),
            scale: 0,
            opacity: 0
        });
    });
    tl.staggerTo(path, duration, stagger_opts_to, stagger_val);


    var exp = new Expression();

    $('#myb').click(function () {
        exp = new Expression();
        $('#result').text(exp.print());
    });
    $('#add').click(function () {
        exp.add(parseInt($('#val').val()));
        $('#result').text(exp.print());
    });
    $('#sub').click(function () {
        exp.divide(parseInt($('#val').val()));
        $('#result').text(exp.print());
    });
    $('#getoptions').click(function () {

        $('#options').html("");

        exp.getOptions().forEach(function (item, index) {
          /*if (item > 0) {
            $('#options').append('<li class = "options"><a> +' + item + '</a></li>');
          } else {
            $('#options').append('<li class = "options"><a>' + item + '</a></li>');

          }*/
          if (exp.b != 0) { //addition

              if (item > 0) {
                $('#options').append('<li class = "options"><a>Add a ' + item + '</a></li>');
              } else {
                $('#options').append('<li class = "options"><a>Subtract by ' + item + '</a></li>');

              }

            } else if (exp.b == 0 && exp.a != 1) {  //division

              if (item > 0) {
                $('#options').append('<li class = "options"><a>Divide by ' + item + '</a></li>');
              } else {
                $('#options').append('<li class = "options"><a>Divide by ' + item + '</a></li>');

              }

            }
        });

        $(document).off('click', '.options')
        $(document).on('click', '.options', function () {
            var optionText = $(this).text();
            var option = optionText.split(" ");
            var option = parseInt(option[2]);

            if (exp.b != 0) {
                exp.add(option);
                (exp.b == 0)? $('#feedback').text("Correct! :D"):$('#feedback').text("False :(")
                $('#result').text(exp.print())
                $('#options').html("");

            } else if (exp.b == 0 && exp.a != 1) {
                exp.divide(option);
                (exp.a == 1)? $('#feedback').text("Correct! :D"):$('#feedback').text("False :(")
                $('#result').text(exp.print())
                $('#options').html("");

            }

        });

    })

});
