﻿using MIST.Core;
using MIST.Entities;
using MIST.Sessions;
using System;
using System.Collections.Generic;
using System.Linq;
using UniRx;

namespace MIST.Events
{
    public enum MistEventType { VideoStart, VideoEnd, Click, Touch, Log, CriticalIncident, TaskStart, TaskEnd, TaskUpdate, Custom, Task }

    public class MistEvent : Traceable
    {
        public readonly string EventId;
        private readonly string sessionId;
        private readonly MistEventType eventType;

        protected override string GetId() => EventId;
        protected override string GetChannel() => "events";

        protected override void SetIdData()
        {
            SetData("eventId", EventId);
            SetData("sessionId", sessionId);
            SetData("timestamp", Now);
            SetData("eventType", Enum.GetName(typeof(MistEventType), eventType).ToLower());
        }

        protected MistEvent(string id, MistEventType type)
        {
            EventId = id;
            eventType = type;

            // TODO: expects that session has already started
            sessionId = SessionController.Instance.SessionId;
        }


        public static MistEvent Create(MistEventType type)
        {
            var logEvent = new MistEvent(Guid.NewGuid().ToString(), type);
            logEvent.InitializeTracing(logEvent.EventId, logEvent.sessionId, StateType.Event);
            return logEvent;
        }


        public static void Log(MistEventType type, Dictionary<string, object> metadata = null, params Entity[] affectedEntities)
        {
            if (!SessionController.Instance.IsSessionActive) return;
            var ev = new MistEvent(Guid.NewGuid().ToString(), type);

            if (metadata != null)
                ev.SetData(metadata);

            if (affectedEntities.Length > 0)
                ev.SetData("EntityIds", affectedEntities.Select(e => e.EntityId).ToArray());

            ev.ScheduleChanges();
        }

    }
}
