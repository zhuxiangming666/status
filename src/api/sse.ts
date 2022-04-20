let eventSource:EventSource|null = null;
export const TaskEventSource = {
  getEventSource(){
    if(eventSource) return eventSource;
    eventSource = new EventSource('/events');
    return eventSource;
  },
  destroy(){
    if(!eventSource) return;
    eventSource.close();
    eventSource = null;
  }
};