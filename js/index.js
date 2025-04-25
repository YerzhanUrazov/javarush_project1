const airports = [
  { city: "Москва", code: "MOW" },
  { city: "Милан", code: "MIL" },
  { city: "Астана", code: "NQZ" },
  { city: "Астрахань", code: "ASF" },
  { city: "Мадрид", code: "MAD" }
];


const inputTo = document.getElementById("ticket-to");
const inputFrom = document.getElementById("ticket-from");
const listFrom = document.getElementById("airports-list-from");
const listTo = document.getElementById("airports-list-to");
const changeDirectionButton = document.getElementById("arrow-tickets");


function renderList(list, airports) {
  list.innerHTML = ''; 
  let html = '';
  let inputValue ='';
  if (list === listFrom) {
    inputValue = inputFrom.value.toLowerCase();
  }
  else {
    inputValue = inputTo.value.toLowerCase();
  }
  for (let airport of airports) {
    if (airport.city.toLowerCase().startsWith(inputValue)) {
      html += `<li class="airport-list-item">
          <span class="city">${airport.city}</span>
          <span class="code">${airport.code}</span>
        </li>
        `;
      }
    }
  list.innerHTML = html;
  list.style.display = html ? "block" : "none";
}

inputFrom.addEventListener("input", (event) => {
  listTo.style.display = "none";
  renderList(listFrom, airports);
  event.stopPropagation(); 
});

inputTo.addEventListener("input", (event) => {
  listFrom.style.display = "none";
  renderList(listTo, airports);
  event.stopPropagation(); 
});

function handleListClick(event, input, list) {
  if (event.target.tagName === "LI" || event.target.closest("li")) {
    const li = event.target.closest("li");
    const citySpan = li.querySelector(".city");
    input.value = citySpan.textContent;
    list.style.display = "none";
  }
}


listFrom.addEventListener("click", (event) => {
  handleListClick(event, inputFrom, listFrom);
});

listTo.addEventListener("click", (event) => {
  handleListClick(event, inputTo, listTo);
});

document.addEventListener("click", (event) => {
  if (!listFrom.contains(event.target) && event.target !== inputFrom) {
    listFrom.style.display = "none";
  }
  if (!listTo.contains(event.target) && event.target !== inputTo) {
    listTo.style.display = "none";
  }
});

changeDirectionButton.addEventListener("click", (event)=>{
  let directionValue = inputFrom.value;
  inputFrom.value = inputTo.value;
  inputTo.value = directionValue;
  console.log(inputFrom.value,inputTo.value);
});

// passenger-info

const passengersInput = document.getElementById("passengers");
const infoBlock = document.getElementById("passenger-info");

passengersInput.addEventListener("click", () => {
  infoBlock.style.display = infoBlock.style.display === "none" ? "block" : "none";
});

const countPlusBabies = document.getElementById("increaseBabies");
const countMinusBabies = document.getElementById("decreaseBabies");

const countPlusChildren = document.getElementById("increaseChildren");
const countMinusChildren = document.getElementById("decreaseChildren");

const countPlusAdults = document.getElementById("increaseAdults");
const countMinusAdults = document.getElementById("decreaseAdults");

const babies = document.getElementById("babies");
const children = document.getElementById("children");
const adults = document.getElementById("adults");

function countPassengers(operation, passenger) {
  let count = parseInt(passenger.textContent);

  const isAdults = passenger.id === "adults";
  const minCount = isAdults ? 1 : 0;

  if (operation === 'plus' && count < 9) {
    count++;
  } else if (operation === "minus" && count > minCount) {
    count--;
  }

  passenger.textContent = count;
}

countPlusBabies.addEventListener("click",()=>{countPassengers("plus",babies)});
countMinusBabies.addEventListener("click",()=>{countPassengers("minus",babies)});
countPlusChildren.addEventListener("click",()=>{countPassengers("plus",children)});
countMinusChildren.addEventListener("click",()=>{countPassengers("minus",children)});
countPlusAdults.addEventListener("click",()=>{countPassengers("plus",adults)});
countMinusAdults.addEventListener("click",()=>{countPassengers("minus",adults)});



const passengerInfo = document.getElementById("passengers");
const passengerInfoButton = document.getElementById("close-menu");

adults.textContent = "1";
passengerInfo.value = "1 пассажир, любой";

passengerInfoButton.addEventListener("click",()=> {
  if (babies.textContent === "0" && children.textContent === "0" && adults.textContent === "1") {
    passengerInfo.value = adults.textContent + " взрослый";
  }
  else if (babies.textContent === "0" && children.textContent === "0" && adults.textContent !== "1" ) {
    passengerInfo.value = adults.textContent + " взрослых";
  }
  else if (babies.textContent !== "0" && children.textContent === "0") {
    passengerInfo.value = adults.textContent + " взр, " + babies.textContent + " мл";
  }
  else if (babies.textContent === "0" && children.textContent !== "0") {
    passengerInfo.value = adults.textContent + " взр, " + children.textContent + " дет";
  }
  else if (babies.textContent !== "0" && children.textContent !== "0") {
    passengerInfo.value = adults.textContent + " взр, " + children.textContent + " дет, " + babies.textContent + " мл";;
  }
  infoBlock.style.display = "none";
}
);

document.addEventListener("click", (event) => {
  if (!infoBlock.contains(event.target) && event.target !== passengerInfo) {
    infoBlock.style.display = "none";
  }
});

// Calendar
const calendarContainer = document.querySelector(".calendar-container");

const monthTemplate = document
  .querySelector("#calendar-template")
  .content
  .querySelector(".calendar-month");

const monthContainer = document.querySelector(".calendar-dates");

const ClassName = {
  DATE: "calendar-month-dates-day",
  FROM: "calendar-month-dates-day-from",
  IN_RANGE: "calendar-month-dates-day-in-range",
  PAST_DATE: "calendar-month-dates-day-past",
  TO: "calendar-month-dates-day-to",
  TODAY: "calendar-month-dates-day-today",
};

function getMonth(idx) {
  const objDate = new Date();
  objDate.setDate(1);
  objDate.setMonth(idx);

  const month = objDate.toLocaleString("ru-RU", {
    month: "long",
  });

  return month;
}

function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function renderCalendarMonth(
  container,
  monthNumber = new Date().getMonth(),
  yearNumber = new Date().getFullYear(),
) {
  const monthElement = monthTemplate.cloneNode(true);
  // Все изменения в DOM мы производим до отрисовки элемента на страницу
  // чтобы не вызывать слишком много повторных рендерингов

  const monthNameElement = monthElement.querySelector(".calendar-month-name");
  monthNameElement.textContent = `${getMonth(monthNumber)} ${yearNumber}`;

  // 1. Взять первый день месяца
  // 2. Определить день недели этого дня
  let firstDayInMonth = new Date(yearNumber, monthNumber, 1).getDay();
  if (firstDayInMonth === 0) {
    firstDayInMonth = 7;
  }

  const daysContainer = monthElement.querySelector(".calendar-month-dates-days");

  // 3. До этого дня заполнить контейнер филлерами (пустыми элементами)
  let daysLeft = firstDayInMonth;
  while (--daysLeft) {
    const fillerDate = document.createElement("li");
    daysContainer.appendChild(fillerDate);
  }

  // 4. Определить количество дней в месяце
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysInMonth = getDaysInMonth(monthNumber, yearNumber);
  // 5. В цикле заполнить контейнер блоками под дни по их количеству
  // 6. Попутно отмечая прошедние дни и текущий день
  for (let day = 1; day <= daysInMonth; day++) {
    const date = document.createElement("li");
    const renderedDate = new Date(yearNumber, monthNumber, day, 0, 0, 0, 0);

    date.textContent = day;

    date.classList.add(ClassName.DATE);
    date.classList.toggle(ClassName.PAST_DATE, renderedDate - today < 0);
    date.classList.toggle(ClassName.TODAY, renderedDate - today === 0);

    date.dataset.date = renderedDate.toISOString();

    daysContainer.appendChild(date);
  }

  container.appendChild(monthElement);
}

function clearCalendarMonths() {
  monthContainer.innerHTML = "";
}

function showCalendarDialog() {
  calendarContainer.style.display = "block";
}

function hideCalendarDialog() {
  // calendarContainer.close();
  // calendarContainer.removeAttribute('open');
  // calendarContainer.style.display = 'none';
  calendarContainer.style.display = "none";
  clearCalendarMonths();
}

function highlightRange(container, dateFrom, dateTo = null) {
  const allDates = container.querySelectorAll(`.${ClassName.DATE}`);

  for (date of allDates) {
    const currentDate = new Date(date.dataset.date);

    date.classList.toggle(ClassName.FROM, +currentDate === +dateFrom);
    date.classList.toggle(ClassName.IN_RANGE, dateTo !== null && currentDate > dateFrom && currentDate < dateTo);
    date.classList.toggle(ClassName.TO, dateTo !== null && +currentDate === +dateTo);
  }
}

let globalSelectedDates = {
  from: null,
  to: null,
};
const selectedDates = {
  from: null,
  to: null,
};

function initializeDatePicker(dateFromElement, dateToElement) {


  dateFromElement.addEventListener('click', () => {
    currentMonth = new Date().getMonth();
    currentYear = new Date().getFullYear();
    requestAnimationFrame(() => {
      calendarContainer.style.display = 'block';
      updateCalendar();
    });
  });
  
  
  const formatOptions = { day: "numeric", month: "long", weekday: "short" };

  monthContainer.onclick = function (evt) {
    const isSelectableDateClicked =
      evt.target.classList.contains(ClassName.DATE) &&
      !evt.target.classList.contains(ClassName.PAST_DATE);
  
    if (!isSelectableDateClicked) {
      return;
    }
  
    const clickedDate = new Date(evt.target.dataset.date);
  
    if (selectedDates.from === null && selectedDates.to === null) {
      selectedDates.from = clickedDate;
      selectedDates.to = null;
    } else if (selectedDates.from !== null && selectedDates.to === null) {
      selectedDates.from = +clickedDate < +selectedDates.from ? clickedDate : selectedDates.from;
      selectedDates.to = +clickedDate > +selectedDates.from ? clickedDate : selectedDates.from;
    } else {
      // 🛠️ Вот тут главное отличие:
      // Если уже выбраны обе даты, новый клик сбрасывает старые даты и начинает выбор заново
      selectedDates.from = clickedDate;
      selectedDates.to = null;
    }
  
    // если обе даты выбраны, закрываем календарь
    if (selectedDates.from !== null && selectedDates.to !== null) {
      const formatOptions = { day: "numeric", month: "long", weekday: "short" };
      dateFromElement.value = selectedDates.from.toLocaleDateString("ru-RU", formatOptions);
      dateToElement.value = selectedDates.to.toLocaleDateString("ru-RU", formatOptions);
      hideCalendarDialog();
    }
  
    highlightRange(monthContainer, selectedDates.from, selectedDates.to);
  };
  
  

  monthContainer.onmouseover = function (evt) {
    const isSelectableDateHovered = (
      evt.target.classList.contains(ClassName.DATE) &&
      !evt.target.classList.contains(ClassName.PAST_DATE)
    );

    if (!isSelectableDateHovered) {
      return;
    }

    const hoveredDate = new Date(evt.target.dataset.date);
    

    if (selectedDates.from === null && selectedDates.to === null) {
      // Выбрано ноль дат — подсвечиваем то, на что навели
      highlightRange(monthContainer, hoveredDate);
    } else if (selectedDates.from !== null && selectedDates.to === null) {
      // Выбрана одна дата
      // - from - меньшая дата из hoveredDate или selectedDates.from
      // - to — большая дата из hoveredDate или selectedDates.from
      highlightRange(
        monthContainer,
        +hoveredDate < +selectedDates.from ? hoveredDate : selectedDates.from,
        +hoveredDate > +selectedDates.from ? hoveredDate : selectedDates.from,
      );
    } else {
      // Выбрано две даты
      // - from меньшая дата из hoveredDate или selectedDates.from
      // - to — большая дата из hoveredDate или selectedDates.to
      highlightRange(
        monthContainer,
        +hoveredDate < +selectedDates.to ? hoveredDate : selectedDates.from,
        +hoveredDate >= +selectedDates.to ? hoveredDate : selectedDates.to,
      );
    }
  }
}


// — Визуализация выбранных дат
//   — [x] Если нет выбранных дат — ничего не подсвечено по умолчанию
//   — [ ] Если нет выбранных дат при перемещении курсора по полю мы подсвечиваем дату
//   — [x] Если выбрана одна дата, ее блок подсвечен
//   — [ ] Если выбрана одна дата при перемещении курсора по полю мы подсвечиваем
//     диапазон до той даты, на которую наведен курсор
//   — [x] Если выбрано две даты — подсветить обе и диапазон
//   — [-] Если выбрана одна дата без обратного билета, подсвечена только она
// 
//     при открытии
//     по клику на дату
//     при перемещении курсора

// — Инициализация календаря с уже выбранными датами
// — Закрытие календаря
// — Одна дата
// — Переключение месяцев

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function updateCalendar() {
  clearCalendarMonths();
  renderCalendarMonth(monthContainer, currentMonth, currentYear);
  renderCalendarMonth(monthContainer, currentMonth + 1, currentYear);
}

document.querySelector(".calendar-month-control-rev").addEventListener("click", () => {
  if (currentMonth === 0) {
    currentMonth = 11;
    currentYear--;
  } else {
    currentMonth--;
  }
  updateCalendar();
});

document.querySelector(".calendar-month-control-fwd").addEventListener("click", () => {
  if (currentMonth === 11) {
    currentMonth = 0;
    currentYear++;
  } else {
    currentMonth++;
  }
  updateCalendar();
});




initializeDatePicker(
  document.querySelector("#date-from"),
  document.querySelector("#date-to"),
);

document.addEventListener("click", (event) => {
  const isClickInsideCalendar = calendarContainer.contains(event.target);
  const isClickOnInputs = event.target.id === "date-from" || event.target.id === "date-to";

  const isCalendarVisible = calendarContainer.style.display === "block";

  if (!isClickInsideCalendar && !isClickOnInputs && isCalendarVisible) {
    hideCalendarDialog(); 
  }
});

const findFlightsBtn = document.getElementById("find-flights");
const formatOptions = { day: "numeric", month: "long", weekday: "short" };

findFlightsBtn.addEventListener("click", () => {
  const selectedClass = document.querySelector('input[name="class"]:checked');
;
  globalSelectedDates.from = selectedDates.from.toDateString();
  globalSelectedDates.to = selectedDates.to.toDateString();

  const searchData = {
    from: inputFrom.value,
    to: inputTo.value,
    dateFrom: globalSelectedDates.from ? globalSelectedDates.from: null,
    dateTo: globalSelectedDates.to ? globalSelectedDates.to: null,
    adults: adults.textContent,
    children: children.textContent,
    babies: babies.textContent,
    flightClass: selectedClass ? selectedClass.id : "Не выбран класс"
  };

  console.log(searchData);
});

