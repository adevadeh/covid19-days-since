'use strict';


  const memes = [
    "https://assets.memedrop.io/memes/44Sz3JmKUAkWVABhX58LPFcP0bKOG0hCLtcZp94Y.gif",
    "https://i.imgflip.com/zn8a5.jpg",
    "https://media3.giphy.com/media/xT5LMEqazgThz8SsyA/source.gif",
    "https://thumbs.gfycat.com/MemorableSecondaryCygnet-size_restricted.gif",
    "https://i.gifer.com/origin/ef/efc0443f081fb0bc5077b0fa2b8c630d_w200.gif",
    "https://66.media.tumblr.com/316f60a4fc954a98097cd432eeac1ee7/tumblr_ow148rGmiy1u2x68ro1_400.gifv"
  ];

  const load_data   = require("./current_data.json");
  const data        = load_data["locations"];
  const updated_at_d= new Date(Date.parse(load_data["updated_at"]));
  const updated_at  = updated_at_d.toString();


module.exports.daysSince = (event, context, callback) => {
  let locations = Object.keys(data);
  let selectedLocation = locations[0];

  // check for GET params and use if available
  if (event.queryStringParameters && event.queryStringParameters.location) {
    selectedLocation = event.queryStringParameters.location;
  }


  let last_day  = data[selectedLocation.toUpperCase()];
  let days      = 0;
  if (last_day == undefined) {
    days = ("<small>NO DATA for: "+selectedLocation.toUpperCase()+"</small>");
  } else {
    //Get 1 day in milliseconds
    var one_day = 1000*60*60*24;
    last_day    = new Date(last_day);
    days        = ~~((new Date() - last_day)/one_day);
    if (days > 0) {
      days = days - 1; //don't count the current (not yet over) day
    }
  }



  let memeImg = memes[~~(Math.random() * memes.length)];

  let locationOptions = ""
  for (const loc of locations){
    const selected = (loc == selectedLocation ? "selected " : "");
    locationOptions += `<option ${selected}value=\"${loc}\">${loc}</option>`
  }

  const locationSelect = `
  <label for="location">Location: </label>
  <select id="location" name="location" onChange="changeLoc(value)">
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
      background-color: rgb(221,221,241);
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-size: 18pt;
    }
    h1 {
      font-size: 800%;
      border: black solid 2px;
      background-color: #121389;
      width: 50%;
      margin: 5% 25%;
    }
    h3 {
      font-size: 160%;
      font-weight: normal;
      margin-top: 0;
      margin-bottom: 1em;
    }

    div#content {
      width:28em;
      margin:2em auto;
    }

    div#header {
      margin-bottom: 1em;
    }

    select#location {
      font-size: 18pt;
    }

    div.center {
      text-align:center;
    }

    img#meme {
      width: 28em;
    }

    p.extra {
      font-size: 80%
    }

  </style>

  <script type="text/javascript">

    function changeLoc(newLoc) {
      window.location = window.location.pathname + "?location="+newLoc;
    }

  </script>

</head>

<body>
   <div id="content">
    <div id="header">
      ${locationSelect}
    </div>

    <h1>${days}</h1>

    <h3>
      days since the last new infection in</br>
      <strong>${selectedLocation}</strong>
    </h3>

      <img id="meme" src="${memeImg}"/>

    </div>
    <p class="extra">
      last updated: ${updated_at}</br>
      sources: <br/>
      &nbsp;&nbsp;&nbsp;&nbsp;<a href="https://github.com/CSSEGISandData/COVID-19">https://github.com/CSSEGISandData/COVID-19</a><br/>
      &nbsp;&nbsp;&nbsp;&nbsp;<a href="https://github.com/BlankerL/DXY-COVID-19-Data">https://github.com/BlankerL/DXY-COVID-19-Data</a>
    </p>
    <a href="https://voice.baidu.com/act/newpneumonia/newpneumonia/?from=osari_pc_3">more data</a>

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
