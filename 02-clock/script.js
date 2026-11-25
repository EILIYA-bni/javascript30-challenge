/* SELECT HTML ELEMENTS */

// Analog clock
const secondHand = document.querySelector(".second-hand");
const minuteHand = document.querySelector(".minute-hand");
const hourHand = document.querySelector(".hour-hand");

// Digital information
const digitalTime = document.querySelector("#digital-time");
const currentDate = document.querySelector("#current-date");
const timezone = document.querySelector("#timezone");
const timeModeLabel = document.querySelector("#time-mode-label");

// Interactive controls
const formatToggle = document.querySelector("#format-toggle");
const timezoneToggle = document.querySelector("#timezone-toggle");


/* CHECK HTML CONNECTIONS */

const elements = {
    secondHand,
    minuteHand,
    hourHand,
    digitalTime,
    currentDate,
    timezone,
    timeModeLabel,
    formatToggle,
    timezoneToggle
};

const missingElements = Object.entries(elements)
    .filter(([name, element]) => !element)
    .map(([name]) => name);

if (missingElements.length > 0) {
    throw new Error(
        `Missing HTML elements: ${missingElements.join(", ")}`
    );
}


/* CLOCK SETTINGS */

const localTimeZone =
    Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

let is24Hour = true;
let isUTC = false;


/* HELPER FUNCTIONS */

function padZero(number) {
    return String(number).padStart(2, "0");
}


/* UPDATE ANALOG AND DIGITAL CLOCK */

function updateClock() {

    const now = new Date();

    // Select the active timezone
    const activeTimeZone = isUTC ? "UTC" : localTimeZone;


    // Get time components for the selected timezone
    const timeParts = new Intl.DateTimeFormat("en-GB", {
        timeZone: activeTimeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: is24Hour ? "h23" : "h12"
    }).formatToParts(now);


    // Convert time parts into an object
    const timeValues = Object.fromEntries(
        timeParts
            .filter(part =>
                ["hour", "minute", "second", "dayPeriod"].includes(part.type)
            )
            .map(part => [part.type, part.value])
    );


    const hours = Number(timeValues.hour);
    const minutes = Number(timeValues.minute);
    const seconds = Number(timeValues.second);

    const milliseconds = now.getMilliseconds();


    /* CALCULATE CLOCK HAND ANGLES */

    // Fractional seconds make the second hand move smoothly
    const secondsWithFraction = seconds + milliseconds / 1000;

    const minutesWithFraction =
        minutes + secondsWithFraction / 60;

    const hoursWithFraction =
        (hours % 12) + minutesWithFraction / 60;


    const secondsDegrees =
        (secondsWithFraction * 6) + 90;

    const minutesDegrees =
        (minutesWithFraction * 6) + 90;

    const hoursDegrees =
        (hoursWithFraction * 30) + 90;


    /* ROTATE ANALOG CLOCK HANDS */

    secondHand.style.transform =
        `rotate(${secondsDegrees}deg)`;

    minuteHand.style.transform =
        `rotate(${minutesDegrees}deg)`;

    hourHand.style.transform =
        `rotate(${hoursDegrees}deg)`;


    /* UPDATE DIGITAL TIME */

    const dayPeriod = timeValues.dayPeriod
        ? ` ${timeValues.dayPeriod.toUpperCase()}`
        : "";

    digitalTime.textContent =
        `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}${dayPeriod}`;

    digitalTime.dateTime = now.toISOString();


    /* UPDATE DATE */

    currentDate.textContent = new Intl.DateTimeFormat("en-GB", {
        timeZone: activeTimeZone,
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(now);

    currentDate.dateTime = now.toISOString();


    /* UPDATE TIMEZONE */

    if (isUTC) {
        timezone.textContent = "UTC";
    } else {

        const zoneParts = new Intl.DateTimeFormat("en-GB", {
            timeZone: localTimeZone,
            timeZoneName: "short"
        }).formatToParts(now);

        const zoneAbbreviation = zoneParts.find(
            part => part.type === "timeZoneName"
        )?.value;

        timezone.textContent =
            `${localTimeZone} (${zoneAbbreviation || "Local"})`;
    }


    /* UPDATE CONTROL LABELS */

    timeModeLabel.textContent =
        isUTC ? "UTC TIME" : "LOCAL TIME";

    formatToggle.textContent =
        is24Hour ? "Switch to 12-hour" : "Switch to 24-hour";

    timezoneToggle.textContent =
        isUTC ? "Use local time" : "Switch to UTC";

    formatToggle.setAttribute(
        "aria-pressed",
        String(!is24Hour)
    );

    timezoneToggle.setAttribute(
        "aria-pressed",
        String(isUTC)
    );
}

// Switch between 12-hour and 24-hour formats
formatToggle.addEventListener("click", () => {

    is24Hour = !is24Hour;

    updateClock();

});

// Switch between local time and UTC
timezoneToggle.addEventListener("click", () => {

    isUTC = !isUTC;

    updateClock();

});


/* START CLOCK */

// Initial update
updateClock();

// Refresh every 50 milliseconds for smoother hand movement
setInterval(updateClock, 50);
