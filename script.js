const days = [];
async function setWeather(){
    let response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Kyiv?unitGroup=metric&key=MNSRTA2KCX64RPG4K5ZPC5R9B&contentType=json');
    let data = await response.json();
    let result = await data;
    for(let i = 0; i < result.days.length; i++){
        days[i] = new Object;
        days[i].date = result.days[i].datetime;
        days[i].temp = result.days[i].temp;
        days[i].humidity = result.days[i].humidity;
        days[i].cloudcover = result.days[i].cloudcover;
        days[i].preciptype = result.days[i].preciptype;
        days[i].conditions = result.days[i].conditions;
    }
    console.log(days);
    let month = ['Month', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let weekdays = []
    //today`s weather block
    document.querySelector('.dateDay').innerHTML = formatDate(days[0].date).getDate();
    document.querySelector('.dateMounth').innerHTML = month[formatDate(days[0].date).getMonth()+1];
    document.querySelector('#todayTemp').innerHTML = days[0].temp.toFixed(1) + '\u00B0';
    document.querySelector('.temp').children[1].classList.add(days[0].temp>10?'fa-temperature-full':'fa-temperature-empty');
    document.querySelector('.temp').children[1].style.color = days[0].temp>10?'#c97769':'#02587a';
    document.querySelector('#cond').classList.add('fa-'+setIcon(days[0].cloudcover, days[0].preciptype).fa);
    document.querySelector('#cond').style.color = setIcon(days[0].cloudcover, days[0].preciptype).color;
    document.querySelector('.condition').children[1].innerHTML = days[0].conditions.toUpperCase();
    document.querySelector('.humidity').children[0].innerHTML = 'HUMIDITY '+ days[0].humidity.toFixed(1) + '%';

    //week`s weather block
    var i = 1;
    document.querySelectorAll('.day').forEach((item)=>{
        item.children[0].classList.add('fa-'+setIcon(days[i].cloudcover, days[i].preciptype).fa);
        item.children[0].style.color = setIcon(days[i].cloudcover,days[i].preciptype).color;
        item.children[1].innerHTML = days[i].temp.toFixed(0) + '\u00B0';
        item.children[2].innerHTML = Intl.DateTimeFormat('en-US', {weekday:'long'}).format(formatDate(days[i].date));
        i++;
    });

}

function formatDate(date){
    return new Date (date[0]+date[1]+date[2]+date[3], date[5]+date[6]-1, date[8]+date[9]);
}
function setIcon(cloudcover, preciptype){
    console.log(preciptype);
    if(preciptype != null){
        if(preciptype == 'rain')
                return icon = { 'fa': 'cloud-rain', 'color': '#081042'};
        if(preciptype == 'snow')
                return icon = {'fa': 'snowflake', 'color': 'white'};
            console.log('new preciptype');
    }else{
        if(cloudcover <= 25)
            return icon = {'fa': 'sun', 'color': '#dbd35e'};
        if(cloudcover > 25 && cloudcover <= 80)
            return icon = {'fa': 'cloud-sun', 'color': '#656958'};
        if(cloudcover > 80)
            return icon = {'fa': 'cloud', 'color': '#75778a'};
    }
}
setWeather();

