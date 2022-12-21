import fetch from 'node-fetch';

(function loop() {
  setTimeout(async function () {
    console.log("Refresh!");
    await fetch("https://bloody-ark.com/api/fetch_players");
    loop()
  }, 300000); // 1000 = 1sec
}());
