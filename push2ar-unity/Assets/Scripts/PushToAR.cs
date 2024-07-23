using System.Collections;
using UnityEngine;
using UnityEngine.EventSystems;

public class PushToAR : MonoBehaviour
{

    Canvas canvas;

    GameObject currentObject;
    // Start is called before the first frame update
    void Start()
    {
        canvas = this.GetComponentInParent<Canvas>();
    }

    // Update is called once per frame
    void Update()
    {
        // Check if there is a touch
        if (Input.touchCount > 0)
        {
            Touch touch = Input.GetTouch(0);

            switch (touch.phase)
            {
                case TouchPhase.Began:
                    Vector3 touchPosWorld = Camera.main.ScreenToWorldPoint(new Vector3(touch.position.x, touch.position.y, 101));

                    // Debug.Log(touch.position);
                    // Debug.Log(touchPosWorld);

                    RaycastHit2D hit = Physics2D.Raycast(new Vector2(touchPosWorld.x, touchPosWorld.y), Camera.main.transform.forward);

                    if (hit.collider != null)
                    {
                        // Debug.Log(hit.collider.name);
                        currentObject = hit.collider.gameObject;
                    }
                    break;
                case TouchPhase.Moved:
                    if (currentObject != null)
                    {
                        Vector3 deltaPosition = new Vector3(touch.deltaPosition.x * canvas.scaleFactor, 0, 0);
                        currentObject.transform.position += deltaPosition * Time.deltaTime;
                    }
                    break;
                case TouchPhase.Ended:
                    currentObject.transform.localPosition = new Vector3(0, currentObject.transform.localPosition.y, currentObject.transform.localPosition.z);
                    currentObject = null;
                    break;
                default:
                    return;
            }

        }
    }
}
