using System;

namespace MIST.Events
{
    public enum MessageType { Debug, Info, Warning, Error, Exception }

    public class MessageEvent : MistEvent
    {
        public MessageEvent(MessageType logType, string message, string stacktrace = null)
            : base(Guid.NewGuid().ToString(), MistEventType.Log)
        {
            SetData("logType", logType.ToString().ToLower());
            SetData("logMessage", message);

            if (stacktrace != null)
                SetData("stacktrace", stacktrace);
        }
    }
}
