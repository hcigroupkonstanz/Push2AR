using System;

namespace MIST.Entities
{
    [AttributeUsage(AttributeTargets.Field | AttributeTargets.Property)]
    public class TracedAttribute : Attribute
    {
        public TracedAttribute()
        {
        }
    }
}
