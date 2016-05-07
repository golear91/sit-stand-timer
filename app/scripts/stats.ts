
export interface DayStats{
  minutesSitting: number,
  minutesStanding: number
}


let stats = {};


function addStats(sitting: boolean, minutes: number) {
  if(stats.hasOwnProperty(getTodayKey()) === false){
    stats[getTodayKey()] = {minutesSitting: 0, minutesStanding: 0};
  }

  if(sitting) {
      stats[getTodayKey()].minutesSitting += minutes;
    }
    else {
      stats[getTodayKey()].minutesStanding += minutes;
    }
}

function getStats() {
  chrome.storage.local.get(STATS_STORAGE_KEY, (result)=>{
    if(result.hasOwnProperty(STATS_STORAGE_KEY)) {
      stats = result[STATS_STORAGE_KEY];
    }
  });
}

function storeStats() {
  let storageObj = {};
  storageObj[STATS_STORAGE_KEY] = stats;
  chrome.storage.local.set(storageObj);
}

function getTodayKey(){
  var d = new Date;
  return `${d.getMonth()}-${d.getDate()}-${d.getFullYear()}`;
}

getStats();
