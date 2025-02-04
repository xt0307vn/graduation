import { SET_BODY_CLASS } from "@/store/consts";

const initState = {
    todos: [],
    textSize: '',
}

const reducer = (state, action) => {
    switch (action.type) {
        case SET_BODY_CLASS: {
            document?.body?.classList?.add(action.payload)
        }
    }
}

export default reducer

export {initState}