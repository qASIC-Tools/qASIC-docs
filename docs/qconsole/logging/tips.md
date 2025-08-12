---
title: Tips
sidebar_position: 3
---

# Tips

## Update a log
You are able to update a log, by logging it again.

```csharp
var log = qLog.CreateNow("This is my message.");
console.Log(log);

log.message = "The message has changed.";
console.Log(log);
```

This is useful when creating interactable commands.

## Sticky logs
Logs can be made "sticky", meaning that they will stay anchored to the bottom of the logs.

```csharp
var log = qLog.CreateNow("I am permanently attached!");
log.sticky = true;

console.Log(log);
```

You can manually unstick logs by running the `unstick` command.

Again, this is useful when creating interactable commands.
