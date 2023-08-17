window.HybridWebView = {
    "SendRawMessageToDotNet": function SendRawMessageToDotNet(message) {
        window.HybridWebView.SendMessageToDotNet(0, message);
    },
    "SendInvokeMessageToDotNet": function SendInvokeMessageToDotNet(methodName, paramValues) {
        if (typeof paramValues !== "undefined") {
            if (!Array.isArray(paramValues))
                paramValues = [paramValues];
            for (var i = 0; i < paramValues.length; i++)
                paramValues[i] = JSON.stringify(paramValues[i]);
        }
        window.HybridWebView.SendMessageToDotNet(1, JSON.stringify({ "MethodName": methodName, "ParamValues": paramValues }));
    },
    "SendMessageToDotNet": function SendMessageToDotNet(messageType, messageContent) {
        var message = JSON.stringify({ "MessageType": messageType, "MessageContent": messageContent });
        if (window.chrome && window.chrome.webview)
            window.chrome.webview.postMessage(message);// Windows WebView2
        else if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.webwindowinterop)
            window.webkit.messageHandlers.webwindowinterop.postMessage(message);// iOS and MacCatalyst WKWebView
        else if (window.hybridWebViewHost)
            hybridWebViewHost.sendMessage(message);// Android WebView
    }
};