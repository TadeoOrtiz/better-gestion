using Photino.NET;
using System;
using System.Text.Json;

namespace Extension;

public class PhotinoMessage
{
    public string Event { get; set; }
    public object Payload { get; set; } // 'object' permite cualquier JSON interno
}

public static class PhotinoExtension
{


    public static PhotinoWindow RegisterWebHandler<T>(this PhotinoWindow window, T Handler) where T : WebHandler
    {
        window.RegisterWebMessageReceivedHandler((object? sender, string message) =>
        {
            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

            // Deserializamos el string JSON al objeto C#
            var received = JsonSerializer.Deserialize<PhotinoMessage>(message, options);

            
            string eventName = received.Event;

            if (Handler.MessageName == eventName)
            {
                var payloadJson = received.Payload.ToString();
                var payloadDict = JsonSerializer.Deserialize<Dictionary<string, object>>(payloadJson);
                Handler.Handle(payloadDict);
            }

        });

        return window;

    }
}