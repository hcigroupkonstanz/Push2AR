using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;
using System.Collections;
using System.Collections.Generic;
using HCIKonstanz.Colibri.Synchronization;
using Newtonsoft.Json.Linq;

public class PushToARUI : MonoBehaviour, IDragHandler, IBeginDragHandler, IEndDragHandler
{
    [SerializeField] private float pushToARThreshold = 0.5f;
    private float dragStartThreshold;

    public ListItem listItem;

    private ScrollRect parentScrollRect;
    private RectTransform rectTransform;
    private bool isReadyToPushToAR = false;
    private bool isDraggingItem = false;

    void Awake()
    {
        rectTransform = GetComponent<RectTransform>();
        parentScrollRect = GetComponentInParent<ScrollRect>();

        // Calculate dragStartThreshold based on DPI
        float dpi = Screen.dpi;
        if (dpi == 0) // Fallback if DPI is not available
        {
            dpi = 160; // Typical DPI for mid-range devices
        }
        float physicalDistance = 0.09f; // Inches, adjust as needed
        dragStartThreshold = physicalDistance * dpi; // Convert to pixels

        pushToARThreshold = rectTransform.rect.width / 2f;
    }

    void Start()
    {
        Sync.Receive(listItem.uid + "_pushToAr", (Color color) =>
        {
            StartCoroutine(SmoothMove(rectTransform.anchoredPosition, new Vector2(720, rectTransform.anchoredPosition.y), 0.3f));
        });
        
        Sync.Receive(listItem.uid + "_pos", (Vector2 position) =>
        {
            this.rectTransform.anchoredPosition = new Vector2(position.x * -1, position.y);
        });
        Sync.Receive(listItem.uid + "_abort", (bool abort) =>
        {
            StartCoroutine(SmoothMove(rectTransform.anchoredPosition, listItem.startPosition, 0.3f));
        });
    }

    public void OnBeginDrag(PointerEventData eventData)
    {
        // startPosition = rectTransform.anchoredPosition;
        isReadyToPushToAR = false;
        isDraggingItem = false;
    }

    public void OnDrag(PointerEventData eventData)
    {
        if (!isDraggingItem)
        {
            if (Mathf.Abs(eventData.delta.x) > dragStartThreshold)
            {
                isDraggingItem = true;
                parentScrollRect.enabled = false; // Disable scrolling
            }
            else
            {
                // Delegate the drag event to the parent ScrollRect
                eventData.pointerDrag = parentScrollRect.gameObject;
                EventSystem.current.SetSelectedGameObject(parentScrollRect.gameObject);

                parentScrollRect.OnInitializePotentialDrag(eventData);    
                parentScrollRect.OnBeginDrag(eventData);
            }
        }

        if (isDraggingItem)
        {
            var newPosition = rectTransform.anchoredPosition + new Vector2(eventData.delta.x, 0);
            rectTransform.anchoredPosition = newPosition;

            float dragDistance = rectTransform.anchoredPosition.x - listItem.startPosition.x;

            if (Mathf.Abs(dragDistance) > pushToARThreshold)
            {
                if (!isReadyToPushToAR)
                {
                    
                }
                isReadyToPushToAR = true;
            }
            else
            {
                isReadyToPushToAR = false;
            }
        }
    }

    public void OnEndDrag(PointerEventData eventData)
    {
        if (isDraggingItem)
        {
            if (isReadyToPushToAR)
            {
                PushToAR();
            }
            StartCoroutine(SmoothMove(rectTransform.anchoredPosition, listItem.startPosition, 0.3f));
        }

        parentScrollRect.enabled = true; // Re-enable scrolling
        parentScrollRect.OnEndDrag(eventData);
    }

    private void PushToAR()
    {
        Sync.Send("pushToAr", this.GetComponent<ListItem>().GetColor());
    }


    private System.Collections.IEnumerator SmoothMove(Vector2 from, Vector2 to, float duration)
    {
        float elapsedTime = 0;
        while (elapsedTime < duration)
        {
            rectTransform.anchoredPosition = Vector2.Lerp(from, to, (elapsedTime / duration));
            elapsedTime += Time.deltaTime;
            yield return null;
        }
        rectTransform.anchoredPosition = to;
    }
}
