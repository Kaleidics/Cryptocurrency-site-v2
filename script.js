
function stickyNav() {
    window.onscroll = function() { 
        let navbar = $("#navbar")[0];
        let sticky = navbar.offsetTop;

        if (window.pageYOffset >= sticky) {
            $("#navbar").addClass("sticky");
        } else {
            $("#navbar").removeClass("sticky");
        }
    }
}

function documentReady() {
    stickyNav();
}

$(documentReady);