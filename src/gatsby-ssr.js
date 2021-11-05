const React = require('react')

exports.onRenderBody = (
  { setHeadComponents },
  { tidioKey, enableDuringDevelop = true, delayInMilliseconds = 0 },
) => {
  if (!enableDuringDevelop && process.env.NODE_ENV === 'development') {
    console.log(
      'enableDuringDevelop is set to false - gatsby-plugin-tidio-chat will not load in development mode',
    )
    return null
  }
  console.log(delayInMilliseconds);
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
      dangerouslySetInnerHTML={{
        __html: `
                var time = 6;
                window.addEventListener("load", function(){
                  console.log("222");
                  setTimeout(function () {
                    window.tidioChatApi.open();
               }, time * 1000);
              });                
            `,
      }}
      async
    />,

  ])
}
