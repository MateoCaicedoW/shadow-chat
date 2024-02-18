function SendNotification(message){
    if (!("Notification" in window)) {
    } else if (Notification.permission === "granted") {
        new Notification(message.username, {
            body: message.message,
            
        });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            new Notification(message.username, {
                body: message.message,
            });
            }
        });
    }
}

export default SendNotification;