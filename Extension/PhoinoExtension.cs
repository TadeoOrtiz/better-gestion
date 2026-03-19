using Photino.NET;
using System;
using System.Text.Json;

namespace Extension;


public static class PhotinoExtension
{


    public static PhotinoWindow RegisterWebHandler<T>(this PhotinoWindow window, T Handler) where T : WebHandler
    {
        window.RegisterWebMessageReceivedHandler((object? sender, string message) =>
        {


            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

            Console.WriteLine(message);

            // Deserializamos el string JSON al objeto C#
            var received = JsonSerializer.Deserialize<PhotinoMessage>(message, options) ?? throw new Exception("Meesage is null");
            string eventName = received.eventName;

            Handler.window = window;
            Type type = Handler.GetType();

            var methods = type.GetMethods();

            foreach (var method in methods)
            {
                // Buscamos si el método tiene tu atributo
                var atrr = (EventNameAttribute)Attribute.GetCustomAttribute(method, typeof(EventNameAttribute));

                if (atrr != null)
                {
                    if (atrr.EventName == eventName)
                    {

                        Type tipoDestino = atrr.TypeModel;

                        if (string.IsNullOrEmpty(received.payload.ToString()) || tipoDestino == null)
                            method.Invoke(Handler, null);

                        else
                        {

                            // 2. Serializamos los datos crudos a ese tipo específico
                            // Ejemplo usando System.Text.Json o Newtonsoft.Json:
                            var payloadJson = received.payload.ToString() ?? throw new Exception("payload is null");
                            var payloadDict = JsonSerializer.Deserialize(payloadJson, tipoDestino) ?? throw new Exception("payload can't deserialize");



                            method.Invoke(Handler, [payloadDict]);
                        }
                    }
                }
            }

        });

        return window;

    }
}