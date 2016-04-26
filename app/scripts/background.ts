'use strict';

const ALARM_NAME: string = "notification-alarm";
const NOTIFICATION_FREQUENCY_MINUTES: number = 1;
let count: number = 0;

const STARTUP_NOTIFICATION_ID: string = 'sit-stand-startup';
const IDLE_STATE_NOTIFICATION_ID: string = 'sit-stand-idle';
const STANDARD_NOTIFICATION_ID: string = 'sit-stand-standard';

let sitting: boolean = true;

let standupNotification = {
    type: 'basic',
    iconUrl: 'images/standing-icon-38.png',
    title: `It's time to stand up!`,
    message: 'Click ',
    buttons: [
        { title: "Done" },
        { title: "Snooze" }
    ],
    requireInteraction: true
}

let sitDownNotification = {
    type: 'basic',
    iconUrl: 'images/sitting-icon-38.png',
    title: `It's time to sit down`,
    message: 'message',
    buttons: [
        { title: "Done" },
        { title: "Snooze" }
    ],
    requireInteraction: true
}

chrome.idle.onStateChanged.addListener(function (newState) {
    console.log("idle newState:" + newState);
    chrome.notifications.clear(STANDARD_NOTIFICATION_ID);
    if (newState === 'active') {
        chrome.notifications.create(IDLE_STATE_NOTIFICATION_ID, {
            type: 'basic',
            iconUrl: 'images/sitting-icon-38.png',
            title: 'Sit Stand Timer idle change',
            message: 'Are you sitting or standing right now?',
            buttons: [
                { title: 'Sitting' },
                { title: 'Standing' }
            ]
        });
    }
});

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
    if (notificationId === STARTUP_NOTIFICATION_ID || notificationId === IDLE_STATE_NOTIFICATION_ID) {
        sitting = buttonIndex === 0;
    } else if (buttonIndex === 0) {
        sitting = !sitting;
        if (sitting) {
            chrome.browserAction.setIcon({ path: 'images/sitting-icon-38.png' });
        }
        else {
            chrome.browserAction.setIcon({ path: 'images/standing-icon-38.png' });
        }
    }
    chrome.notifications.clear(notificationId);
});

chrome.idle.onStateChanged.addListener(function (newState) {
    console.log(`idle state changed to ${newState}`);
});

chrome.runtime.onInstalled.addListener(details => {
    console.log('previousVersion', details.previousVersion);
});

chrome.alarms.onAlarm.addListener(function (alarm) {
    console.log("ALARM");
    if (alarm.name === ALARM_NAME) {
        if (sitting) {
            chrome.notifications.create(STANDARD_NOTIFICATION_ID, standupNotification);
        }
        else {
            chrome.notifications.create(STANDARD_NOTIFICATION_ID, sitDownNotification);
        }
    }
});

chrome.alarms.create(ALARM_NAME, {
    delayInMinutes: 1,
    periodInMinutes: NOTIFICATION_FREQUENCY_MINUTES
});

console.log('\'Allo \'Allo! Event Page for Browser Action');
console.log('this is the typescript file');