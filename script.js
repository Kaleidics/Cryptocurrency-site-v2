
window.onload = function () {
    Particles.init({
        selector: ".particles",
        sizeVariations: 3,
        color: "#ffffff",
        connectParticles: true,
        maxParticles: 120,
        minDistance: 150,
        speed: 1
    });
};


function stickyNav() {
    window.onscroll = function() { 
        if (window.pageYOffset > 575) {
            $("#navbar").addClass("scroll");
        } else {
            $("#navbar").removeClass("scroll");
        }
    }
}

function documentReady() {
    stickyNav();
}

$(documentReady);