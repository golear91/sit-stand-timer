'use strict';

const ALARM_NAME: string = "notification-alarm";
const NOTIFICATION_FREQUENCY_MINUTES: number = 1;

let count: number = 0;

chrome.runtime.onInstalled.addListener(details => {
    console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({ text: '\'Allo' });

chrome.alarms.onAlarm.addListener(function (alarm) {
    if (alarm.name === ALARM_NAME) {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'images/icon-38.png',
            title: `test notification from: ${new Date()} number: ${count++}`,
            message: 'test message',
            buttons: [
                {title: "Sit down"},
                {title: "stand-up"}
            ],
            isClickable: true
        });
    }
});

chrome.alarms.create(ALARM_NAME, {
    delayInMinutes: 0,
    periodInMinutes: NOTIFICATION_FREQUENCY_MINUTES
});

console.log('\'Allo \'Allo! Event Page for Browser Action');
console.log('this is the typescript file');