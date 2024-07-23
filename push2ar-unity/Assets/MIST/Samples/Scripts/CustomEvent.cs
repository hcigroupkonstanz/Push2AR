using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using MIST.Events;

public class CustomEvent : MonoBehaviour
{
    private int clickCount = 0;
    public void TriggerCustomEvent()
    {
        string attribute1 = "Hi";
        clickCount++;
        MistEvent.Log(MistEventType.Custom, new Dictionary<string, object>
        {
            { "attribute1", attribute1 },
            { "clickCount", clickCount }
        });
    }
}
