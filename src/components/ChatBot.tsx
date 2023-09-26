import React, { useEffect, useRef } from "react";

const ChatBot = () => {
    const MessengerRef = useRef<any>();
    useEffect(() => {
        MessengerRef.current.setAttribute('page_id', '321703792034908');
        MessengerRef.current.setAttribute('attribution', 'biz_inbox');
    
        (window as any).fbAsyncInit = function() {
            (window as any).FB.init({
              xfbml            : true,
              version          : 'v17.0'
            });
          };
    
          (function(d, s, id) {
            var js:any = null, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
            fjs.parentNode.insertBefore(js, fjs);
          }(document, 'script', 'facebook-jssdk'));
    }, []);
    return (
        <>
            <div id="fb-root"></div>
            <div ref={MessengerRef} id="fb-customer-chat" className="fb-customerchat"></div>
        </>
    );
}; 
export default ChatBot;