//----Initialising Data----//
updateOutput();

//----Function monitoring panel size on every event----//
$(".btn").click( function(){
    $(this).toggleClass("active");

    var panelId = $(this).attr("id") + "Panel";
    $("#" + panelId).toggleClass("hidden");


    var noap = 4 - $(".hidden").length;
    var flag = "col-md-" + 12/noap;

    $("."+prev).addClass(flag).removeClass(prev);

    prev = flag;

    if(noap==0){
        $("#introText").removeClass("hide");
    }

    if(noap>0 && $("#introText").hasClass("hide")==false){
        $("#introText").addClass("hide");
    }
})

//----Function to update data as per user input----//
function updateOutput(){
    $("iframe").contents().find("html").html( "<html><head><style type='text/css'>" + $("#cssP").val() + "</style><body>" + $("#htmlP").val() + "</body></html>" );

    document.getElementById("outputP").contentWindow.eval( $("#javascriptP").val() );

}

//----Function triggering every user input to toggle change in realtime----//
$("textarea").on("change keyup paste", function(){
            updateOutput();
        });

//----Panel status and dimension initialisation----//
var noap = 4 - $(".hidden").length;
var prev = "col-md-" + 12/noap;


//----Functions for Textual transition----//
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};
