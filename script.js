$(document).ready(function() {
  $('.reload').hide();
  // creation classe du jeux plus  ou moins
  var maxtmp = Math.floor(Math.random() * 1000) + 1000;

  var Game = function(max) {
    // Definition de la propirité answer meme si Max absent
    this.max = max;
    this.answer = max ? Math.floor(Math.random() * max) : Math.floor(Math.random() * 10000);
    this.tantative = 0;
    // Definition de la methode test qui dit si le joueur a bien deviner
    this.test = function(guess) {
      if (guess == this.answer) {
        return false;
      } else if (guess > this.answer) {

        return "C'est moins que " + guess;

      } else {

        return "C'est plus que " + guess;

      }

    }
  }



  // Fonctionalité de la page

  var play = new Game(maxtmp);
  $('input[type="range"]').prop('max', maxtmp);

  $('input[name="go"]').on("click", function(e) {
    e.preventDefault();
    var bet = play.test($('input[type="number"]').val());

    if (bet) {
      $(".jeuxTest").replaceWith('<p class="jeuxTest">' + bet + '</p>');
      $('input[type="range"]').val($('input[type="number"]').val());
      $('input[type="number"]').val('');

    } else {
      $(".jeuxTest").replaceWith('<p class="jeuxTest">Bravo !</p>');
      $('input[type="number"]').val('');
      $('.guess').hide();
      $('.reload').show();
      $('.playAlone').hide();
    }

  });


  $('input[name="reload"]').on("click", function(e) {
    e.preventDefault();
     play = new Game(maxtmp);
    $('input[type="range"]').prop('max', maxtmp);
    $('.guess').show();
    $('.reload').hide();
    $('.playAlone').show();
  });

  $('input[name="playAlone"]').on("click", function(e) {
    e.preventDefault();
    playAlone(maxtmp, 0);

  });

  function playAlone(max, min) {
    var essay = Math.floor(Math.random() * (max - min)) + min;
    $('input[type="range"]').val(essay);
    $('input[type="number"]').val(essay);
    var bet = play.test(essay);
    console.log(bet);
    if (bet) {
      $(".jeuxTest").replaceWith('<p class="jeuxTest">' + bet + '</p>');
      $('input[type="range"]').val($('input[type="number"]').val());
      if (bet.match(/.*plus.*/i)) {
        window.setTimeout(playAlone(max, essay), 3000);
      } else {
        window.setTimeout(playAlone(essay, min), 3000);
      }

    } else {
      $(".jeuxTest").replaceWith('<p class="jeuxTest">Bravo !</p>');
      $('input[type="number"]').val('');
      $('.guess').hide();
      $('.reload').show();
      $('.playAlone').hide();
    }
  }


});
