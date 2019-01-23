const api_key1 = "960e428fdca399a09e41196327f5766b1f76aa979eec604f31318a4e0ac3f032";
let dataArray;

//formats parameters for urls
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function registerSearch() {
    $("#search-form").on("submit", function(event) {
        event.preventDefault();

        let searchTerm = (($("#search-term").val()).toUpperCase()) || "BTC";
        let searchMarket = $("#search-ex").val() || "CCCAGG";
        let fCurrency = $("#search-xxx").val();
        console.log(searchTerm, searchMarket, fCurrency);

        $(".list-holder").empty();
        generateResults(searchTerm, searchMarket, fCurrency);
    });
}

function generateResults(search, exchange, currency) {

    const searchUrl = "https://min-api.cryptocompare.com/data/all/coinlist";
    const searchUrl2 = "https://min-api.cryptocompare.com/data/generateAvg";
    const searchUrl3 = "https://min-api.cryptocompare.com/data/histohour";

    let params = {
        fsym: search,
        tsym: currency,
        e: exchange,
        api_key: api_key1
    }

    let params2 = {
        fsym: search,
        tsym: currency,
        limit: "23",
        api_key: api_key1
    }

    const queryString = formatQueryParams(params);
    const queryString2 = formatQueryParams(params2);
    const url = searchUrl + "?" + api_key1;; //endpoint including only name
    const url2 = searchUrl2 + "?" + queryString; //endpoint including statistics 
    const url3 = searchUrl3 + "?" + queryString2; //endpoint for data graph

    let response1, response2;

    fetch(url)
        .then(function (response) {
            if (response.ok) { return response.json(); }
            throw new Error(response.statusText);
        })
        .then(function (responseJSON) {
            response1 = responseJSON;
            return fetch(url2);
        })
        .then(function (response) {
            if (response.ok) { return response.json(); }
            throw new Error(response.statusText);
        })
        .then(function (responseJSON) {
            response2 = responseJSON;
            const { LASTMARKET, PRICE, OPEN24HOUR, HIGH24HOUR, LOW24HOUR, CHANGE24HOUR, CHANGEPCT24HOUR } = responseJSON.DISPLAY;

            if (PRICE === undefined) {
                $(".list-holder").html(`<h3>No data found</h3>`);
            }

            if (PRICE != undefined) {
                $(".list-holder").html(`

            <ul>
                <li>${response1.Data[search].FullName}</li>
                <li><span>Last Market:</span> <span>${LASTMARKET}<span></li>
                <li><span>Price:</span> <span>${PRICE}</span></li>
            </ul>

            <ul>
                <li><span>Open 24 Hour:</span> <span>${OPEN24HOUR}</span></li>
                <li><span>High 24 Hour:</span> <span>${HIGH24HOUR}</span></li>
                <li><span>Low 24 Hour:</span> <span>${LOW24HOUR}</span></li>
            </ul>

            <ul>
                <li><span>Change 24 Hour:</span> <span>${CHANGE24HOUR}</span></li>
                <li><span>Change Percent 24 Hour: </span> <span>${CHANGEPCT24HOUR}%</span></li>
            </ul>
            `)
            } else {
                $(".list-holder").html(`<h2>No Data</h2>`)
            }
            return fetch(url3);
        })
        .then(function (response) {
            if (response.ok) { return response.json(); }
            throw new Error(response.statusText);
        })
        .then(function (responseJSON) {
            if (response2.DISPLAY.PRICE != undefined) {
                let label = [];
                let data = [];
                for (let i = 0; i < responseJSON.Data.length; i++) {
                    label.push(responseJSON.Data[i].time);
                    data.push(responseJSON.Data[i].high);
                }
                let labelTime = label.map(x => new Date(x * 1000));
                graphf(labelTime, data);
            }
        })
        .catch((error) => {
                $(".list-holder").html(`<div>There is no data for the Coin: ${search} in Market: ${exchange}</div`);
            
        });
};

function registerTopCoins() {
    $("#top-coins").on("click", function(event) {
        generateTopTen();
    })
}

function generateTopTen() {
    const searchUrl = "https://min-api.cryptocompare.com/data/top/totalvolfull";
    const baseImageUrl = "https://www.cryptocompare.com/";

    let params = {
        limit: "10",
        tsym: "USD",
        api_key: api_key1
    };

    const queryString = formatQueryParams(params);
    const url = searchUrl + "?" + queryString;

    return fetch(url)
        .then(function (response) {
            if (response.ok) return response.json();
            throw new Error(response.statusText);
        })
        .then(function (responseJson) {
            let items = ``;
            for (let i = 0; i < responseJson.Data.length; i++) {
                const { Name, ImageUrl, FullName } = responseJson.Data[i].CoinInfo;
                const { PRICE, HIGHDAY, LOWDAY } = responseJson.Data[i].DISPLAY.USD;

                items = items.concat(`
            <ul id="${Name}" class="top-coins-items">
            <li><img class="list-images" src="${baseImageUrl}${ImageUrl}" alt="${FullName}"></li>
            <li><a href="#">${FullName}</a></li>
            <li>${PRICE}</li>
            <li>${HIGHDAY}/${LOWDAY}</li>
            </ul>`);
            }

            $(".list-holder").html("");
            $(".list-holder").html(items);
        })
        .catch(error => console.log("generateTopTen failed", error));
}


























//Styling controls
//particles.js config
particlesJS("particles", {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            },
            "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
            }
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});

//charts.js config
function graphf(labels, data) {
    let ctx = document.getElementById("myChart").getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Hourly High Price',
                data: data,
                backgroundColor: 
                    'rgba(255, 0, 0, 0.2)',
                borderColor: 
                    'rgba(255,0,132,1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }],
                xAxes: [{
                    ticks: {
                        display: false
                    }
                }]
            }
        }
    });
}

function stickyNav() {
    window.onscroll = function() { 
        if (window.pageYOffset > 200) {
            $("#navbar").addClass("scroll");
        } else {
            $("#navbar").removeClass("scroll");
        }
    }
}

function toTop() {
    window.scrollTo(0,0);
}

function documentReady() {
    toTop();
    stickyNav();
    registerSearch();
    registerTopCoins();
    
}

$(documentReady);