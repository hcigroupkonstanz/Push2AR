using UnityEngine;

public class DynamicBezierCurveRenderer : MonoBehaviour
{
    public LineRenderer lineRenderer; // Assign in inspector

    public Vector3 startPoint; // Assign or update dynamically
    public Vector3 endPoint; // Assign or update dynamically

    public Vector3 controlPoint1;
    public Vector3 controlPoint2;


    void Update()
    {
        // UpdateControlPoints();
        DrawBezierCurve();
    }

    void DrawBezierCurve()
    {
        int segments = 199;
        lineRenderer.positionCount = segments + 1;
        for (int i = 0; i <= segments; i++)
        {
            float t = i / (float)segments;
            Vector3 position = CalculateCubicBezierPoint(t, startPoint, controlPoint1, controlPoint2, endPoint);
            lineRenderer.SetPosition(i, position);
        }
    }

    Vector3 CalculateCubicBezierPoint(float t, Vector3 p0, Vector3 p1, Vector3 p2, Vector3 p3)
    {
        float u = 1 - t;
        float tt = t * t;
        float uu = u * u;
        float uuu = uu * u;
        float ttt = tt * t;
        
        Vector3 p = uuu * p0; //first term
        p += 3 * uu * t * p1; //second term
        p += 3 * u * tt * p2; //third term
        p += ttt * p3; //fourth term

        return p;
    }
}
