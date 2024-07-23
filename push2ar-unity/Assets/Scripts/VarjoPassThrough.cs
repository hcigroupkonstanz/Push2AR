using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Varjo.XR;

public class VarjoPassThrough : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        VarjoMixedReality.StartRender();
    }

    void OnDisable()
    {
        VarjoMixedReality.StopRender();
    }
}
