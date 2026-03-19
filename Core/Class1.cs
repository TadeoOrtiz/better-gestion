using System.Text.Json;
using Extension;

namespace Core;

public class Class1 : WebHandler
{

    public record Test2(int amount);

    [EventName("INCREMENT_COUNT", typeof(Test2))]
    public void Handle(Test2 msg)
    {

        if (msg.amount != 0)

            SendWebMessage("COUNT_UPDATED", new
            {
                newCount = msg.amount * 2,

            });

        else if (msg.amount == 0)

            SendWebMessage("COUNT_UPDATED", new
            {
                newCount = 1,

            });
    }


    [EventName("ADD_COURSE")]
    public void Handle2()
    {
        Console.WriteLine("ADSDS");
        SendWebMessage("COURSE_CREATED", new
        {
            tota = "El monte everest no tiene nada en contra de mi"

        });
    }


}
