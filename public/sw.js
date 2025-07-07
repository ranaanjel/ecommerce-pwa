self.addEventListener("push", async function (event) {

    if(event.data){

        let data = event.data.json();
        let options = {
            body:data.body,
            // icon:data.icon || "/favicon-96x96.png",
            //badge:"",
            vibrate:[100,50,100,10,50,10,100],
            data : {
                dateOfArrival :Date.now(),
                primaryKey:"4",
            }
        }
        event.waitUntil(self.registration.showNotification(data.title, options))
    }


})

self.addEventListener("notificationclick", function (event) {
    console.log("notification click recieved");
    event.notification.close();
    event.waitUntil(clients.openWindow("https://localhost:3000/dashboard"))
})