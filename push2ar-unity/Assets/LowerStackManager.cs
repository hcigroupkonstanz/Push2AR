using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;
using HCIKonstanz.Colibri.Synchronization;
using System;

public class LowerStackManager : MonoBehaviour
{
    private List<ARListViewItem> arListViewItems;

    public ListManager listManager;

    float lowerLeadingBounds;

    void Start()
    {
        arListViewItems = new List<ARListViewItem>();
        lowerLeadingBounds = 2223;
    }

    void OnEnable()
    {
        Sync.Receive("scrollDifferenceUpdate", (float scrollDelta) =>
        {
            UpdateItemPositions(); // scrollDelta
        });

        Sync.Receive("removeFromArItemView", (string receivedUrl) =>
        {
            ARListViewItem itemForDeletion;
            for (var i = arListViewItems.Count - 1; i >= 0; i--)
            {
                var item = arListViewItems[i];
                if (receivedUrl.Substring(1, receivedUrl.Length - 2) == item.url)
                {
                    itemForDeletion = item;
                    arListViewItems.Remove(item);
                    Destroy(itemForDeletion.gameObject);
                }
            }

        });

        // If user loads a different webpage, remove all items from the list and destroy the game objects
        Sync.Receive("urlChange", (string url) =>
        {
            // Remove all items from the list and destroy the game objects
            foreach (var item in arListViewItems)
            {
                Destroy(item.gameObject);
            }
            arListViewItems.Clear();
        });
    }

    void OnDisable()
    {
        Sync.Unregister("scrollDifferenceUpdate", (float scrollDelta) => { });
        Sync.Unregister("removeFromArItemView", (string receivedUrl) => { });
        Sync.Unregister("urlChange", (string url) => { });
    }

    void Update()
    {
        UpdateItemPositions();
    }

    private void UpdateItemPositions() // float scrollDelta
    {
        if (arListViewItems.Count > 0)
        {

            if (HasLeft(arListViewItems[^1]))
            {
                listManager.OnEnter(arListViewItems[^1]);
                arListViewItems.Remove(arListViewItems[^1]);
            }

            if (arListViewItems.Count > 0) // && IsLeadingItem(arListViewItems[^1]))
            {
                arListViewItems[^1].SetStackedPosition(new Vector2(
                    arListViewItems[^1].GetStackedPosition().x,
                    Mathf.Max(-2223, arListViewItems[^1].logicalPosition)), false);

                // Start from the second-to-last item, go down to the first item
                for (int i = arListViewItems.Count - 2; i >= 0; i--)
                {
                    arListViewItems[i].SetStackedPosition(new Vector2(
                        arListViewItems[i].GetStackedPosition().x,
                        arListViewItems[^1].GetStackedPosition().y - (arListViewItems[^1].rectTransform.rect.height * (arListViewItems.Count - i - 1))), false);
                }
            }
        }
    }

    private bool HasLeft(ARListViewItem aRListViewItem)
    {
        return aRListViewItem.logicalPosition >= -2223 + aRListViewItem.rectTransform.rect.height;
    }

    private bool IsLeadingItem(ARListViewItem aRListViewItem)
    {
        return (aRListViewItem.logicalPosition >= lowerLeadingBounds) && (aRListViewItem.logicalPosition <= (lowerLeadingBounds + aRListViewItem.rectTransform.rect.height));
    }

    public void OnEnter(ARListViewItem item)
    {
        arListViewItems.Add(item);
        item.gameObject.transform.SetParent(this.gameObject.transform, true);
    }
}
