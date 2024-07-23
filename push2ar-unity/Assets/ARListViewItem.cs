using System;
using System.Collections;
using System.Collections.Generic;
using System.IO.Compression;
using System.Net;
using HCIKonstanz.Colibri.Synchronization; // Ensure this is the correct namespace
using HtmlAgilityPack;
using MIST.Entities;
using MIST.Events;
using Newtonsoft.Json.Linq;
using TMPro; // For TextMeshPro
using Unity.Mathematics;
using UnityEditor;
using UnityEditor.EditorTools;
using UnityEngine;
using UnityEngine.AI;
using UnityEngine.Events;
using UnityEngine.Networking;
using UnityEngine.UI;
using Random = UnityEngine.Random; // For the Image component

[RequireComponent(typeof(TracedGameObject))]
public class ARListViewItem : MonoBehaviour
{
    // The position where the icon should be to be in sync with the corresponding item on the phone screen
    [Traced]
    public float logicalPosition;

    public Canvas mainCanvas;

    public GameObject dynamicBezierCurveRendererPrefab;

    // 24 inch screen, exact value: 1604.485
    // int stackHeight = 1605;

    // 27 inch screen, exact value: 1942.39
    // int stackHeight = 1943;


    int stackHeight = 2556;

    // int stackHeight = 6000;

    private Vector2 stackedPosition;

    [Traced]
    public float minimapPosition;

    [Traced]
    public float initialScroll;

    [Traced]
    public float screenPosition;

    public Image image; // The UI Image component to display the fetched image

    public TextMeshProUGUI title; // The TextMeshPro component for displaying the title in World Space

    public TextMeshProUGUI description;

    [Traced]
    public string url;

    public Vector2 originalPosition;

    public Color color;
    public Image coloredIndicator;
    public RectTransform rectTransform;
    private LineRenderer lineRenderer;

    public ListManager listManager;

    [Traced]
    public float clampLevel;

    [Traced]
    public float initialTopValue;


    public Image indicatorCircle;

    [Traced]
    public bool enableUpdatingLinePos = false;

    private DynamicBezierCurveRenderer dynamicBezierCurveRenderer;


    // Events
    public UnityEvent<ARListViewItem> OnEnterUpperStack;

    [Traced]
    public string ogTitle;

    [Traced]
    public string ogDescription;

    [Traced]
    public string ogImageURL;

    public void SetStackedPosition(Vector2 position, bool upper)
    {
        stackedPosition = position;
        rectTransform.anchoredPosition3D = StackedPosition2ActualPosition(position, upper);
    }

    public void SetMiniMapCoordinates(float position)
    {
        minimapPosition = position;
    }

    public Vector2 GetStackedPosition()
    {
        return stackedPosition;
    }

    // public Vector3 StackedPosition2ActualPosition(Vector2 stackedPosition, bool upper)
    // {
    //     float y;
    //     if (upper)
    //     {
    //         y = stackedPosition.y;
    //     }
    //     else
    //     {
    //         y = -stackedPosition.y - 2223 + rectTransform.rect.height;
    //     }

    //     y = -((stackHeight * stackHeight) / (y + stackHeight) - stackHeight);
    //     var z = y * 0.00004f;
    //     // var x = y *0.5f;
    //     var x = 0;

    //     if (!upper)
    //     {
    //         y = -y - 2223 + rectTransform.rect.height;
    //     }

    //     return new Vector3(x, y, z);
    // }

    public Vector3 StackedPosition2ActualPosition(Vector2 stackedPosition, bool upper)
    {

        float y;
        if (upper)
        {
            if (stackedPosition.y <= rectTransform.rect.height * 3)
            {
                return new Vector3(stackedPosition.x, stackedPosition.y, 0);
            }
            y = stackedPosition.y - rectTransform.rect.height * 3;
        }
        else
        {
            if (stackedPosition.y >= -2223 + rectTransform.rect.height - rectTransform.rect.height * 3)
            {
                return new Vector3(stackedPosition.x, stackedPosition.y, 0);

            }
            y = -stackedPosition.y - 2223 + rectTransform.rect.height - rectTransform.rect.height * 3;
        }

        y = -((stackHeight * stackHeight) / (y + stackHeight) - stackHeight);
        var z = y * 0.00004f;
        // var x = y *0.5f;
        var x = 0;

        if (!upper)
        {
            y = -y - 2223 + rectTransform.rect.height;
        }

        if (upper)
        {
            y += rectTransform.rect.height * 3;
        }
        else
        {
            y -= rectTransform.rect.height * 3;
        }
        return new Vector3(x, y, z);
    }


    void OnEnable()
    {
        Sync.Receive("scrollDifferenceUpdate", (float scrollDelta) =>
        {
            logicalPosition += scrollDelta * 3;
        });

        Sync.Receive("minimapUpdate", (JToken data) =>
        {
            string url = data["href"].Value<string>();
            if (url == this.url)
            {
                minimapPosition = data["top"].Value<float>();
            }
        });
    }

    void OnDisable()
    {
        Destroy(dynamicBezierCurveRenderer.gameObject);
        Sync.Unregister("scrollDifferenceUpdate", (float scrollDelta) => { });
        Sync.Unregister("minimapUpdate", (JToken data) => { });
    }


    void Start()
    {
        dynamicBezierCurveRenderer = Instantiate(dynamicBezierCurveRendererPrefab, this.transform.parent.parent.parent).GetComponent<DynamicBezierCurveRenderer>();
        dynamicBezierCurveRenderer.lineRenderer.positionCount = 2; // Set line segment count
        dynamicBezierCurveRenderer.lineRenderer.startColor = color;
        dynamicBezierCurveRenderer.lineRenderer.endColor = color;
        mainCanvas = listManager.GetComponent<Canvas>();
        coloredIndicator.color = color;
    }

    public void SetColor(Color color)
    {
        this.color = color;
    }

    void Update()
    {
        dynamicBezierCurveRenderer.startPoint = mainCanvas.transform.TransformPoint(0, minimapPosition * -3, 0) - this.transform.right * 0.03325f;
        dynamicBezierCurveRenderer.controlPoint1 = dynamicBezierCurveRenderer.startPoint + this.transform.right * 0.006f;

        dynamicBezierCurveRenderer.endPoint = this.transform.position - this.transform.up * ((this.rectTransform.rect.height * rectTransform.lossyScale.y) / 2);
        dynamicBezierCurveRenderer.controlPoint2 = dynamicBezierCurveRenderer.endPoint - this.transform.right * 0.006f;

        dynamicBezierCurveRenderer.lineRenderer.startWidth = coloredIndicator.rectTransform.rect.width * rectTransform.lossyScale.x;
        dynamicBezierCurveRenderer.lineRenderer.endWidth = coloredIndicator.rectTransform.rect.width * rectTransform.lossyScale.x;
    }

    public void SetURL(string url)
    {
        StartCoroutine(GetHtml(url)); // Start the coroutine to fetch HTML content
        this.url = url;
    }

    IEnumerator GetHtml(string url)
    {
        using (UnityWebRequest webRequest = UnityWebRequest.Get(url))
        {
            // Set a common browser's User-Agent
            webRequest.SetRequestHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3");
            yield return webRequest.SendWebRequest(); // Wait for the request to complete

            if (webRequest.result == UnityWebRequest.Result.Success)
            {
                ExtractOpenGraphData(webRequest.downloadHandler.text); // Process the HTML content
            }
            else
            {
                Debug.LogError("Error: " + webRequest.error); // Log any errors
            }
        }
    }

    void ExtractOpenGraphData(string html)
    {
        HtmlDocument htmlDoc = new HtmlDocument();
        htmlDoc.LoadHtml(html); // Load the HTML content

        // Select OpenGraph meta tags
        HtmlNode ogTitleNode = htmlDoc.DocumentNode.SelectSingleNode("//meta[@property='og:title']");
        HtmlNode ogDescriptionNode = htmlDoc.DocumentNode.SelectSingleNode("//meta[@property='og:description']");
        HtmlNode ogImageNode = htmlDoc.DocumentNode.SelectSingleNode("//meta[@property='og:image']");

        // Extract content attributes
        ogTitle = ogTitleNode != null ? ogTitleNode.GetAttributeValue("content", string.Empty) : "Not Found";
        ogDescription = ogDescriptionNode != null ? ogDescriptionNode.GetAttributeValue("content", string.Empty) : "Not Found";
        ogImageURL = ogImageNode != null ? ogImageNode.GetAttributeValue("content", string.Empty) : "Not Found";

        // Set the title text
        if (title != null)
            title.text = ogTitle;

        // Set the description text
        if (description != null)
            description.text = ogDescription;

        // Start coroutine to download and set the image
        if (ogImageURL != "Not Found" && image != null)
        {
            StartCoroutine(SetImageFromURL(ogImageURL));
        }
        else
        {
            Debug.LogError("No image available!");
        }
    }

    IEnumerator SetImageFromURL(string imageURL)
    {
        UnityWebRequest imageRequest = UnityWebRequestTexture.GetTexture(imageURL);
        yield return imageRequest.SendWebRequest(); // Wait for the request to complete
        if (imageRequest.result == UnityWebRequest.Result.Success)
        {
            Texture2D texture = DownloadHandlerTexture.GetContent(imageRequest);
            if (image != null)
            {
                image.preserveAspect = true;
                image.sprite = Sprite.Create(texture, new Rect(0, 0, texture.width, texture.height), new Vector2(0.5f, 0.5f));
            }
        }
        else
        {
            Debug.LogError("Failed to download image: " + imageRequest.error + " URL: " + imageURL);
        }
    }
}
