---
sidebar_position: 1
sidebar_label: Core
title: Core
slug: /core-features
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

The UI Kit comprises a variety of components, each designed to work seamlessly with one another to deliver a comprehensive and intuitive chat experience.

Here's how different UI Kit components work together to achieve CometChat's Core features:

## Instant Messaging

At the heart of CometChat's functionality is the ability to support real-time text messaging. Users can send and receive instant messages, fostering quick and efficient communication.

![](../../assets/intro_web_screens.png)

| Components | Functionality |
| -----------| ------------- |
| [Message Composer](message-composer) | The [Message Composer](message-composer) is a Component that enables users to write and send a variety of messages. |
| [Message List](message-list) | The [Message List](message-list) is a Component that renders a list of messages sent and messages received using Text Bubble. |

## Media Sharing

Beyond text, CometChat allows users to share various media types within their conversations. This includes images, videos, audio files, and documents, enriching the chat experience and enabling more comprehensive communication.

![](../../assets/feature_media_sharing_web_screens.png)

| Components | Functionality |
| ---------- | ------------- |
| [Message Composer](message-composer) | The [Message Composer](message-composer) component includes an ActionSheet. This ActionSheet serves as a menu appearing over the app's context, offering various options for sharing media files. |
| [Message List](message-list) | The [Message List](message-list) component is responsible for rendering various Media Message bubbles, such as Image, File, Audio & Video Bubble. |

## Read Receipts

CometChat's Read Receipts feature provides visibility into the message status, letting users know when a message has been delivered and read. This brings clarity to the communication and ensures users are informed about the status of their messages.

![](../../assets/feature_read_receipt_web_screens.png)

| Components | Functionality |
| ---------- | ------------- |
| [Conversations](conversations) | [Conversations](conversations) is a component that renders conversation list item. Conversation item also displays the delivery status of the last message providing users with real-time updates on the status of their messages. |
| [Message List](message-list) | [Message List](message-list) is a component that renders different types of message bubbles. Read receipt status is an integral part of all message bubbles, no matter the type and provides real-time updates about the status of the message. |
| Message Information | Message Information component provides transparency into the status of each sent message, giving the sender insights into whether their message has been delivered and read. |

## Typing Indicator

The Typing Indicator feature in CometChat shows when a user is typing a response in real-time, fostering a more interactive and engaging chat environment. This feature enhances the real-time communication experience, making conversations feel more natural and fluid.

![](../../assets/feature_typing_indicator_web_screens.png)

| Components | Functionality |
| ---------- | ------------- |
| [Conversations](conversations) | [Conversations](conversations) is a component that renders conversation list item. Conversations item also shows real-time typing status indicators. This means that if a user in a one-on-one chat or a participant in a group chat is currently typing a message. |
| [Message Header](message-header) | [Message Header](message-header) that renders details of User or Groups in ToolBar. The Message Header also handles the typing indicator functionality. When a user or a member in a group is typing, the Message Header dynamically updates to display a `typing...` status in real-time. |

## User Presence

CometChat's User Presence feature allows users to see whether their contacts are online, offline. This helps users know the best time to initiate a conversation and sets expectations about response times.

![](../../assets/feature_status_indicator_web_screens.png)

| Components | Functionality |
| -----------| ------------- |
| [Conversations](conversations) | [Conversations](conversations) is a component that renders conversation list item. Conversations item also shows user presence information. |
| [Message Header](message-header) | [Message Header](message-header) that renders details of user/group. The Message Header also handles user presence information. |
| [Users](users) | [Users](users) renders list of users available in your app.It also responsible to render users presence information. |
| [Group Members](group-members) | [Group Members](group-members) renders list of users available in the group. The Group Members component also handles user presence information. |

## Reactions

CometChat's Reactions feature adds a layer of expressiveness to your chat application by allowing users to react to messages. With reactions, users can convey a range of emotions or express their thoughts on a particular message without typing out a full response, enhancing their user experience and fostering greater engagement.

![](../../assets/reactions_web_screens.png)

| Components | Functionality |
| ---------- | ------------- |
| [Message List](message-list) | [Message List](message-list) is a component that renders different types of message bubbles. Reactions are an integral part and offer a more engaging, expressive way for users to respond to messages. |

## Mentions

Mentions is a robust feature provided by CometChat that enhances the interactivity and clarity of group or 1-1 chats by allowing users to directly address or refer to specific individuals in a conversation.

![](../../assets/mentions_web_screens.png)

| Components | Functionality |
| ---------- | ------------- |
| [Conversations](conversations) | [Conversations](conversations) component provides an enhanced user experience by integrating the Mentions feature. This means that from the conversation list itself, users can see where they or someone else have been specifically mentioned. |
| [Message Composer](message-composer) | [Message Composer](message-composer) is a component that allows users to craft and send various types of messages, including the usage of the mentions feature for direct addressing within the conversation. |
| [Message List](message-list) | [Message List](message-list) is a component that displays a list of sent and received messages. It also supports the rendering of Mentions, enhancing the readability and interactivity of conversations. |

## Threaded Conversations

The Threaded Conversations feature enables users to respond directly to a specific message in a chat. This keeps conversations organized and enhances the user experience by maintaining context, especially in group chats.

![](../../assets/threaded_conversations.png)

| Components | Functionality |
| ---------- | ------------- |
| [Threaded Message Preview](threaded-message-preview) | [Threaded Message Preview](threaded-message-preview) component displays the parent message along with the number of replies. |

## Group Chat

CometChat facilitates Group Chats, allowing users to have conversations with multiple participants simultaneously. This feature is crucial for team collaborations, group discussions, social communities, and more.

![](../../assets/group_chat_web_screens.png)

For a comprehensive understanding and guide on implementing and using the Groups feature in CometChat, you should refer to our detailed guide on [Groups](groups).
