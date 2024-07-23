using System.Text;
using UnityEngine;

namespace MIST.Entities
{
    public class TracedScreenObject : TracedEntity
    {
        protected override void InitializeEntity()
        {
            entity.EntityType = EntityType.Object;
            entity.Space = EntitySpace.Screen;
            entity.ScheduleChanges();
        }
    }
}
