// Saves options to chrome.storage

var data = {
  "websites" : [
  {
    id: 1,
    'baseURL': 'http://www.monoprice.com/search/index?keyword=',
    'spaceValue': '+',
    'img': 'monoprice.png',
    'name': 'Monoprice'
  },
  {
    id: 2,
    'baseURL': 'https://www.youtube.com/results?search_query=',
    'spaceValue': '+',
    'img': 'youtube.png',
    'name': 'Youtube'
  },
  {
    id: 3,
    'baseURL': 'http://www.amazon.com/s/field-keywords=',
    'spaceValue': '%20',
    'img': 'amazon.png',
    'name': 'Amazon'
  },
  {
    id: 4,
    'baseURL': 'http://stackoverflow.com/search?q=',
    'spaceValue': '+',
    'img': 'stack.png',
    'name': 'Stack'
  }
  ]
};

function findName(data, name) {
  var websites = data.websites;
  for (var i = 0; i < websites.length; i++) {
    if (websites[i].name == name.toLowerCase()) {
      console.log("yes");
      return(websites[i].baseURL);
      
    }
  }
}

function save_options() {
  var itemOne = document.getElementById('1').value;
  var itemTwo = document.getElementById('2').value;
  var itemThree = document.getElementById('3').value;
  var itemFour = document.getElementById('4').value;

  chrome.storage.sync.set({
    "One": itemOne,
    "Two": itemTwo,
    "Three": itemThree,
    "Four": itemFour,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}


// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    "One": "none",
    "Two": "none",
    "Three": "none",
    "Four": "none",
  }, function(items) {
    document.getElementById('1').value = items.One;
    document.getElementById('2').value = items.Two;
    document.getElementById('3').value = items.Three;
    document.getElementById('4').value = items.Four;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);