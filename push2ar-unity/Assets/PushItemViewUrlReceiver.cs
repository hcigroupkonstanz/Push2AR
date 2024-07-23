using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using HCIKonstanz.Colibri.Synchronization;

public class PushItemViewUrlReceiver : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        Sync.Receive("item-page-push", (string url) =>
        {
            Debug.Log(url);
        });
    }

    // Update is called once per frame
    void Update()
    {

    }
}
