using Photino.NET;

namespace Extension;

public static class PhotinoExtension
{
    public static void RegisterWebHandler<T>(this PhotinoWindow window) where T : WebHandler
    {
        window.RegisterWebMessageReceivedHandler((object? sender, string message) =>
        {

        });

    }
}