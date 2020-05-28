import { Dialog, Loading } from 'quasar'

export function showErrorMessage(errorMessage) {
    Loading.hide()
    Dialog.create({
        position: 'top-right',
        title:      'Erro',
        message:    errorMessage
    })

} 