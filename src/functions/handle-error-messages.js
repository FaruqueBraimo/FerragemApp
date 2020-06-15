import { Notify, Loading } from 'quasar'

export function showErrorMessage(errorMessage) {
    Loading.hide()
    Notify.create({
        type: 'negative',
        position: 'top-right',
        title:      'Erro',
        color:      'red-5',

        message:    errorMessage
    })

} 

