import { Dialog, Loading } from 'quasar'

export function showErrorMessage(errorMessage) {
    Loading.hide()
    Dialog.create({
        title:      'Erro',
        message:    errorMessage
    })

} 