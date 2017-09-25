


function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
}


function redirect(URL, callback) {
  chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
    chrome.tabs.update(tab.id, {url: URL});
  });
  callback();
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    console.log(url);
    if (url.indexOf("www.google") > -1) {
      
      document.getElementById("amazon").addEventListener("click", function() {
        amazonURL = "http://www.amazon.com/s/field-keywords=" + url.split('q=')[1].split('&')[0].replace(/\+/g,"%20");
        redirect(amazonURL, function() {
          setTimeout(function () { window.close();}, 1000);
        });
      });
      document.getElementById("youtube").addEventListener("click", function() {
        youtubeURL = "https://www.youtube.com/results?search_query=" + url.split('q=')[1].split('&')[0].replace(/\+/g,"+");
        redirect(youtubeURL, function() {
          setTimeout(function () { window.close();}, 1000);
        });
      });
      document.getElementById("monoprice").addEventListener("click", function() {
        monopriceURL = "http://www.monoprice.com/search/index?keyword=" + url.split('q=')[1].split('&')[0].replace(/\+/g,"+");
        redirect(monopriceURL, function() {
          setTimeout(function () { window.close();}, 1000);
        });
      });
      document.getElementById("stack").addEventListener("click", function() {
        stackURL = "http://stackoverflow.com/search?q=" + url.split('q=')[1].split('&')[0].replace(/\+/g,"+");
        redirect(stackURL, function() {
          setTimeout(function () { window.close();}, 1000);
        });
      });
      document.getElementById("github").addEventListener("click", function() {
        githubURL = "https://github.com/search?q=" + url.split('q=')[1].split('&')[0].replace(/\+/g,"+");
        redirect(githubURL, function() {
          setTimeout(function () { window.close();}, 1000);
        });
      });
    } else {
      setTimeout(function () { window.close();}, 5000);
    }
  });
});

