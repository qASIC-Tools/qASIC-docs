---
title: Creating a Command
sidebar_position: 3
---

# Creating a Command
Creating a command in qASIC is simple, or complex depending on what you want.

## Using an Attribute
```csharp
using qASIC.Console.Commands;

...

[qCommand("charspeed", "speed", Description = "Controls the character speed.")]
public float Speed { get; set; } = 1f;
```
Now, executing `charspeed` in the console will result in `1` being logged and running `charspeed 2` will change the value of `Speed` to `2`.

:::caution
When using a custom `qCommandList`, you have to manually call `FindAttributeCommands()` method to add attribute commands to it.
:::

These attributes also work on methods
```csharp
[qCommand("teleport", "tp", Description = "Teleports the player.")]
public void Cmd_Teleport(qConsoleCommandContext context, float x, float y)
{
    player.x = x;
    player.y = y;
    context.Logs.Log($"Teleported player to {x}, {y}.");
}

//You can have multiple methods with the same command name and different parameters.
[qCommand("teleport")]
public void Cmd_Teleport(qConsoleCommandContext context)
{
    player.x = 0f;
    player.y = 0f;
    context.Logs.Log("Teleported player to 0, 0.");
}

//The context parameter is optional
[qCommand("unstuck", Description = "Teleports the player 10 meters up.")]
public void Cmd_Unstuck()
{
    player.y += 10f;
}
```

Here is a list of everything that you can configure in the `qCommand` attribute.
| Name | Description |
| :-- | :-- |
| Name | The name of the command. This is the name that will appear when executing `help` in the console. |
| Aliases | An array of aliases that can also be used for executing the command. |
| Description | Description of the command that will appear when executing `help` in the console. |
| DetailedDescription | Optional detailed description of the command that will appear when executing `help [command name]` in the console |
| UseRegisteredTargets | Whenever the command should be executed on registered instances of the class where it is defined. |

## Creating your own command logic

If you find the `qCommand` attribute limiting, you can also make your own `CommandLogic`.

```csharp
using qASIC.Console;
using qASIC.Console.Commands;
using qASIC.CmdAutocomplete;

[qCommandMark]
public class Cmd_Example : qCommandLogic
{
    public override string CommandName => "example";
    public override string Aliases => new string[] { "alias" };
    public override string Description => "This is an example.";
    public override string DetailedDescription => "This is a detailed description for the example.";

    public override ACData CommandAutocomplete => new ACData()
        .AddVariant().Finish()
        .AddVariant().AddType<string>("message").Finish();

    public override object Run(qConsoleCommandContext context)
    {
        //Check if the argument count is between 0 and 1
        context.CheckArgumentCount(0, 1);

        //Do logic here

        //Log message if there is 1 argument
        if (context.Length == 1)
            context.Logs.Log(context[0].GetValue<string>());

        return null;
    }
}
```

This is quite a lot, so let's go step-by-step.

```csharp
[qCommandMark]
public class Cmd_Example : qCommandLogic
```

The `qCommandMark` attribute is a way of letting the console know which command to add. Without the mark, the command wouldn't be found and you would have to manually add it to the command list (which might be something you want to do).

---

```csharp
public override string CommandName => "example";
public override string Aliases => new string[] { "alias" };
public override string Description => "This is an example.";
public override string DetailedDescription => "This is a detailed description for the example.";
```

This is all of the info for the command. Fill this out as you like.

---

```csharp
public override ACData CommandAutocomplete => new ACData()
    .AddVariant().Finish()
    .AddVariant().AddType<string>("message").Finish();
```

This property defines all the different ways the command can be executed. In this example, the possible variants would be:
- `example` (as defined in the 2nd line)
- `example [message]` (as defined in the 3rd line)

If your command doesn't take any arguments, you can remove this from your code.

To add a new variant of your command, simply continue from the 3rd line as so:

```csharp
public override ACData CommandAutocomplete => new ACData()
    .AddVariant().Finish()
    .AddVariant().AddType<string>("message").Finish()
    .AddVariant().AddType<string>("message").AddType<TimeSpan>("time").Finish();
```

You can also create different variants depending on the specified argument:

```csharp
public override ACData CommandAutocomplete => new ACData()
    .AddVariant().AddOptions("mode", "set", "setandsave").AddType<string>("key").AddType<float>("value").Finish()
    .AddVariant().AddOptions("mode", "get").AddType<string>("key").Finish()
    .AddVariant().AddOptions("mode", "list").Finish();
```

---

```csharp
public override object Run(qConsoleCommandContext context)
{
    context.CheckArgumentCount(0, 1);

    ...
```

This is the method that will be called when executing the command. It's recommended to begin with checking for the argument count with `context.CheckForArgumentCount`, `context.CheckForArgumentCountMin` or `context.CheckForArgumentCountMax`.

---

```csharp
if (context.Length == 1)
    context.Logs.Log(context[0].GetValue<string>());
```

If you want to get a value of an argument, use `context[index].GetValue()`. **You don't have to parse on your own**. For example: if you want an int, call `context[index].GetValue<int>()`. If the argument cannot be parsed, an exception will be thrown and the command will stop executing.

If you want to check if the value can be parsed first, you can use `TryGetValue`:
```csharp
if (context[0].TryGetValue<int>(out var result))
{
    context.Logs.Log("This is an int");
}
else
{
    context.Logs.Log("This is not an int");
}
```

```csharp
return null;
```

Every command can return a value if it wants to. This can be useful if you want to use the console via code for retrieving data.

## Async commands

qConsole supports async commands.

```csharp
[qCommand("example")]
public async Task Cmd_AsyncExample(qConsoleCommandContext context)
{
    context.Logs.Log("Please wait for 3 seconds.");
    await Task.Delay(3000);
    context.Logs.Log("Task completed!");
}
```

```csharp
[qCommandMark]
public class Cmd_AsyncExample : qCommandLogic
{
    ...

    public async Task<object> Run(qConsoleCommandContext context)
    {
        context.CheckForArgumentCount(1);

        var time = context[0].GetValue<TimeSpan>();

        context.Logs.Log("Please wait...");
        await Task.Delay(time);
        context.Logs.Log("Finished.");
        return time;
    }
}
```

The console will become unresponsive until the command finishes executing. If you're using `qConsole.ExecuteAsync`, it's going to wait until the command finishes executing and then return it's value. If you would like to check if you are able to execute a command, check if `qConsole.CanParseAndExecute` is set to `true`.

## Tips

### Throwing an exception

The console will automatically catch exceptions thrown by commands and by default, it will output their entire stack trace. If you want to throw an exception without a stack trace, use `qCommandException`.

```csharp
public override object Run(qConsoleCommandContext context)
{
    ...

    if (context.GetValue<int>() > 10)
        throw new qCommandException("The number is too big!");

    return null;
}
```

### Interactable commands

A command can return a `CommandPrompt` which will make the console continue executing the command after asking the user for input. There are multiple types of prompts:
| Type | Description |
| :-- | :-- |
| `TextPrompt` | Asks the user for an input string. In other words: instead of executing, the console will pass that input string to the command. |
| `KeyPrompt` | Asks the user for a key input. Useful for creating interactable menus. |

To check if a command is being executed with a prompt, check the `context.prompt` field.

```csharp
int attempt = 0;

public override object Run(qConsoleCommandContext context)
{
    if (context.prompt is TextPrompt textPrompt)
    {
        attempt++;
        if (textPrompt.Text == "wordpass123")
        {
            context.Logs.Log($"Access granted after {attempt} attempts.");
        }
        else
        {
            context.Logs.LogError("Wrong password!");
            return new TextPrompt();
        }

        return null;
    }

    args.CheckForArgumentCount(0);
    args.Logs.Log("Enter password");

    attempt = 0;
    return new TextPrompt();
}
```

Combined with [updating logs](logging#update-a-log), it allows you to construct really powerful commands. Here's how we used it to create the `changeoption` command.

```csharp
qLog listLog;
Options.OptionsList.ListItem targetOption;
TextMenu<Options.OptionsList.ListItem> menu;

public override object Run(qCommandContext context)
{
    //Prompts
    if (context.prompt is KeyPrompt key)
    {
        var obj = key.UseTextMenu(menu);
        UpdateLog();
        return obj;
    }

    if (context.prompt is TextPrompt text)
    {
        //Set
        var value = targetOption.value;
        if (!context.parser.TryParse(targetOption.value?.GetType(), text.Text, out value))
            throw new qCommandParseException(targetOption.value?.GetType(), text.Text);

        Manager.SetOption(targetOption.name, value);
        return null;
    }

    //Standard
    context.CheckArgumentCount(0, 2);

    //changeoption
    if (context.Length == 0)
    {
        listLog = null;
        CreateMenu(context.Logs);
        UpdateLog();
        return new KeyPrompt();
    }

    //changeoption [option name]
    if (context.Length == 1)
    {
        targetOption = GetOption(context[0].arg);
        return AskForValue(context.Logs);
    }

    //changeoption [option name] [value]
    targetOption = GetOption(context[0].arg);
    var val = GetValueFromArg(context[1], targetOption.value?.GetType());

    Manager.SetOption(targetOption.name, val);
    return null;
}
```

:::note
Some parts of this script have been cut for the sake of brevity. Full version is available on [github](https://github.com/qASIC-Tools/qASIC/blob/main/src/qASIC.Options/Commands/ChangeOption.cs).
:::