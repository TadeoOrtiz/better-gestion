using System.Reflection.Metadata;
using System.Text.Json;
using Photino.NET;

namespace Extension;

public abstract class WebHandler
{

    public PhotinoWindow window;

    protected void SendWebMessage(string eventName, object msg)
    {
        var response = new PhotinoMessage(eventName, msg);
        window.SendWebMessage(JsonSerializer.Serialize(response));
    }
}