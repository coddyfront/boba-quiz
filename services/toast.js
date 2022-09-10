import {
    createToast
} from 'mosha-vue-toastify';

const toastError = (descriptionError) => {
    createToast({
      title: 'Ошибка',
      description: descriptionError,
    }, {
      position: 'top-right',
      type: 'danger',
      transition: 'bounce',
      showIcon: true,
      timeout: 3000,
    })
}
  
export {toastError}