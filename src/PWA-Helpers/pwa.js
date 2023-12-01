import Swal from 'sweetalert2';
import './pwa.css'

export const checkPWA = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();

  const standalone = ('standalone' in window.navigator) && (window.navigator).standalone; 
  // standalone valida solo para iOS y se esta usando pwa // true = pwa - false = navegador

  const isIos = userAgent.includes('iphone') || userAgent.includes('ipod') || userAgent.includes('ipad')
  const mostrarPwa = JSON.parse(localStorage.getItem('msg-pwa'));

  if(isIos && !standalone && !mostrarPwa){
    const titulo = '¡Descargá la app en tu iPhone o iPad!';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style="display:inline" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1z"/><path fill-rule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708l3-3z"/></svg>`

    const mensaje = `Tocá en ${svg} y después en agregar al inicio`;

    Swal.fire({
      customClass: {
        container: 'pwaContainer',
        popup: 'pwaPopup',
        header: 'pwaHeader',
        title: 'pwaTitle',
        closeButton: 'pwaCloseButton',
        htmlContainer: 'pwaHtmlContainer',
        confirmButton: 'pwaDenyButton',
        timerProgressBar: 'pwaTimeProgressBar',
      },
      title: titulo,
      html: mensaje,
      // icon: 'info',
      showCloseButton: true,
      // confirmButtonColor: '#d33',
      confirmButtonText: 'No volver a mostrar',
    }).then((result) => {
      if (result.isConfirmed) {
        noMostrar();
      }
    })
  }

  const noMostrar = () => {
    localStorage.setItem('msg-pwa', JSON.stringify(true));
    
  }
  let deferredPrompt = undefined;
  window.addEventListener('beforeinstallprompt',(e) => {
    e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      const mostrarPwa = JSON.parse(localStorage.getItem('msg-pwa')) || false;

      if(!mostrarPwa){
        Swal.fire({
          customClass: {
            container: 'pwaContainer',
            popup: 'pwaPopup',
            header: 'pwaHeader',
            title: 'pwaTitle',
            closeButton: 'pwaCloseButton',
            icon: 'pwaIcon',
            image: 'pwaImage',
            htmlContainer: 'pwaHtmlContainer',
            actions: 'pwaActions',
            confirmButton: 'pwaConfirmButton',
            denyButton: 'pwaDenyButton',
            cancelButton: 'pwaCancelButton',
            loader: 'pwaLoader',
            footer: 'pwaFooter',
            timerProgressBar: 'pwaTimeProgressBar',
          },
          title: 'Aplicación disponible',
          html: `¿Querés instalar la app  en tu dispositivo?`,
          // icon: 'info',
          showCloseButton: true,
          showDenyButton: true,
          confirmButtonText: 'Instalar',
          denyButtonText: 'No volver a mostrar',
          // timer: 100*1000,
          timerProgressBar: true,

        }).then((result) => {
          if (result.isConfirmed) {
            addToHomeScreen();
          } else if (result.isDenied) {
            noMostrar();
          }
        })
      }
  });

  const addToHomeScreen = () => {
    // hide our user interface that shows our A2HS button
    // this.showButton = false;
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  }
}
export const updateMessage = async () => {
  let timerInterval;
  let update = false;
    await Swal.fire({
        customClass: {
          container: 'pwaContainer',
          popup: 'pwaPopup',
          header: 'pwaHeader',
          title: 'pwaTitle',
          closeButton: 'pwaCloseButton',
          icon: 'pwaIcon',
          image: 'pwaImage',
          htmlContainer: 'pwaHtmlContainer',
          actions: 'pwaActions',
          confirmButton: 'pwaConfirmButton',
          denyButton: 'pwaDenyButton',
          cancelButton: 'pwaCancelButton',
          loader: 'pwaLoader',
          footer: 'pwaFooter',
          timerProgressBar: 'pwaTimeProgressBar',
        },
        allowOutsideClick: false,
        title: "Nueva version disponible",
        html: 'En <b></b> se va a instalar una nueva version con mejoras y corrección de errores',
        confirmButtonText: "Aceptar",
        timer: 10*1000,
        timerProgressBar: true,
      didOpen: () => {
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${((Swal.getTimerLeft()/1000)).toFixed(0)}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer || result.isConfirmed) {
        update = true;
      } 
    });
    return update;
}