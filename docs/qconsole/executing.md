---
title: Executing
sidebar_position: 4
---

# Executing

This is how you execute a command.

```csharp title="Example.cs"
var console = new qConsole();
console.Logs.OnLog += log => System.Console.WriteLine(log.message);

if (console.CanParseAndExecute)
    console.Execute("helloworld");
```

You can also execute a command asynchronously.

```csharp title="AsyncExample.cs"
await console.ExecuteAsync("sleep 2s");
console.Log("Finished executing sleep.");
```

:::note
`Execute` and `ExecuteAsync` both return the returned value of the executed command.

```csharp title="ReturnExample.cs"
var height = (float)console.Execute("playerheight");

if (height > 10f)
    console.LogError("Player is out of bounds!");
```
:::

:::caution
When using `Execute` on an asynchronous method, the console will return `null`

```csharp title="ReturnExample2.cs"
[qCommand("playerheight")]
public async Task<float> Cmd_PlayerHeight()
{
    await Task.Delay(10);
    return 1f;
}

//Height will be equal to null
var wrongHeight = console.Execute("playerheight");

//This will be equal to 1
var correctHeight = await console.ExecuteAsync("playerheight");
```
:::