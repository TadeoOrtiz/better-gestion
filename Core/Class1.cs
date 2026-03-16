using System.Text.Json;
using Extension;

namespace Core;

public class Class1 : WebHandler
{
    public string MessageName => "Test";

    public void Handle(Dictionary<string, object> msg)
    {
        foreach (var a in msg)
            Console.WriteLine($"{a.Key} - {a.Value}");
    }
}
