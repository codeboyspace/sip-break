// Push helper: register SW, subscribe, and schedule via a backend

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY as string | undefined;
const PUSH_API_BASE = import.meta.env.VITE_PUSH_API_BASE as string | undefined; // e.g., https://your-server.com

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function enablePush(): Promise<PushSubscription | null> {
  try {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return null;
    const perm = await Notification.requestPermission();
    if (perm !== 'granted') return null;
    const reg = await navigator.serviceWorker.ready;
    let sub = await reg.pushManager.getSubscription();
    if (!sub) {
      if (!VAPID_PUBLIC_KEY) return null;
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });
    }
    return sub;
  } catch (e) {
    return null;
  }
}

export async function scheduleServerNotification(opts: {
  id: string;
  fireAt: number; // epoch ms
  title: string;
  body: string;
  url?: string;
}) {
  if (!PUSH_API_BASE) return; // no-op if backend not configured
  const sub = await enablePush();
  if (!sub) return;
  await fetch(`${PUSH_API_BASE}/schedule`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: opts.id,
      fireAt: opts.fireAt,
      notification: {
        title: opts.title,
        body: opts.body,
        url: opts.url || location.href,
      },
      subscription: sub.toJSON(),
    }),
  }).catch(() => {});
}

export async function cancelServerNotification(id: string) {
  if (!PUSH_API_BASE) return; // no-op
  await fetch(`${PUSH_API_BASE}/cancel`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  }).catch(() => {});
}
