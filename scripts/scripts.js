$(document).ready(function () {
    window.onload = fetch_results('london')

    const country = document.querySelectorAll('.country');
    const Visibility = document.querySelector('.value-Visibility');
    const humidity = document.querySelector('.value-humidity');
    const windSpeed = document.querySelector('.value-wind');
    const loadCirc = document.querySelector('.load-box');

    const icon = document.querySelectorAll('.icon');
    const icon2 = document.querySelectorAll('.icon2');
    const day = document.querySelectorAll('.day');
    const temperature = document.querySelectorAll('.temp');
    const desc = document.querySelectorAll('.desc-desc');
    const date = document.querySelectorAll('.date');

    const changeLocation = document.querySelector('.change');
    const form = document.querySelector("form");
    const input = document.querySelector("input");
    const msg = document.querySelector(".msg");

    $(msg).html('')


    var today = new Date();
    $(date).text(`${today.toDateString()}`)
    let text = today.toDateString()
    const myArray = text.split(" ");
    $(day).text(`${myArray[0]}`)
    inputVal = input.value;


    function fetch_results(parameter1) {
        const apik = "3045dd712ffe6e702e3245525ac7fa38"
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${parameter1}&appid=${apik}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const { main, name, sys, weather, wind, visibility } = data;


                const icon_return = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;


                $(country).text(`${name},${sys.country}`)
                $(desc).text(`${weather[0]["description"]}`)
                $(icon).html(`<img class="city-icon" style='width: 200px;' src=${icon_return} alt=${weather[0]["main"]}>`)
                $(icon2).html(`<img class="city-icon" src=${icon_return} alt=${weather[0]["main"]}>`)
                $(temperature).text(Math.round(main.temp) + '°C')

                $(windSpeed).text(`${wind.speed} Km/hr`)
                $(Visibility).text(`${visibility} m`)
                $(humidity).html(`${main.humidity} g.kg<sup>-1<sup/>`)


                $(msg).html('')
                $(loadCirc).hide()
            })
            .catch((error) => {
                $(loadCirc).hide()
                $(msg).html('<span class="error-msg">Please search for a valid city<span/>')
            })
    }

    function checkButtonAction() {
        if (changeLocation.innerHTML == 'Search') {
            close()
        }
        else {
            tl = gsap.timeline({ onComplete: open })
            tl.to('.searchBox', { duration: 0.3, ease: Linear, top: 30 + '%' }, 'start')
                .to(changeLocation, { duration: 0.3, ease: Linear, top: 70 + '%' }, 'start')
            input.focus()
        }

        function open() {
            changeLocation.innerHTML = 'Search'
            $(msg).html('')
        }
        function close() {
            changeLocation.innerHTML = '<i class="fa fa-location-dot"></i> Change location'
            input.blur()
            tl.reverse()
            $(loadCirc).show()
            fetch_search()
        }
    }


    $(changeLocation).click(checkButtonAction)
    form.addEventListener("submit", e => {
        e.preventDefault();
        checkButtonAction();
    })

    function fetch_search() {
        var inputVal = input.value;
        fetch_results(inputVal)
    }
})


