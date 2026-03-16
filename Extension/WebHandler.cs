using System.Reflection.Metadata;

namespace Extension;

public interface WebHandler
{
    public string MessageName { get; }

    public abstract void Handle(Dictionary<string, object> data);
}