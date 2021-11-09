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
      async
    />,
    <script
      id="ze-snippet-delay"
      key="gatsby-plugin-tidio-chat-delay"
      dangerouslySetInnerHTML={{
        __html: `
              var time = ${delayInMilliseconds};
              if(time>0){              
                (function () {
                  function onTidioChatApiReady() {
                    if(time>0){
                      window.tidioChatApi.hide();
                      setTimeout(function () {
                        window.tidioChatApi.show();
                    }, time);  
                    }                                  
                  }
                  if (window.tidioChatApi) {
                      window.tidioChatApi.on('ready', onTidioChatApiReady);
                  } else {
                      document.addEventListener('tidioChat-ready', onTidioChatApiReady);
                  }
              })(); 
              }                
                    
          `,
      }} />

  ])
}
