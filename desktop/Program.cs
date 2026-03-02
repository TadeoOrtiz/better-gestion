using Photino.NET;
using System.Diagnostics; // Necesario para abrir procesos (carpetas)
using System.Dynamic;
using System.Runtime.InteropServices; // Para detectar el OS
using System.Text.Json;

namespace desktop;

public record FolderItem(string Id, string Name, string Path, string HexColor);

public class UserSettings
{
    public string Username { get; set; }
    public string Theme { get; set; }
    public bool Notifications { get; set; }
}

class Program
{
    [STAThread]
    static void Main(string[] args)
    {
        var window = new PhotinoWindow()
            .SetTitle("GestionApp")
            .SetSize(1000, 600)

            .Center();

        window.RegisterWebMessageReceivedHandler((object sender, string message) =>
        {
            Console.WriteLine($"{sender}: {message}");



            window.SendWebMessage(message);
        });

        // Configuración de carga (Vite vs Prod) igual que antes...
#if DEBUG
        window.Load("http://localhost:5173");
#else
        window.Load(Path.Combine(AppContext.BaseDirectory, "wwwroot", "index.html"));
#endif
        window.WaitForClose();
    }

}
