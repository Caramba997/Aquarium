function subscribe(eventName, listener) {
  document.addEventListener(eventName, listener);
}

function unsubscribe(eventName, listener) {
  document.removeEventListener(eventName, listener);
}

function publish(eventName, data) {
  const event = new CustomEvent(eventName, { detail: data });
  document.dispatchEvent(event);
}

function push(queue, eventName, data) {
  const event = { name: eventName, data };
  window[queue] = window[queue] || [];
  window[queue].push(event);
}

function pop(queue) {
  if (window[queue] && window[queue].length) {
    return window[queue].shift();
  }
  return null;
}

function listen(queue, onPush) {
  window[queue] = window[queue] || [];
  const nativePush = window[queue].push;
  window[queue].push = function(event) {
    nativePush.call(this, event);
    onPush(event);
  };
  return [...window[queue]];
}

export default { publish, subscribe, unsubscribe, push, pop, listen };