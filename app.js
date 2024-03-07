let loadButton = document.getElementById('loadButton')
loadButton.onclick = () => {

    async function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log('Широта:' + latitude);
        console.log('Долгота:' + longitude);

        let APIkey = '88c8615836512d39e3e7687d2ede5e1f'

        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIkey}&lang=ru`)
        let resJson = await res.json()

        let nameElement = document.getElementById('name')
        nameElement.innerText = "Погода в городе " + resJson.name

        let tempElement = document.getElementById('temp')
        tempElement.innerText = Math.round(resJson.main.temp - 273) + '°'

        let descriptionElement = document.getElementById('description')
        descriptionElement.innerText = resJson.weather[0].description

        iconId = resJson.weather[0].icon
        let img = document.createElement("img");
        img.src = `https://openweathermap.org/img/wn/${iconId}@2x.png`;
        iconElement = document.getElementById('icon');
        icon.appendChild(img);

        let dateElement = document.getElementById('date')
        let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
        let currentDate = new Date();
        dateElement.innerHTML = months[currentDate.getMonth()] + " " + currentDate.getDate() + ", " + currentDate.getFullYear()

        console.log(resJson);

        loadButton.classList.toggle('display-none')
    }

    function error() {
        status.textContent = "Невозможно получить ваше местоположение";
    }

    if (!navigator.geolocation) {
        status.textContent = "Geolocation не поддерживается вашим браузером";
    } else {
        status.textContent = "Определение местоположения…";
        navigator.geolocation.getCurrentPosition(success, error);
    }

}


