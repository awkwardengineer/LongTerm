
// Enter a client ID for a web application from the Google Developer Console.
// The provided clientId will only work if the sample is run directly from

// https://<ENTER DOMAIN NAME HERE>

// In your Developer Console project, add a JavaScript origin that corresponds to the domain
// where you will be running the script.
var clientId = '1069876793448-vf26ifudhi6qr9tlfdibtbkl9e8davmc.apps.googleusercontent.com';

// Enter the API key from the Google Develoepr Console - to handle any unauthenticated
// requests in the code.
// The provided key works for this sample only when run from
// https://<ENTER DOMAIN NAME HERE>
// To use in your own application, replace this API key with your own.
var apiKey = 'AIzaSyCoyP8IbgZ6E0fxC_zZgF-VGjTf2NedHRU';

// To enter one or more authentication scopes, refer to the documentation for the API.
var scopes = 'https://www.googleapis.com/auth/calendar.readonly';

// Use a button to handle authentication the first time.
function handleClientLoad() {
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth,1);
}

function checkAuth() {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
}


function handleAuthResult(authResult) {
  var authorizeButton = document.getElementById('authorize-button');
  if (authResult && !authResult.error) {
    authorizeButton.style.visibility = 'hidden';
    makeApiCall();
  } else {
    authorizeButton.style.visibility = '';
    authorizeButton.onclick = handleAuthClick;
  }
}

function handleAuthClick(event) {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
  return false;
}

// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {
  gapi.client.load('calendar', 'v3', function() {
    var today = new Date();
    today.setDate(1);
    var request = gapi.client.calendar.events.list({
      'calendarId': 'sammymiami@gmail.com',
      'fields':'items(end,start,summary)',
      'timeMin':today
    });
    request.execute(function(response) {
      console.log(response);
      renderCal.processEvents(response);
    });
  });
}
