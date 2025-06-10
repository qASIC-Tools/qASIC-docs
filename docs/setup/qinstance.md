---
sidebar_position: 1
title: Initializing qInstance
---

# Initializing qInstance

To make the experience of using qASIC smoother, it is highly recommended to create a qInstance at the beginning of your project's lifetime.

:::note
**THIS IS OPTIONAL** - qASIC will work just fine without a qInstance, but most systems won't be able to communicate with each other.
:::

## Features of qInstance
- Makes different parts of qASIC integrate with each other (for example: the Options system with qConsole)
- Allows for connecting remotely with the `RemoteInspector` app to view logs in an external window.
- Allows for the console to show logs of everything that is registered to a qInstance.

## For C# projects

1. At the start of your project's lifetime, add this code

```csharp
using qASIC;

...

qInstance QasicInstance { get; set; }

...

QasicInstance = new qInstance(new RemoteAppInfo()
{
    projectName = "Name of my project",
    version = "1.0.0",
    engine = "My custom engine",
    engineVersion = "1.0.0",
})

QasicInstance.Start();
```

## For Stride

1. Create a new script and paste this code to it.
```csharp title="qInit.cs"
using qASIC;
using System.Diagnostics;

namespace qUtils
{
    public class qInit : SyncScript
    {
        public qInstance Instance { get; private set; }

        public string projectName;
        public string version;

        public bool stopOnCancel = true;

        public override void Start()
        {
            //Make sure we aren't creating a second qInstance
            if (Services.GetService<qInstance>() != null)
            {
                Entity.Remove(this);
                return;
            }

            //Creating a new qInstance using the details defined in the Property Grid
            Instance = new qInstance(new RemoteAppInfo()
            {
                projectName = projectName,
                version = version,
                engine = "Stride",
                engineVersion = FileVersionInfo.GetVersionInfo("Stride.dll").FileVersion,
            });

            //Adding the instance to Stride's services and adding the Game instance to qASIC's services
            Services.AddService(Instance);
            Instance.Services.Add(Game as Game);

            //Stopping the remote inspector server update loop, since we are gonna do it ourselves
            Instance.RemoteInspectorServer.StopUpdateLog();

            //Starting the instance
            Instance.Start();
        }

        public override void Update()
        {
            //Manually triggering the remote inspector server update to work on the same thread as the game
            Instance.RemoteInspectorServer.Update();
        }

        public override void Cancel()
        {
            if (stopOnCancel)
            {
                //Stopping the instance when the object gets destroyed
                Services.RemoveService(Instance);
                Instance.Stop();
            }
        }
    }
}
```

2. Add this script to your game's root scene or some other scene that gets loaded at the beginning of your game's lifetime.

3. Make sure to give the script the appropriate priority so that it will be executed before other scripts that will need to use qASIC and other qASIC initialization scripts

:::note
Lower priority in Stride means that it will be executed earlier.
:::