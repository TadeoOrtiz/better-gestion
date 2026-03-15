using Photino.NET;
using System.Text.Json;

namespace Desktop;

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

		string savePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "materias.json");

		// Si estamos ejecutando desde VS/CLI, preferir guardar en el directorio del proyecto
		var projectDir = Path.GetFullPath(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"..\..\.."));
		if (Directory.Exists(projectDir) && File.Exists(Path.Combine(projectDir, "desktop.csproj")))
		{
			savePath = Path.Combine(projectDir, "materias.json");
		}


		window.RegisterWebMessageReceivedHandler((object? sender, string message) =>
		{
			try
			{
				var doc = JsonDocument.Parse(message);
				var root = doc.RootElement;
				if (root.TryGetProperty("type", out var typeProp))
				{
					string type = typeProp.GetString();
					if (type == "SAVE_FLOW_DATA" && root.TryGetProperty("payload", out var payloadProp))
					{
						var subjects = payloadProp.EnumerateArray()
							.Select(s => new
							{
								id = s.GetProperty("id").GetString(),
								status = s.GetProperty("status").GetString()
							})
							.ToList();

						string json = JsonSerializer.Serialize(subjects);
						File.WriteAllText(savePath, json);
					}
					else if (type == "LOAD_FLOW_DATA")
					{
						if (File.Exists(savePath))
						{
							string json = File.ReadAllText(savePath);
							var response = new
							{
								type = "FLOW_DATA_LOADED",
								payload = JsonSerializer.Deserialize<JsonElement>(json) // Para que no se serialice como string
							};
							window.SendWebMessage(JsonSerializer.Serialize(response));
						}
					}
				}
			}
			catch (Exception ex)
			{
				Console.WriteLine($"Error processing message: {ex.Message}");
			}
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
