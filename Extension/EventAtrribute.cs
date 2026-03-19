namespace Extension;

[AttributeUsage(AttributeTargets.Method, Inherited = false, AllowMultiple = true)]
public class EventNameAttribute : Attribute
{
    public readonly string EventName;
    public readonly Type TypeModel;

    // This is a positional argument
    public EventNameAttribute(string eventName, Type typeModel = null)
    {
        this.EventName = eventName;
        this.TypeModel = typeModel;
    }


}