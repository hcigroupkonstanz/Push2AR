using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using HCIKonstanz.Colibri.Synchronization;
using Newtonsoft.Json.Linq;

public class ColibriTest : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        float myNumber = 5;
        Sync.Send("click", myNumber);

        Sync.Receive("click", (float myFloat) =>
        {
            Debug.Log(myFloat);
        });
    }

    // Update is called once per frame
    void Update()
    {

    }
}
