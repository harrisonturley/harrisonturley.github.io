var TextRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.text = '';
    this.tick();
    this.isDeleting = false;
};

TextRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullText = this.toRotate[i];

    if (this.isDeleting) {
        this.text = fullText.substring(0, this.text.length - 1);
    } else {
        this.text = fullText.substring(0, this.text.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.text + '</span>';
    var that = this;
    var delta = 175 - Math.random() * 100;

    if (this.isDeleting) { 
        delta = delta / 2; 
    }

    if (!this.isDeleting && this.text === fullText) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.text === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('text-rotate');

    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');

        if (toRotate) {
            new TextRotate(elements[i], JSON.parse(toRotate), period);
        }
    }

    document.getElementById('bg-image').style.height = window.getComputedStyle(document.getElementById('page-header')).height;
    document.getElementById('bg-image-behind').style.height = window.getComputedStyle(document.getElementById('page-header')).height;
};

(function ($) {
    "use strict";
	var nav = $('nav');
    var navHeight = nav.outerHeight();

    $('body').scrollspy({
        target: '#main-nav',
        offset: navHeight
    });

    $(window).trigger('scroll');
    $(window).on('scroll', function() {
        var pixels = 50; 
        var top = 1200;
        if ($(window).scrollTop() > pixels) {
            $('.navbar-expand-md').addClass('navbar-reduce');
            $('.navbar-expand-md').removeClass('navbar-trans');
            console.log('here');
        } else {
            $('.navbar-expand-md').addClass('navbar-trans');
            $('.navbar-expand-md').removeClass('navbar-reduce');
            console.log('or here');
        }
        if ($(window).scrollTop() > top) {
            $('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
        } else {
            $('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
        }
    });
})(jQuery);