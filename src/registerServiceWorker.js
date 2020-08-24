import { register } from 'register-service-worker';
import AlertEvent from './events/AlertEvent';

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        'App is being served from cache by a service worker.\n'
        + 'For more details, visit https://goo.gl/AFskqB',
      );
    },
    registered() {
      console.log('Service worker has been registered.');
    },
    cached() {
      console.log('Content has been cached for offline use.');
    },
    updatefound() {
      console.log('New content is downloading.');
    },
    updated(registration) {
      console.log('New content is available; please refresh.');
      const { waiting } = registration;
      if (!waiting) return;
      document.dispatchEvent(new AlertEvent({
        message: 'Uma nova versão está disponivel',
        button: {
          text: 'Atualizar',
          handler() {
            waiting.postMessage({
              type: 'SKIP_WAITING',
            });
          },
        },
      }));
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.');
    },
    error(error) {
      console.error('Error during service worker registration:', error);
    },
  });

  let refreshing = false;
  navigator.serviceWorker.addEventListener(
    'controllerchange',
    () => {
      if (refreshing) return;

      refreshing = true;
      window.location.reload();
    },
  );
}
