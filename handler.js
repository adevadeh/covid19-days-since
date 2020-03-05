'use strict';


  const memes = [
    "https://assets.memedrop.io/memes/44Sz3JmKUAkWVABhX58LPFcP0bKOG0hCLtcZp94Y.gif",
    "https://i.imgflip.com/zn8a5.jpg",
    "https://media3.giphy.com/media/xT5LMEqazgThz8SsyA/source.gif",
    "https://thumbs.gfycat.com/MemorableSecondaryCygnet-size_restricted.gif",
    "https://i.gifer.com/origin/ef/efc0443f081fb0bc5077b0fa2b8c630d_w200.gif",
    "https://66.media.tumblr.com/316f60a4fc954a98097cd432eeac1ee7/tumblr_ow148rGmiy1u2x68ro1_400.gifv"
  ];

  const data = {
    'GUANGZHOU'     : 9,
    'GUANGDONG'     : 3,
    'CHINA'         : 0,
    'UNITED STATES' : 0,
    'ITALY'         : 0
  };

module.exports.daysSince = (event, context, callback) => {
  let currentTime = new Date().toTimeString();
  let locations = Object.keys(data);
  let selectedLocation = locations[0];

  // check for GET params and use if available
  if (event.queryStringParameters && event.queryStringParameters.location) {
    selectedLocation = event.queryStringParameters.location;
  } 

  let days = data[selectedLocation.toUpperCase()] || "NO DATA";

  let memeImg = memes[~~(Math.random() * memes.length)];

  let locationOptions = ""
  for (const loc of locations){
    selected = (loc == selectedLocation ? "selected " : "");
    locationOptions += `<option ${selected}value=\"${loc}\">${loc}</option>`
  }


  const locationSelect = `
  <label for="location">Location: </label>
  <select id="location" name="location">
    ${locationOptions}
  </select>`;


  const html = `
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">

  <title>COVID-19 Info - Days Since Last Infection</title>
  <meta name="description" content="COVID-19 Info">
  <meta name="author" content="Kudelabs">

 <style type="text/css"> 
    body { 
      background-color: powderblue; 
      font-family: helvetica, sans-serif;
      font-size: 16pt;
    } 
    h1 {
      font-size: 1000%;
      text-align: center;
      vertical-align: bottom;
      line-height: 1em;
      margin-top: 0;
      margin-bottom: 0;
    }
    h3 {
      font-size: 200%;
      text-align: center;
      font-weight: normal;
    }

    div#content {
      width:36em; 
      margin:2em auto;
    }

    div#header {
      margin-bottom: 2em;
    }

    img#meme {
      width: 36em;
    }

  </style>

</head>

<body>
   <div id="content">
    <div id="header">
      ${locationSelect}
    </div>
  
    <h1>${days}</h1>

    <h3>days since the last new infection in <strong>${location}</strong></h3>
    
    <p>
      time: ${currentTime}</br>
      source: <a href="https://github.com/CSSEGISandData/COVID-19">https://github.com/CSSEGISandData/COVID-19</a>
    </p>
    
    <img id="meme" src="${memeImg}"/>


   </div>
  
</body>
</html>`;




  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body: html,
  };

  // callback is sending HTML back
  callback(null, response);
};
