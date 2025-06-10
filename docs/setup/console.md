---
sidebar_position: 2
title: Initializing qConsole
---

# Initializing qConsole

If you want to use a cheat console in your project, you will have to first initialize it's instance.

## For C# projects

1. To create a console, use this code.

```csharp
using qASIC.Console;

...

var console = new qConsole("MAIN")
{
    //The instance is optional
    Instance = QasicInstance,
};

console.ForConsoleApplication();

console.Execute("hello");

//Output: [14:28:29:293] [User] hello
//Output: [14:28:29:387] [Application] Hello World!
```

2. If you want to use a different command list, you can specify it in the constructor.
```csharp
var cmds = new qCommandList()
    .AddCommand(new qASIC.Commands.BuiltIn.Cmd_Hello());

var console = new qConsole("MAIN", cmds);

...
```

## For Stride

1. Create a new script and paste this code to it.

```csharp title="qConsoleMainInit.cs"
//TODO: polish up this script
using qASIC;
using qASIC.Console;
using qASIC.Console.Commands;
using Stride.Core.Diagnostics;
using System.Text;

namespace qUtils
{
    public class qConsoleMainInit : StartupScript
    {
        public qConsoleInstanceManager ConsoleManager { get; private set; }
        public qConsole MainConsole { get; private set; }

        public override void Start()
        {
            if (Services.GetService<qConsole>() != null)
            {
                Entity.Remove(this);
                return;
            }

            //Retrieve the instance if it exists
            var instance = Services.GetService<qInstance>();

            //Create a new console
            MainConsole = new qConsole("MAIN")
            {
                Instance = instance,
            };

            //Register custom colors
            MainConsole.Theme.customColors.Add("stride_debug", new qColor(131, 252, 159));
            MainConsole.Theme.customColors.Add("stride_warning", new qColor(252, 248, 131));
            MainConsole.Theme.customColors.Add("stride_error", new qColor(239, 57, 60));
            MainConsole.Theme.customColors.Add("stride_fatal", new qColor(219, 24, 27));
            MainConsole.Theme.customColors.Add("stride_verbose", new qColor(249, 201, 129));
            MainConsole.Theme.customColors.Add("stride_info", new qColor(100, 159, 252));

            //Register the console in Stride and qASIC services
            Services.AddService(MainConsole);
            instance.Services.Add(MainConsole);

            //If the instance exists, create a manager for console instances and register this console
            if (instance != null && Services.GetService<qConsoleInstanceManager>() == null)
            {
                ConsoleManager = instance.UseConsole();
                Services.AddService(ConsoleManager);
                instance.Services.Add(ConsoleManager);
                ConsoleManager.RegisterConsole(MainConsole);
            }

            //Subscribe to Stride log events
            GlobalLogger.GlobalMessageLogged += GlobalLogger_GlobalMessageLogged;
        }

        private void GlobalLogger_GlobalMessageLogged(ILogMessage obj)
        {
            var tag = obj.Type switch
            {
                LogMessageType.Debug => "stride_debug",
                LogMessageType.Warning => "stride_warning",
                LogMessageType.Verbose => "stride_verbose",
                LogMessageType.Fatal => "stride_fatal",
                LogMessageType.Error => "stride_error",
                _ => "stride_info",
            };

            var txt = new StringBuilder("[Stride] ");
            txt.Append(obj.Type switch
            {
                LogMessageType.Debug => "[DEBG] ",
                LogMessageType.Warning => "[WARN] ",
                LogMessageType.Fatal => "[FATL] ",
                LogMessageType.Error => "[EROR] ",
                LogMessageType.Verbose => "[VERB] ",
                _ => "[INFO] ",
            });

            if (!string.IsNullOrWhiteSpace(obj.Module))
                txt.Append($"[{obj.Module}] ");

            txt.Append(obj.Text);

            MainConsole.Log(qLog.CreateNow(txt.ToString(), tag));
        }
    }
}

```