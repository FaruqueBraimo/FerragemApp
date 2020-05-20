import { Notify, Loading } from 'quasar'

export function showSuccessMessage(successMessage) {
    Loading.hide()
    Notify.create({
        color:      'green',
        message:    successMessage,
        actions: [{ icon: 'close', color: 'white' }]
    })

} 