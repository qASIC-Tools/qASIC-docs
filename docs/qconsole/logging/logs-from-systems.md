---
title: "Getting Logs From qASIC"
sidebar_position: 1
---

# Getting Logs From qASIC

Every system in qASIC has it's own `Log Manager`. These managers get registered to each other to synchronize their log output. Most of the time, this ends at the `qConsole` which then outputs every log to the user.

Commands also receive their own Log Manager when being executed, that gets unregistered after the command finishes.

The reason for this is to let you choose which messages you want to appear in the logs.

## Getting logs from other systems

The easiest way of integrating logs from the rest of qASIC is to assign the `qInstance` in the console (and any other system).

```csharp
var instance = new qInstance();
var options = new OptionsManager()
{
    Instance = instance,
};

var console = new qConsole()
{
    Instance = instance,
};
```

Now, every logs from the `OptionsManager` will appear in the console.

## Getting logs from your own systems

Here's an example of how to register your own class with it's own log manager.

```csharp
//The IHasLogs interface is optional. You can also register
//the LogManager directly.
public class MyClass : IHasLogs
{
    public qLogManager Logs { get; set; } = new qLogManager();

    public void PrintMessage()
    {
        Logs.Log("Example message.");
    }
}
```

This class can then be registered to `qConsole` or `qInstance`.

```csharp
var myClass = new MyClass();
var console = new qConosle();

console.Logs.Registeer(myClass);

myClass.PrintMessage();
```

```csharp
//Alternative version with qInstance
var myClass = new MyClass();
var instance = new qInstance();
var console = new qConsole()
{
    Instance = instance,
}

Instance.Logs.Register(myClass);

myClass.PrintMessage();
```
