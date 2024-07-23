using MIST.Entities;
using MIST.Events;
using System.Collections.Generic;
using UnityEngine;

namespace MIST.Samples
{
    [RequireComponent(typeof(TracedGameObject))]
    public class CustomProperties : MonoBehaviour
    {
        // Possibility 1 to trace a property
        [Traced]
        public CustomEnumViewType CustomEnum = CustomEnumViewType.Front;

        [Traced]
        public string TestPropertyForTraced = "HiTraced";
        public string TestPropertyForListener = "HiListener";

        private void OnEnable()
        {
            // Possibility 2 to trace a property (No inital value logged! Only when changed!)
            GetComponent<TracedGameObject>().AddPropertyListener(this, "testPropertyListener", () => TestPropertyForListener);
        }
    }

    public enum CustomEnumViewType { Front, Top, Side }
}
