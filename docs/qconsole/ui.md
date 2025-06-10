---
title: User Interface
sidebar_position: 5
---

# User Interface

## Using the engine implementation (Unity) 

hehe this doesn't exist yet, but it would be the recommended way.

## Using the engine implementation (Stride)

hehe this doesn't exist yet, but it would be the recommended way.

## Console app: manual implementation

Creating a basic command line interface is fairly straightforward.

```csharp
public static async Task Main(string[] args)
{
    var console = new qConsole();

    //Outputs console logs to the output buffer using System.Console.WriteLine()
    console.OutputLogsToConsole();

    while (true)
    {
        var txt = System.Console.ReadLine();
        await Console.ExecuteAsync(txt);
    }
}
```

:::caution
This approach prevents you from using some of the console's features (such as updating logs), which is why it's recommended to use the [qConsoleSystemUi](#console-app-using-qconsolesystemui)
:::

## Console app: using qConsoleSystemUi

qASIC comes packaged with the `qConsoleSystemUi` class which makes displaying and controlling the console easier to implement.

```csharp
public static async Task Main(string[] args)
{
    var console = new qConsole();
    var ui = new qConsoleSystemUi(console);
    await StartReadingAsync();
}
```

The `qConsoleSystemUi` includes many features:
- Autocomplete support
- Customizable log format (`LogFormat` and `UserLogFormat`)
- Support for sticky logs
- Support for updating logs (it can only update the previous log, otherwise it will write it to the output again)
- Ability to cycle the command history with `up arrow` and `down arrow` keys (you can configure the limit with `PreviousInputsLimit`)

## Other: manual implementation

If you are using qASIC in your own engine or an engine that isn't official supported, you will have to implement the user interface yourself.

:::caution
Currently, this is a bit complex, you have to do most things on your own, which is something that should change when qASIC gets it's official release.
:::

### Showing logs

If your engine uses a command line window, consider using `qConsole.LogToSysConsole`.

However, if you want to fully implement viewing logs in your ui, you will have to do this on your own.

There are 2 events you have to subscribe to: `qConsole.Logs.OnLog` and `qConsole.Logs.OnUpdateLog`.
| Event | Description |
| :-- | :-- |
| `OnLog` | Gets invoked whenever a new log gets logged. It will not be invoked if the log has already been logged (if the log is being updated) |
| `OnUpdateLog` | Gets invoked whenever a log gets logged again (when the log gets updated). For more information visit [this page](./logging#update-a-log) |

Depending on how you want to go about this, you can have multiple "text elements" in your ui engine for every log. This makes updating logs easier, but can cause performance issues depending on what you are using. Alternatively, you can have a single "text element" that contains every log (up to a certain limit). However, when a log gets updated, changing the string becomes impossible. By that point, it's much easier to recreate the entire string.

```csharp
qConsole console;
UiText logsText;

public void Start()
{
    console = new qConsole();
    console.Logs.OnLog += _ => UpdateLogText();
    console.Logs.OnUpdateLog += _ => UpdateLogText();
}

void UpdateLogText()
{
    logsText.text = CreateLogString();
}

string CreateLogString(int logCount = 1024)
{
    return string.Join(Environment.NewLine, GetLogs()
        .Select(x => x.ToString("%MESSAGE%"))); //provide your own format here
}

//Returns an organized list of logs that we want to turn into a string
public List<qLog> GetLogs(int logCount = 1024)
{
    //List of the logs we will return
    var logs = new List<qLog>();

    //Add every sticky log
    logs.AddRange(console.Logs.Logs
        .Where(x => x.sticky));

    //Go log by log from the latest to oldest
    for (int i = 0; i < console.Logs.Logs.Count && logs.Count < logCount; i++)
    {
        var log = console.Logs.Logs[console.Logs.Logs.Count - i - 1];

        //If this is a clear log, it means that logs before 
        // it have been cleared, so we can just ignore them
        if (log.logType == LogType.Clear)
            break;

        //If this is a sticky log, it means that we already
        //added it to the list
        if (log.sticky)
            continue;

        //Add to the start of the list, to organize logs
        //from oldest to newest
        logs.Insert(0, log);
    }

    return logs;
}
```

:::tip
You will most likely want to make the text scrollable, but also make it snap to the bottom. In the official implementations, we manually move the text scroll to the bottom whenever we update the log text, unless the scroll isn't currently in that place.
:::

### Executing commands

This is much simpler to implement. Simply, whenever the user presses enter (or optionally an execute button next to the input field), run this code:

```csharp
if (console.CanParseAndExecute)
{
    console.Execute(input.text);
    input.text = string.Empty;
}
```

:::caution
With [async commands](./commands#async-commands) the console can be occupied and unable to execute commands. It's recommended to disable any elements such as an execute button whenever that is the case.

```csharp
public void Update()
{
    executeButton.isInteractable = console.CanParseAndExecute;
}
```
:::

### Autocomplete
qASIC has a built-in autocomplete engine, however it has to be implemented in the ui to work.

:::note
As of the time of writing, qASIC only includes the `BlockAutocompleteEngine`. If it doesn't suit your needs, you can try creating your own, however currently there is no documentation on how to do this.
:::

Whenever your user presses the autocomplete button (this is typically mapped to `Tab`), call `AutocompleteEngine.Autocomplete`. You will have to pass the contents of your input field and the position of the cursor in that text, the method will return a tuple containing the new string and the new position.

```csharp
public qConsole console;
public AutocompleteEngine ac;

//Your engine's input field
public UiInputField input;

//Some initialization method of your engine
public void Start()
{
    console = new qConsole();
    ac = new BlockAutocompleteEngine(console);
}

//This is where we read input
public void Update()
{
    if (Input.PressedKey(Key.Tab))
    {
        (input.text, input.cursorPosition) = ac.Autocomplete(input.text, input.cursorPosition);
    }
}
```

### History

Yeah, you're on your own. It's planned to implement command history in the `qConsole` itself in the future, but for now you will have to do it yourself. If you're lost, consider looking at the [`qConsoleSystemUi` source code](https://github.com/qASIC-Tools/qASIC/blob/main/src/qASIC.Console/Ui/qConsoleSystemUi.cs).
