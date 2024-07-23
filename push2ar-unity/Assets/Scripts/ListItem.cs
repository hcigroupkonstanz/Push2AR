using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.UI;

public class ListItem : MonoBehaviour
{
    public Image image;
    public string uid;

    public Vector2 startPosition;

    Color color;

    public void SetColor(Color color)
    {
        image.color = color;
    }

    public Color GetColor()
    {
        return this.color;
    }
}