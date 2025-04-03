---
sidebar_position: 1
title: Methods
slug: /methods
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

The UI Kit's core function is to extend the [Chat SDK](/sdk/javascript/overview), essentially translating the raw data and functionality provided by the underlying methods into visually appealing and easy-to-use UI components.

To effectively manage and synchronize the UI elements and data across all components in the UI Kit, we utilize internal events. These internal events enable us to keep track of changes in real time and ensure that the UI reflects the most current state of data.

The CometChat UI Kit has thoughtfully encapsulated the critical [Chat SDK](/sdk/javascript/overview) methods within its wrapper to efficiently manage internal eventing. This layer of abstraction simplifies interaction with the underlying CometChat SDK, making it more user-friendly for developers.

## Methods

You can access the methods using the `CometChatUIKit` class. This class provides access to all the public methods exposed by the CometChat UI Kit.

### Init

This method initializes the settings required for [CometChat Javascript SDK](/sdk/javascript/overview). First, ensure UIKitSettings is set and then call the `init()` method on the app startup.

:::info

Make sure you replace the **APP_ID**, **REGION** and **AUTH_KEY** with your CometChat App ID, Region and Auth Key in the below code. The `Auth Key` is an optional property of the `UIKitSettings` Class. It is intended for use primarily during proof-of-concept (POC) development or in the early stages of application development. You can use the [Auth Token](#login-using-auth-token) method to log in securely.

:::

<Tabs>
<TabItem value="js" label="Javascript">

```javascript
import { UIKitSettingsBuilder } from "@cometchat/uikit-shared"; //import shared package

const COMETCHAT_CONSTANTS = {
  APP_ID: "APP_ID", // Replace with your App ID
  REGION: "REGION", // Replace with your App Region ("eu" or "us")
  AUTH_KEY: "AUTH_KEY", // Replace with your Auth Key or leave blank if you are authenticating using Auth Token
};

//create the builder
const UIKitSettings = new UIKitSettingsBuilder()
  .setAppId(COMETCHAT_CONSTANTS.APP_ID)
  .setRegion(COMETCHAT_CONSTANTS.REGION)
  .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
  .subscribePresenceForFriends()
  .build();

//Initialize CometChat
CometChatUIKit.init(UIKitSettings)?.then(() => {
  //login your user
});
```

</TabItem>
</Tabs>

---

### Get Logged In User

You can use this method to check if there is any existing session in the SDK. This method should return the details of the logged-in user.

<Tabs>
<TabItem value="js" label="Javascript">

```javascript
import { CometChatUIKit } from "@cometchat/chat-uikit-react"; //import uikit package

CometChatUIKit.getLoggedinUser()
  .then((user) => {
    //Login user
  })
  .catch(console.log);
```

</TabItem>
</Tabs>

---

### Login using Auth Key

This simple authentication procedure is useful when you are creating a POC or if you are in the development phase. For production apps, we suggest you use [AuthToken](#login-using-auth-token) instead of Auth Key.

<Tabs>
<TabItem value="js" label="Javascript">

```javascript
import { CometChatUIKit } from "@cometchat/chat-uikit-react"; //import uikit package

const UID = "UID";

CometChatUIKit.getLoggedinUser()
  .then((user) => {
    if (!user) {
      CometChatUIKit.login(UID)
        .then((user) => {
          console.log("Login Successful:", { user });
          //mount your app
        })
        .catch(console.log);
    } else {
      //user already logged in
      //mount your app
    }
  })
  .catch(console.log);
```

</TabItem>

<TabItem value="ts" label="Typescript">

```typescript
import { CometChatUIKit } from "@cometchat/chat-uikit-react"; //import uikit package

const UID: string = "UID";

CometChatUIKit.getLoggedinUser()
  .then((user: CometChat.User) => {
    if (!user) {
      CometChatUIKit.login(UID)
        .then((user: CometChat.User) => {
          console.log("Login Successful:", { user });
          // You can now launch the component
        })
        .catch(console.log);
    } else {
      //user already logged in
      //You can now launch the component
    }
  })
  .catch(console.log);
```

</TabItem>
</Tabs>

---

### Login using Auth Token

This advanced authentication procedure does not use the Auth Key directly in your client code thus ensuring safety.

1. [Create a User](https://api-explorer.cometchat.com/reference/creates-user) via the CometChat API when the user signs up in your app.
2. [Create an Auth Token](https://api-explorer.cometchat.com/reference/create-authtoken) via the CometChat API for the new user and save the token in your database.
3. Load the Auth Token in your client and pass it to the `loginWithAuthToken()` method.

<Tabs>
<TabItem value="js" label="Javascript">

```javascript
import { CometChatUIKit } from "@cometchat/chat-uikit-react"; //import uikit package

const authToken = "AUTH_TOKEN";

CometChatUIKit.getLoggedinUser()
  .then((user) => {
    if (!user) {
      //Login user
      CometChatUIKit.loginWithAuthToken(authToken)
        .then((user) => {
          console.log("Login Successful:", { user });
          //mount your app
        })
        .catch(console.log);
    } else {
      //user already logged in
      //mount your app
    }
  })
  .catch(console.log);
```

</TabItem>
<TabItem value="ts" label="Typescript">

```typescript
import { CometChatUIKit } from "@cometchat/chat-uikit-react"; //import uikit package

const authToken: string = "AUTH_TOKEN";

CometChat.getLoggedinUser()
  .then((user: CometChat.User) => {
    if (!user) {
      //Login user
      CometChatUIKit.loginWithAuthToken(authToken)
        .then((user: CometChat.User) => {
          console.log("Login Successful:", { user });
          //mount your app
        })
        .catch(console.log);
    }
  })
  .catch(console.log);
```

</TabItem>
</Tabs>

---

### Logout

This method is used to end the user session of the logged-in user

<Tabs>
<TabItem value="js" label="Javascript">

```javascript
import { CometChatUIKit } from "@cometchat/chat-uikit-react"; //import uikit package

CometChatUIKit.logout();
```

</TabItem>
</Tabs>

---

### Create user

This method takes a `User` object and the `Auth Key` as input parameters and returns the created `User` object if the request is successful.

<Tabs>
<TabItem value="js" label="Javascript">

```javascript
import { CometChat } from "@cometchat/chat-sdk-javascript"; //import sdk package
import { CometChatUIKit } from "@cometchat/chat-uikit-react"; //import uikit package

const authKey = "AUTH_KEY";
const UID = "user1";
const name = "Kevin";

var user = new CometChat.User(UID);
user.setName(name);
CometChatUIKit.createUser(user, authKey)
  .then((user) => {
    console.log("user created", user);

    CometChatUIKit.login(UID, authKey)
      .then((user) => {
        console.log("Login Successful:", { user });
        //mount your app
      })
      .catch(console.log);
  })
  .catch(console.log);
```

</TabItem>
<TabItem value="ts" label="Typescript">

```typescript
import { CometChat } from "@cometchat/chat-sdk-javascript"; //import sdk package
import { CometChatUIKit } from "@cometchat/chat-uikit-react"; //import uikit package

const authKey: string = "AUTH_KEY";
const UID: string = "user1";
const name: string = "Kevin";

var user = new CometChat.User(UID);
user.setName(name);
CometChatUIKit.createUser(user, authKey)
  .then((user: CometChat.User) => {
    console.log("user created", user);

    CometChatUIKit.login(UID, authKey)
      .then((user: CometChat.User) => {
        console.log("Login Successful:", { user });
        //mount your app
      })
      .catch(console.log);
  })
  .catch(console.log);
```

</TabItem>
</Tabs>

---

### Update user

This method takes a `User` object and the `Auth Key` as inputs and returns the updated `User` object on the successful execution of the request.

<Tabs>
<TabItem value="js" label="Javascript">

```javascript
import { CometChat } from "@cometchat/chat-sdk-javascript"; //import sdk package
import { CometChatUIKit } from "@cometchat/chat-uikit-react"; //import uikit package

const authKey = "AUTH_KEY";
const UID = "user1";
const name = "Kevin Fernandez";

var user = new CometChat.User(UID);
user.setName(name);
CometChatUIKit.updateUser(user, authKey)
  .then((user) => {
    console.log("user updated", user);
  })
  .catch(console.log);
```

</TabItem>
<TabItem value="ts" label="Typescript">

```typescript
import { CometChat } from "@cometchat/chat-sdk-javascript"; //import sdk package
import { CometChatUIKit } from "@cometchat/chat-uikit-react"; //import uikit package

const authKey: string = "AUTH_KEY";
const UID: string = "user1";
const name: string = "Kevin Fernandez";

var user = new CometChat.User(UID);
user.setName(name);
CometChatUIKit.updateUser(user, authKey)
  .then((user: CometChat.User) => {
    console.log("user updated", user);
  })
  .catch(console.log);
```

</TabItem>
</Tabs>

---

### Base Message

#### Text message

This method sends a text message in a 1:1 or group chat. You need to pass a `TextMessage` object to it.

<Tabs>
<TabItem value="js" label="1:1 chat">

```javascript
import { CometChat } from "@cometchat/chat-sdk-javascript"; //import sdk package
import { CometChatUIKit } from "@cometchat/chat-uikit-react"; //import uikit package
import { CometChatUIKitConstants } from "@cometchat/uikit-resources"; //import shared package

const receiverID = "UID";
const messageText = "Hello world!";
const receiverType = CometChatUIKitConstants.MessageReceiverType.user;
const textMessage = new CometChat.TextMessage(
  receiverID,
  messageText,
  receiverType
);

CometChatUIKit.sendTextMessage(textMessage)
  .then((message) => {
    console.log("Message sent successfully:", message);
  })
  .catch(console.log);
```

</TabItem>
<TabItem value="ts" label="Group chat">

```javascript
import { CometChat } from "@cometchat/chat-sdk-javascript"; //import sdk package
import { CometChatUIKit } from "@cometchat/chat-uikit-react"; //import uikit package
import { CometChatUIKitConstants } from "@cometchat/uikit-resources"; //import shared package

const receiverID = "GUID";
const messageText = "Hello world!";
const receiverType = CometChatUIKitConstants.MessageReceiverType.group;
const textMessage = new CometChat.TextMessage(
  receiverID,
  messageText,
  receiverType
);

CometChatUIKit.sendMessage(textMessage)
  .then((message) => {
    console.log("Message sent successfully:", message);
  })
  .catch(console.log);
```

</TabItem>
</Tabs>

---

#### Media message

This method sends a media message in a 1:1 or group chat. You need to pass a `MediaMessage` object to it.

:::info

Make sure you replace the `INPUT FILE OBJECT` with the actual [file](https://developer.mozilla.org/en-US/docs/Web/API/File).

:::

<Tabs>
<TabItem value="js" label="1:1 chat">

```javascript
import { CometChat } from "@cometchat/chat-sdk-javascript"; //import sdk package
import { CometChatUIKit } from "@cometchat/chat-uikit-react"; //import uikit package
import { CometChatUIKitConstants } from "@cometchat/uikit-resources"; //import shared package

const receiverID = "UID";
const messageType = CometChatUIKitConstants.MessageTypes.file;
const receiverType = CometChatUIKitConstants.MessageReceiverType.user;
const mediaMessage = new CometChat.MediaMessage(
  receiverID,
  `INPUT FILE OBJECT`,
  messageType,
  receiverType
);

CometChatUIKit.sendMediaMessage(mediaMessage)
  .then((message) => {
    console.log("Media message sent successfully", message);
  })
  .catch(console.log);
```

</TabItem>
<TabItem value="ts" label="Group chat">

```javascript
import { CometChat } from "@cometchat/chat-sdk-javascript"; //import sdk package
import { CometChatUIKit } from "@cometchat/chat-uikit-react"; //import uikit package
import { CometChatUIKitConstants } from "@cometchat/uikit-resources"; //import shared package

const receiverID = "GUID";
const messageType = CometChatUIKitConstants.MessageTypes.file;
const receiverType = CometChatUIKitConstants.MessageReceiverType.group;
const mediaMessage = new CometChat.MediaMessage(
  receiverID,
  `INPUT FILE OBJECT`,
  messageType,
  receiverType
);

CometChatUIKit.sendMediaMessage(mediaMessage)
  .then((message) => {
    console.log("Media message sent successfully", message);
  })
  .catch(console.log);
```

</TabItem>
</Tabs>

---

#### Custom message

This method allows you to send custom messages which are neither text nor media messages.

<Tabs>
<TabItem value="js" label="1:1 chat">

```javascript
import { CometChat } from "@cometchat/chat-sdk-javascript"; //import sdk package
import { CometChatUIKit } from "@cometchat/chat-uikit-react"; //import uikit package
import { CometChatUIKitConstants } from "@cometchat/uikit-resources"; //import shared package

const receiverID = "UID";
const customData = {
  latitude: "50.6192171633316",
  longitude: "-72.68182268750002",
};
const customType = "location";
const receiverType = CometChatUIKitConstants.MessageReceiverType.user;
const customMessage = new CometChat.CustomMessage(
  receiverID,
  receiverType,
  customType,
  customData
);

CometChatUIKit.sendCustomMessage(customMessage)
  .then((message) => {
    console.log("custom message sent successfully", message);
  })
  .catch(console.log);
```

</TabItem>
<TabItem value="ts" label="Group chat">

```javascript
import { CometChat } from "@cometchat/chat-sdk-javascript"; //import sdk package
import { CometChatUIKit } from "@cometchat/chat-uikit-react"; //import uikit package
import { CometChatUIKitConstants } from "@cometchat/uikit-resources"; //import shared package

const receiverID = "GUID";
const customData = {
  latitude: "50.6192171633316",
  longitude: "-72.68182268750002",
};
const customType = "location";
const receiverType = CometChatUIKitConstants.MessageReceiverType.group;
const customMessage = new CometChat.CustomMessage(
  receiverID,
  receiverType,
  customType,
  customData
);

CometChatUIKit.sendCustomMessage(customMessage)
  .then((message) => {
    console.log("custom message sent successfully", message);
  })
  .catch(console.log);
```

</TabItem>
</Tabs>
