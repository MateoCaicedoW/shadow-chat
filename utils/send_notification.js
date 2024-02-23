function SendNotification(message){
    if (!("Notification" in window)) {
    } else if (Notification.permission === "granted") {
        buildNotificationComponent(message);
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
                buildNotificationComponent(message);
            }
        });
    }
}

function buildNotificationComponent(message){
    let notification = new Notification(message.username, {
        body: message.message,
    });

    setTimeout(() => {
        notification.close();
    } , 2000);
}

export default SendNotification;