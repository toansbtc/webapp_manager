import React from 'react'

export default async function sendMessageFB(pageAccessToken, psid, messageText) {
    const url = "https://graph.facebook.com/v15.0/me/messages";

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${pageAccessToken}`,
        },
        body: JSON.stringify({
            messaging_type: "RESPONSE",
            recipient: { id: psid },
            message: { text: messageText },
        }),
    });

    if (response.ok) {
        console.log("Message sent successfully!");
    } else {
        const error = await response.json();
        console.error("Error sending message:", error);
    }
}
