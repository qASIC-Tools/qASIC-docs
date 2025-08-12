---
title: "Logs in Commands"
sidebar_position: 2
---

# Logs in Commands

When executing, commands are given their own log manager that is active for the duration of their execution time.

:::danger
Logging with `qDebug` or directly to the console in a command will work, but it's considered a **bad practice**.
:::

## Logging in an Attribute Command

As stated previously, you are able to log messages like you would typically.

```csharp
[qCommand("mycommand")]
public void MyCommand()
{
    //Bad practice!
    qDebug.Log("My message");
}
```

But the prefered way, would be to use the log manager in the command context.

```csharp
[qCommand("mycommand")]
public void MyCommand(qConsoleCommandContext context)
{
    context.Logs.Log("My message");
}
```

## Logging in Command Logic

To log a message in command logic, use the `Log Manager` provided in the command context.

```csharp
[qCommandMark]
public class MyCommand : qConsoleCommand
{
    public override string CommandName => "mycommand";

    public override object Run(qConsoleCommandContext context)
    {
        context.CheckArgumentCount(0);

        context.Logs.Log("My message");
        return null
    } 
}
```

## Lifetime

The `Log Manager` of the command gets closed after execution of the command finishes, meaning that **no messages will show up after**!

```csharp
[qCommandMark]
public class MyCommand : qConsoleCommand
{
    public override string CommandName => "mycommand";

    public override object Run(qConsoleCommandContext context)
    {
        context.CheckArgumentCount(0);

        //This will be logged
        context.Logs.Log("My message");

        Task.Run(async () => await MyTask(context));
        return null;
    }

    private async Task MyTask(qConsoleCommandContext context)
    {
        await Task.Delay(2000);

        //This will not be logged, because the command has finished executing
        context.Logs.Log("My other message");
    }
}
```

To prevent this, you have to **register a new `Log Manager` to the one from the context**. This will prevent the command's log manager from closing, until all registered managers to it close first.

:::caution
By registering your own temporary log manager, **you have to ensure you dispose of it yourself**.
:::

```csharp
[qCommandMark]
public class MyCommand : qConsoleCommand
{
    public override string CommandName => "mycommand";
    
    public override object Run(qConsoleCommandContext context)
    {
        context.CheckArgumentCount(0);

        //This will be logged
        context.Logs.Log("My message");

        var newLogs = new qLogManager();
        context.Logs.Register(newLogs);

        Task.Run(async () => await MyTask(newLogs));
        return null;
    }

    private async Task MyTask(qLogManager logs)
    {
        await Task.Delay(2000);

        //This will be logged
        logs.Log("My other message");

        //Disposing of the manager
        logs.StartClosing();
    }
}
```

## Advanced: a deep dive into how logs are managed during execution

**To start:** The console has it's own log manager, which we will call `Console Logs`. This manager is the final output of the console and contains every message that will show up in your Ui. When executing, we never log a message it directly, instead using other log managers that we temporary register to `Console Logs` for the time of execution.

**Step 1:** Execution begins in the main `Execute` or `ExecuteAsync` methods. These methods are provided with an input string and optionally, their previously returned value. At this stage, we create a new log manager, which we will call `Parsing Logs` and register it to `Console Logs`. 

After this, the provided arguments along with `Parsing Logs` are passed to the Console Parser, which is what handles reading and executing commands.

**Step 2:** For every command the parser wants to execute, we create a new log manager called `Command Logs` and register it to `Parsing Logs`. This manager stays active for the duration of the commands execution, after which, it starts being closed.

When a log manager is starting to be closed, it will either close itself immedietally if there are no other log managers registered to it, or it will wait until all of them will close or unregister themselves from it.

In most cases, `Command Logs` will close immedietally, which will make them uregister themselves from `Parsing Logs`.

In the case that the command will return a `Command Prompt` (meaning it's awaiting additional user input), `Command Logs` will remain unclosed and will be used again when executing the command again with the new input. Eventually, the command will finish, after which `Command Logs` will begin closing as they normally would.

**Step 3:** After the parser is finished, there are 2 things that can happen:
* 3.1. The parser is finished.
* 3.2. The previous command returned a command prompt and is awaiting further input.

**Step 3.1:** When the parser finishes, `Parsing Logs` starts being closed, which makes it unregister itself from `Console Logs`.

**Step 3.2:** Nothing is closed and the console is awaiting new user input. When it gets eventually provided, the parser is started again with the same instance of `Parsing Logs`, resuming the command with the `Command Logs` it previously used.
