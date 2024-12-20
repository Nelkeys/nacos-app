// Listen for 'push' events and show notifications
self.addEventListener('push', (event) => {
    const data = event.data.json(); // Parse the incoming push payload
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: data.icon,
        data: { url: data.url }, // Attach the URL to the notification's data
    });
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    event.notification.close(); // Close the notification when clicked

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            // Check if the URL is already open in a tab and focus it
            for (const client of clientList) {
                if (client.url === event.notification.data.url && 'focus' in client) {
                    return client.focus();
                }
            }

            // Open the URL in a new tab if not already open
            if (clients.openWindow) {
                return clients.openWindow(event.notification.data.url);
            }
        })
    );
});
