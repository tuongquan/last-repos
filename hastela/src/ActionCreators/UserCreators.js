export function LoginUser (payload) {
    return{
            'type': 'USER_LOGIN',
            'payload': payload
        }
    
}
export  function LogoutUser (payload=null){
    return{
        'type': 'USER_LOGOUT',
        'payload': payload
    }
}