const React = require('react')

exports.onRenderBody = (
  { setHeadComponents },
  { tidioKey, enableDuringDevelop = true,delayInMilliseconds=0 },
) => {
  let source = "//code.tidio.co/" + tidioKey + ".js"
  if(delayInMilliseconds>0){
    setTimeout(function () {
      var tidioScript = document.createElement('script');
      tidioScript.src = source;
      document.body.appendChild(tidioScript); 
  }, delayInMilliseconds * 1000);
  }
  if (!enableDuringDevelop && process.env.NODE_ENV === 'development') {
    console.log(
      'enableDuringDevelop is set to false - gatsby-plugin-tidio-chat will not load in development mode',
    )
    return null
  }

  if (!tidioKey) {
    console.log(
      'No Tidio key provided! gatsby-plugin-tidio-chat will not load. Please add tidioKey in gatsby-config.js',
    )
    return null
  }

  return setHeadComponents([
    <script
      id="ze-snippet"
      key="gatsby-plugin-tidio-chat"
      src={`//code.tidio.co/${tidioKey}.js`}
      async
    />,
  ])
}
