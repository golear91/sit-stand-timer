'use strict';

const ALARM_NAME: string = "notification-alarm";
const NOTIFICATION_FREQUENCY_MINUTES: number = 1;
let count: number = 0;

const STARTUP_NOTIFICATION_ID: string = 'sit-stand-startup';

let sitting: boolean = true;

let standupNotification = {
    type: 'basic',
    iconUrl: 'images/standing-icon-38.png',
    title: `It's time to stand up!`,
    message: 'Click ',
    buttons: [
        { title: "Done" }
    ],
    isClickable: true
}

let sitDownNotification = {
    type: 'basic',
    iconUrl: 'images/sitting-icon-38.png',
    title: `It's time to sit down`,
    message: 'message',
    buttons: [
        { title: "Done" }
    ],
    isClickable: true
}

chrome.runtime.onStartup.addListener(function () {
    console.log("onStartup");
    chrome.notifications.create(STARTUP_NOTIFICATION_ID, {
        type: 'basic',
        iconUrl: 'images/sitting-icon-38.png',
        title: 'Sit Stand Timer startup',
        message: 'Are you sitting or standing right now?',
        buttons: [
            { title: 'Sitting' },
            { title: 'Standing' }
        ]
    });
});

chrome.notifications.onButtonClicked.addListener(function (notificationId, buttonIndex) {
    console.log(`Button ${buttonIndex} clicked on notification ${notificationId}`);
    if (notificationId === STARTUP_NOTIFICATION_ID) {
        sitting = buttonIndex === 0;
    } else {
        sitting = !sitting;
    }
    chrome.notifications.clear(notificationId);

});

chrome.runtime.onInstalled.addListener(details => {
    console.log('previousVersion', details.previousVersion);
});

chrome.alarms.onAlarm.addListener(function (alarm) {
    console.log("ALARM");
    if (alarm.name === ALARM_NAME) {
        if (sitting) {
            chrome.notifications.create(standupNotification);
        }
        else {
            chrome.notifications.create(sitDownNotification);
        }
    }
});

chrome.alarms.create(ALARM_NAME, {
    delayInMinutes: 1,
    periodInMinutes: NOTIFICATION_FREQUENCY_MINUTES
});

console.log('\'Allo \'Allo! Event Page for Browser Action');
console.log('this is the typescript file');