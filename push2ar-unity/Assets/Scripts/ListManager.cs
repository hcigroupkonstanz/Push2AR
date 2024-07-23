using System.Collections;
using Newtonsoft.Json.Linq;
using UnityEngine;
using HCIKonstanz.Colibri.Synchronization;
using UnityEngine.InputSystem.Processors;
using System.Collections.Generic;
using System;
using MIST.Sessions;
using MIST.Entities;
using MIST.Events;

[RequireComponent(typeof(TracedGameObject))]
public class ListManager : MonoBehaviour
{
    public GameObject listItemPrefab;
    public GameObject listContent;
    public float animationDuration; // Set this duration for how long you want the animation to take

    public SessionController sessionController;

    private List<ARListViewItem> arListViewItems;
    public UpperStackManager upperStackManager;
    public LowerStackManager lowerStackManager;

    [Traced]
    private float scrollDelta;

    [Traced]
    private float scrollSum;


    void OnEnable()
    {
        // Extension sends data of item that is pushed to AR
        Sync.Receive("push2ArListView", (JToken data) =>
        {
            string url = data["href"].Value<string>();
            float top = data["top"].Value<float>() * -3;
            float left = (data["left"].Value<float>() - 393) * 3;
            float itemHeight = data["height"].Value<float>() * 3;
            string colorString = data["color"].Value<string>();
            float minimapPosition = data["minimapPosition"].Value<float>();
            Color color;

            // Extract the RGB values from the string
            string[] rgbValues = colorString.TrimStart("rgb(".ToCharArray()).TrimEnd(')').Split(',');

            // Parse the RGB values into integers
            int r = int.Parse(rgbValues[0].Trim());
            int g = int.Parse(rgbValues[1].Trim());
            int b = int.Parse(rgbValues[2].Trim());

            // Convert RGB values to floats in the range [0, 1]
            float rNormalized = r / 255f;
            float gNormalized = g / 255f;
            float bNormalized = b / 255f;

            // Create a Color object using the normalized RGB values
            color = new Color(rNormalized, gNormalized, bNormalized);

            MistEvent.Log(MistEventType.Custom, new Dictionary<string, object>
            {
                { "message", "Item pushed to AR" },
                { "url", url },
                { "top", top },
                { "left", left },
                { "itemHeight", itemHeight },
                { "color", colorString },
                { "minimapPosition", minimapPosition }
            });


            CreateListItem(url, new Vector2(left, top), minimapPosition, color, itemHeight);
        });

        Sync.Receive("scrollDifferenceUpdate", (float scrollDelta) =>
        {
            this.scrollDelta = scrollDelta;
            this.scrollSum += Math.Abs(scrollDelta);
        });

        Sync.Receive("minimapScrollTo", (string msg) =>
        {
            MistEvent.Log(MistEventType.Custom, new Dictionary<string, object>
            {
                { "message", "Minimap scroll to" },
                { "msg", msg }
            });
        });


        Sync.Receive("windowDimensions", (JToken data) =>
        {
            // Handling window dimensions if needed
            // Debug.Log(data["height"].Value<float>());
        });

        Sync.Receive("removeFromArItemView", (string receivedUrl) =>
        {
            ARListViewItem itemForDeletion;

            MistEvent.Log(MistEventType.Custom, new Dictionary<string, object>
            {
                { "message", "Remove item from AR" },
                { "url", receivedUrl }
            });

            for (var i = arListViewItems.Count - 1; i >= 0; i--)
            {
                var item = arListViewItems[i];
                if (receivedUrl.Substring(1, receivedUrl.Length - 2) == item.url)
                {
                    // Log title, description, color, and URL of the item that was removed
                    MistEvent.Log(MistEventType.Custom, new Dictionary<string, object>
                    {
                        { "title", item.ogTitle },
                        { "description", item.ogDescription },
                        { "color", item.color.ToString() },
                        { "url", item.url }
                    });
                    itemForDeletion = item;
                    arListViewItems.Remove(item);
                    Destroy(itemForDeletion.gameObject);
                }
            }

        });

        // If user loads a different webpage, remove all items from the list and destroy the game objects
        Sync.Receive("urlChange", (string url) =>
        {
            // Remove " from url
            url = url.Substring(1, url.Length - 2);

            // Get URL params
            string[] urlParams = url.Split('?');

            string urlPage = urlParams[0];

            MistEvent.Log(MistEventType.Custom, new Dictionary<string, object>
            {
                { "message", "URL change" },
                { "url", url }
            });

            // Start logging if url contains 'tutorial.html' or 'task.html'
            if (urlPage.Contains("tutorial.html") || urlPage.Contains("task.html"))
            {

                string[] paramList = urlParams[1].Split('&');

                string participantId = "";
                string condition = "";
                string stage = "";

                // Iterate over paramList to find partcipantId, condition, and stage in paramList
                foreach (var param in paramList)
                {
                    string[] keyValue = param.Split('=');
                    if (keyValue[0] == "participantId")
                    {
                        participantId = keyValue[1];
                    }
                    else if (keyValue[0] == "condition")
                    {
                        condition = keyValue[1];
                    }
                    else if (keyValue[0] == "stage")
                    {
                        stage = keyValue[1];
                    }
                }

                string formattedDateTime = DateTime.Now.ToString("yyyy-MM-dd_HH-mm-ss-fff");

                // Construct a session name based on the URL params
                string sessionName = $"p{participantId}_{condition}_{stage}_{formattedDateTime}";

                sessionController.SessionName = sessionName;
                sessionController.StartSession();
            }
            else
            {
                sessionController.StopSession();
            }


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
        Sync.Unregister("push2ArListView", (JToken data) => { });
        Sync.Unregister("windowDimensions", (JToken data) => { });
        Sync.Unregister("removeFromArItemView", (string receivedUrl) => { });
        Sync.Unregister("urlChange", (string url) => { });
        Sync.Unregister("scrollDifferenceUpdate", (float scrollDelta) => { });
        Sync.Unregister("minimapScrollTo", (string msg) => { });
        sessionController.StopSession();
    }


    // Start is called before the first frame update
    void Start()
    {
        arListViewItems = new List<ARListViewItem>();
    }

    void Update()
    {
        UpdateItemPositions();
    }

    void UpdateItemPositions()//float scrollDelta
    {
        for (var i = arListViewItems.Count - 1; i >= 0; i--)
        {
            var item = arListViewItems[i];
            // item.logicalPosition += scrollDelta * 3;
            // Update item position based on received scroll value
            item.rectTransform.anchoredPosition3D = new Vector3(item.rectTransform.anchoredPosition.x, item.logicalPosition, 0);

            if (HasEnteredUpperStack(item))
            {
                OnEnterUpperStack(item);
            }

            if (HasEnteredLowerStack(item))
            {
                OnEnterLowerStack(item);
            }
        }
    }

    private bool HasEnteredUpperStack(ARListViewItem item)
    {
        return item.rectTransform.anchoredPosition.y > 0;
    }

    private bool HasEnteredLowerStack(ARListViewItem item)
    {
        return item.rectTransform.anchoredPosition.y < -2223 + item.rectTransform.rect.height;
    }

    public void OnEnterUpperStack(ARListViewItem item)
    {
        MistEvent.Log(MistEventType.Custom, new Dictionary<string, object>
        {
            { "message", "Item entered upper stack" },
            { "url", item.url }
        });
        arListViewItems.Remove(item);
        upperStackManager.OnEnter(item);
    }

    public void OnEnterLowerStack(ARListViewItem item)
    {
        MistEvent.Log(MistEventType.Custom, new Dictionary<string, object>
        {
            { "message", "Item entered lower stack" },
            { "url", item.url }
        });
        arListViewItems.Remove(item);
        lowerStackManager.OnEnter(item);
    }

    void CreateListItem(string url, Vector2 position, float minimapPosition, Color color, float itemHeight)
    {
        GameObject listItemObject = Instantiate(listItemPrefab, listContent.transform);
        ARListViewItem listItem = listItemObject.GetComponent<ARListViewItem>();

        listItem.rectTransform = listItemObject.GetComponent<RectTransform>();
        // listItem.rectTransform.anchoredPosition = new Vector2(position.x, position.y + (listItem.rectTransform.rect.height / 2));
        listItem.rectTransform.anchoredPosition = new Vector2(position.x, position.y);

        // Adjust height
        listItem.rectTransform.sizeDelta = new Vector2(listItem.rectTransform.sizeDelta.x, itemHeight);

        listItem.listManager = this;
        listItem.SetURL(url);
        listItem.SetColor(color);
        // listItem.logicalPosition = position.y + (listItem.rectTransform.rect.height / 2);
        listItem.logicalPosition = position.y;
        listItem.SetMiniMapCoordinates(minimapPosition);

        arListViewItems.Add(listItem);

        listItem.enableUpdatingLinePos = true;

        MistEvent.Log(MistEventType.Custom, new Dictionary<string, object>
        {
            { "message", "Item created" },
            { "url", url },
            { "title", listItem.ogTitle },
            { "description", listItem.ogDescription },
            { "imageURL", listItem.ogImageURL},
            { "color", color.ToString() },
            { "position_x", position.x },
            { "position_y", position.y },
            { "minimapPosition", minimapPosition },
            { "itemHeight", itemHeight }
        });

        // Start moving the item, with movement completing in 'animationDuration' seconds
        StartCoroutine(MoveToPosition(listItem.rectTransform, listItem, new Vector2(0, listItem.rectTransform.anchoredPosition.y), animationDuration));
    }

    IEnumerator MoveToPosition(RectTransform rectTransform, ARListViewItem listItem, Vector2 targetPosition, float duration)
    {
        float elapsedTime = 0;
        Vector2 startingPos = rectTransform.anchoredPosition;

        while (elapsedTime < duration)
        {
            // Update position based on the fraction of the duration that has passed
            rectTransform.anchoredPosition = Vector2.Lerp(startingPos, targetPosition, elapsedTime / duration);
            elapsedTime += Time.deltaTime;
            yield return null;
        }

        rectTransform.anchoredPosition = targetPosition; // Ensure the position is set precisely at the end

        // listItem.indicatorCircle.transform.position = rectTransform.transform.position - rectTransform.transform.transform.right * 0.02f - this.transform.up * ((rectTransform.rect.height * rectTransform.lossyScale.y) / 2);
        // listItem.indicatorCircle.enabled = true;

    }

    internal void OnEnter(ARListViewItem aRListViewItem)
    {
        MistEvent.Log(MistEventType.Custom, new Dictionary<string, object>
        {
            { "message", "Item entered main ar list" },
            { "url", aRListViewItem.url }
        });
        arListViewItems.Add(aRListViewItem);
        aRListViewItem.gameObject.transform.SetParent(this.gameObject.transform, true);
    }
}
