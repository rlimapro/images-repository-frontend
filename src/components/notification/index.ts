import { toast } from 'react-toastify'


export const useNotification = () => {

    function notify(message : string, level : "success" | "error" | "warning" | "info") {
        toast(message, {
            type: level
        })
    }

    return {
        notify
    }
}